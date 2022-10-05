// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./CosmoCreation.sol";

/**
 * Main Contract for the NFT tokens.
 * System address resembles the public address of the software application.
 */
 contract CosmoNuts is CosmoCreation {

     using ECDSA for bytes32;

     constructor(
         string memory _name,
         string memory _symbol,
         uint256 _initialNFTSupply,
         address _systemAddress,
         address _treasuryAddress
     )
         CosmoCreation(_name, _symbol, _initialNFTSupply, _systemAddress, _treasuryAddress)
     {}

     // only system address?
     function withdraw() public onlyOwner {
         uint256 balance = address(this).balance;
         require(address(this).balance > 0 wei, "No balance to withdraw");
         payable(msg.sender).transfer(balance);
     }

     // only system address?
     function flipSaleState() public onlyOwner {
         saleIsActive = !saleIsActive;
     }

     /*
      * Called from CosmoSeed to mint a new Nut
      */
     function createNut(
         string memory _cidPath,
         bytes memory _signature
     ) external {
         uint256 mintIndex = totalSupply();
         _safeMint(msg.sender, mintIndex);
         changeTokenURI(mintIndex, _cidPath, _signature);
     }

     /**
      * Function callable by Nut owner to create a seed which has the potential to turn into a new Nut.
      * Requires the input of a secretHash and a specified amount of Ether to create.
      * A required level of matter must be burned which is equal to the amount of seeds you have in Universe
      * multiplied by the matterRate.
      */
     function createSeed(
         uint256 _nutId,
         bytes32 _secretHash,
         string memory _cidPath,
         bytes memory _signature
         )
         public payable {
             require(address(msg.sender) == ownerOf(_nutId), "Caller is not owner of nut");
             require(totalSupply() >= INITIAL_NUTS, "Nuts still exist from creation");

             treasury.spawnSeed(_nutId, _secretHash);
             changeTokenURI(_nutId, _cidPath, _signature);
     }

     /**
      * Function callable by Nut owner to create a matter faucet which allows other users to draw matter
      * Creation requires a secret hash that must be known to suppy matter
      * Creation requires input of total number of matter in contract and the amount each user can draw at a single time
      * Drawing any amount of matter results in the creation of new supply of matter
      * In creating the faucet, the creator replenishes the accounts of other nut holders (tax on system to create message)
      * Caller will also receive matter if others call on this function
      */
     function createButter(
         uint256 _nutId,
         bytes32 _secretHash,
         uint256 _matterContributed,
         string memory _cidPath,
         bytes memory _signature,
         uint256 _drawRate
     ) public {
         require(address(msg.sender) == ownerOf(_nutId), "Caller is not owner of nut");
         treasury.newButter(_nutId, _matterContributed, _drawRate, _secretHash);
         changeTokenURI(_nutId, _cidPath, _signature);
     }

     /**
      * Called by CosmoButter when some matter is drawn from the contract.
      */
     function spreadButter(
         uint256 _tokenId,
         string memory _cidPath,
         bytes memory _signature
         ) external {
         changeTokenURI(_tokenId, _cidPath, _signature);
     }

 }
