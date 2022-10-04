// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./CosmoNuts.sol";
import "./CosmoTreasury.sol";

contract CosmoSeed {

    struct Seed {
        uint256 id;
        uint256 nutId;
        uint256 heldEther;
        uint256 matterNeeded;
        address location;
        address nutLocation;
        bytes32 secretHash;
    }
    Seed seed;

    CosmoNuts nuts;
    CosmoTreasury treasury;

    constructor(
        uint256 _seedId,
        uint256 _nutId,
        address _treasuryAddress,
        bytes32 _secretHash
    ) payable {
        address nutLocation = address(msg.sender);
        nuts = CosmoNuts(nutLocation);
        treasury = CosmoTreasury(_treasuryAddress);

        seed.id = _seedId;
        seed.nutId = _nutId;
        seed.heldEther = msg.value;
        seed.matterNeeded = treasury.calcMatterNeeded(_nutId);
        seed.location = address(this);
        seed.nutLocation = nutLocation;
        seed.secretHash = _secretHash;
    }

    function nutId() public view returns (uint256) {
        return seed.nutId;
    }

    /**
     * Takes a string input and hashes it; compares to the SECRET_HASH in the contract
     * If it matches, returns true
     */
    function verifySecret(string memory _input) private view returns(bool) {
        bytes32 inputHash = keccak256(abi.encodePacked(_input));
        require(inputHash == seed.secretHash, "Input does not match secret");
        return true;
    }

    /**
     * Called from CosmoNuts as part of the spawnNut function below
     * Jumping back to transfer funds, and downgrade contract (does this mean deletion? - self-destruct)
     */
    function degradeSeed(address _parentNutOwner) external payable {
        // Something not right here - need to double check how does msg.value work here?
        uint256 nutPrice = treasury.NUT_PRICE();
        uint256 excessEth = msg.value - nutPrice; // Excess ether is defined as total paid less orignial set price
        payable(address(treasury)).transfer(nutPrice); // Transfer the set nut price to Treasury
        payable(_parentNutOwner).transfer(excessEth); // Transfer remaining back to parent nut owner
    }

    /**
     * Can be called from anyone who comes across, asks for secret from user
     * The application fills out the path and signature
     * If provided secret is correct, a new CosmoNut is minted and assigned to caller
     */
    function spawnNut(string memory _secret, string memory _cidPath, bytes memory _signature) public {
        verifySecret(_secret); // Check whether provided secret is correct
        treasury.growSeedFromNut(seed.id, seed.matterNeeded);
        nuts.createNut(_cidPath, _signature); // Mints the new NFT and assigns to caller
    }

}
