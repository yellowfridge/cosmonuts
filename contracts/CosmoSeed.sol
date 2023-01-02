// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./ICosmoTreasury.sol";
import "./ICosmoNuts.sol";
import "./ICosmoSeed.sol";
import "./ICosmoMatter.sol";
import "./ICosmoVault.sol";

/**
 * @title CosmoSeed
 * @notice A Seed is created through ownership of a nut (ERC 721 Token).  Holds a set amount of ETH in contract.
 * @notice ETH is unlocked and given back to owner when the Seed is claimed.
 */
contract CosmoSeed is ICosmoSeed {

    struct Seed {
        uint256 id;
        uint256 nutId;
        uint256 heldEther;
        uint256 matterNeeded;
        address location;
        address matter;
        address treasury;
        address cosmos;
        bytes32 secretHash;
    }
    Seed public seed;

    function initialize(
        uint256 _seedId,
        uint256 _nutId,
        address _matter,
        address _treasury,
        address _cosmos,
        bytes32 _secretHash
    ) external virtual override {
        seed.id = _seedId;
        seed.nutId = _nutId;
        seed.heldEther = 0;
        seed.matterNeeded = ICosmoTreasury(_treasury).matterNeeded(_nutId);
        seed.location = address(this);
        seed.matter = _matter;
        seed.treasury = _treasury;
        seed.cosmos = _cosmos;
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
    function spawnNut(string memory _secret, string memory _cidPath, bytes memory _signature) public returns (bool) {
        verifySecret(_secret); // Check whether provided secret is correct

        uint256 matterOfCaller = ICosmoTreasury(seed.treasury).matterOf(msg.sender);
        require(matterOfCaller >= seed.matterNeeded, "Not enough matter to spawn a nut");

        ICosmoMatter(seed.matter).grantApproval(
            msg.sender,
            address(this),
            seed.matterNeeded
        );

        address parentNutOwner = ICosmoNuts(seed.cosmos).getOwnerOf(seed.nutId);
        ICosmoMatter(seed.matter).transferMatterFrom(msg.sender, parentNutOwner, seed.matterNeeded);

        uint256 newNutId = ICosmoNuts(seed.cosmos).newNutMint(msg.sender);

        address vault = ICosmoTreasury(seed.treasury).getVaultLocation();
        ICosmoVault(vault).changeTokenURI(
            newNutId, _cidPath, _signature
        );

        ICosmoMatter(seed.matter).mintMatter(
            msg.sender,
            1
        );

        ICosmoTreasury(seed.treasury).growSeed(seed.id);

        /**
         * Sending the original set price to Treasury.  This is payment for a new NFT (nut).
         * Consider implication - tax - and decision to keep?
         */
        uint256 nutPrice = ICosmoTreasury(seed.treasury).getPrice();
        address system = ICosmoTreasury(seed.treasury).getSystem();
        (bool sentToSystem,/*memory data*/) = system.call{
            value: nutPrice
        }("");
        require(sentToSystem, "Ether not sent to System");

        /**
         * Sending remaining amount back to current nut owner who created the seed.
         */
        uint256 returnAmount = seed.heldEther - nutPrice;

        (bool sentToParent,/*memory data*/) = parentNutOwner.call{
            value: returnAmount
        }("");
        require(sentToParent, "Ether not sent to parent nut");

        return true;
    }

    /**
     * Functions below relate to receiving ether.  This contract holds ether.
     */
     // Function to receive Ether, msg.data must be empty
    receive() external payable {
        seed.heldEther = msg.value;
    }

    // Fallback function is called when msg.data is not empty
    //fallback() external payable {}

    function getBalance() public view virtual override returns (uint256) {
        return address(this).balance;
    }

}
