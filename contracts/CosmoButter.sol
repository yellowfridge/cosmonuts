// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./CosmoNuts.sol";
import "./CosmoTreasury.sol";

/**
 * A contract created by a CosmoNut which contains a certain amount of matter,
 * and can be drawn by others if the secret is known.
 */
contract CosmoButter {

    // Turn these into a struct
    uint256 public TOKEN_ID;
    bytes32 private SECRET_HASH;
    uint256 public BUTTER_DRAW_RATE;
    uint256 public BUTTER_ID;
    address public TREASURY_ADDRESS;

    uint256 public butterAmount;
    mapping(address => bool) private drawnBefore;

    CosmoNuts COSMO_NUTS;
    CosmoTreasury TREASURY;

    constructor(
        address _nutsAddress,
        address _treasuryAddress,
        uint256 _tokenId,
        uint256 _butterId,
        uint256 _butterAmount,
        uint256 _butterLimit,
        bytes32 _secretHash
    ) {
        COSMO_NUTS = CosmoNuts(_nutsAddress);
        TREASURY = CosmoTreasury(_treasuryAddress);
        TOKEN_ID = _tokenId;
        SECRET_HASH = _secretHash;
        butterAmount = _butterAmount;
        BUTTER_DRAW_RATE = _butterLimit;
        BUTTER_ID = _butterId;
    }

    modifier onlyOnce {
        require(drawnBefore[msg.sender] != true, "Can only draw once");
        _;
    }

    /**
     * Function callable from anyone, but can only be done once per Ethereum address.
     */
    function drawButter(string memory _secret, string memory _cidPath, bytes memory _signature) onlyOnce public {
        require(butterAmount > 0 wei, "No butter to draw");
        verifySecret(_secret);

        TREASURY.butterDrawn(msg.sender, BUTTER_ID, BUTTER_DRAW_RATE, butterAmount);
        butterAmount -= BUTTER_DRAW_RATE;
        drawnBefore[msg.sender] = true;

        COSMO_NUTS.spreadButter(TOKEN_ID, _cidPath, _signature);
    }

    /**
     * Takes a string input and hashes it; compares to the SECRET_HASH in the contract
     * If it matches, returns true.
     */
    function verifySecret(string memory _input) private view returns(bool) {
        bytes32 inputHash = keccak256(abi.encodePacked(_input));
        require(inputHash == SECRET_HASH, "Input does not match secret");
        return true;
    }


}
