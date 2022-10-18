// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./ICosmoTreasury.sol";
import "./ICosmoNuts.sol";

/**
 * Contract created from a CosmoNut.  This contract holds a set amount of ether.
 * Ether is unlocked when the predetermined amount of matter is transferred to nut owner.
 */
contract CosmoSeed {

    struct Seed {
        uint256 id;
        uint256 nutId;
        uint256 heldEther;
        uint256 matterNeeded;
        address location;
        address treasuryLocation;
        address cosmosLocation;
        bytes32 secretHash;
    }
    Seed public seed;

    function initialize(
        uint256 _seedId,
        uint256 _nutId,
        address _treasuryLocation,
        address _cosmosLocation,
        bytes32 _secretHash
    ) public payable {
        seed.id = _seedId;
        seed.nutId = _nutId;
        seed.heldEther = msg.value;
        seed.matterNeeded = ICosmoTreasury(_treasuryLocation).matterNeeded(_nutId);
        seed.location = address(this);
        seed.treasuryLocation = _treasuryLocation;
        seed.cosmosLocation = _cosmosLocation;
        seed.secretHash = _secretHash;
    }

    function matterNeeded() public view returns (uint256) {
        return seed.matterNeeded;
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
     * Can be called from anyone who comes across, asks for secret from user
     * The application fills out the path and signature
     * If provided secret is correct, a new CosmoNut is minted and assigned to caller
     */
    function spawnNut(string memory _secret, string memory _cidPath, bytes memory _signature) public {
        verifySecret(_secret); // Check whether provided secret is correct
        ICosmoTreasury(seed.treasuryLocation).seedFromNut(seed.id, seed.matterNeeded);
        ICosmoNuts(seed.cosmosLocation).createNut(_cidPath, _signature);

        /**
         * Sending the original set price to Treasury.  This is payment for a new NFT (nut).
         * Consider implication - tax - and decision to keep?
         */
        uint256 nutPrice = ICosmoTreasury(seed.treasuryLocation).getPrice();
        (bool sentToTreasury,/*memory data*/) = seed.treasuryLocation.call{
            value: nutPrice
        }("");
        require(sentToTreasury, "Ether not sent to Treasury");

        /**
         * Sending remaining amount back to current nut owner who created the seed.
         */
        uint256 returnAmount = seed.heldEther - nutPrice;
        address nutOwner = ICosmoNuts(seed.cosmosLocation).getOwnerOf(seed.nutId);
        (bool sentToParent,/*memory data*/) = nutOwner.call{
            value: returnAmount
        }("");
        require(sentToParent, "Ether not sent to parent nut");
    }

    /**
     * Functions below relate to receiving ether.  This contract holds ether.
     * Do we need? - researching
     */

}
