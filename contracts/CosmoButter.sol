// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./ICosmoVault.sol";
import "./ICosmoTreasury.sol";

/**
 * A contract created by a CosmoNut which contains a certain amount of matter,
 * and can be drawn by others if the secret is known.
 */
contract CosmoButter {

    struct Butter {
        uint256 id;
        uint256 nutId;
        uint256 amount;
        uint256 drawRate;
        address location;
        address treasury;
        address nutLocation;
        bytes32 secretHash;
        mapping(address => bool) drawnBefore;
    }
    Butter public butter;

    function initialize(
        uint256 _butterId,
        uint256 _nutId,
        uint256 _butterAmount,
        uint256 _drawRate,
        address _treasuryAddress,
        bytes32 _secretHash
    ) public {
        butter.id = _butterId;
        butter.nutId = _nutId;
        butter.amount = _butterAmount;
        butter.drawRate = _drawRate;
        butter.location = address(this);
        butter.treasury = _treasuryAddress;
        butter.nutLocation = address(msg.sender);
        butter.secretHash = _secretHash;

        ICosmoTreasury(butter.treasury).grantApproval(
            address(this),
            butter.treasury,
            butter.amount
        );
    }

    modifier onlyOnce {
        require(butter.drawnBefore[msg.sender] != true, "Can only draw once");
        _;
    }

    function spreadButter(
        uint256 _nutId,
        string memory _cidPath,
        bytes memory _signature
    ) internal returns (bool) {
        ICosmoTreasury(butter.treasury).transferMatterFrom(
            address(this), butter.treasury, butter.drawRate
        );

        address vaultAddress = ICosmoTreasury(butter.treasury).getVaultLocation();
        ICosmoVault(vaultAddress).changeTokenURI(
            _nutId, _cidPath, _signature
        );
        return true;
    }

    /**
     * Function callable from anyone, but can only be done once per Ethereum address.
     */
    function drawButter(string memory _secret, string memory _cidPath, bytes memory _signature) onlyOnce public {
        require(butter.amount > 0, "No butter left to draw");
        verifySecret(_secret);

        ICosmoTreasury(butter.treasury).butterDrawn(msg.sender, butter.id, butter.drawRate, butter.amount);

        butter.amount -= butter.drawRate;
        butter.drawnBefore[msg.sender] = true;

        spreadButter(butter.nutId, _cidPath, _signature);
    }

    /**
     * Takes a string input and hashes it; compares to the SECRET_HASH in the contract
     * If it matches, returns true.
     */
    function verifySecret(string memory _input) private view returns(bool) {
        bytes32 inputHash = keccak256(abi.encodePacked(_input));
        require(inputHash == butter.secretHash, "Input does not match secret");
        return true;
    }

}
