// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./CosmoCreation.sol";
import "./ICosmoNuts.sol";
import "./ICosmoVault.sol";

/**
 * Main Contract for the NFT tokens.
 * System address resembles the public address of the software application.
 */
 contract CosmoNuts is CosmoCreation, ICosmoNuts {

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

    function setTokenURI(uint256 _nutId, string memory _nutCID) external virtual override {
        _setTokenURI(_nutId, _nutCID);
    }

    function getOwnerOf(uint256 _nutId) public view virtual override returns (address) {
        return ownerOf(_nutId);
    }

    function createVault() external virtual override returns (address) {
        //return openVault(SYSTEM_ADDRESS, address(this));
        return openVault(address(this));
    }

    // only system address?
    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        require(address(this).balance > 0 wei, "No balance to withdraw");
        payable(msg.sender).transfer(balance);
    }

    /*
     * Called from CosmoSeed to mint a new Nut
     */
    function createNut(
        string memory _cidPath,
        bytes memory _signature
    ) external virtual override returns (bool) {
        uint256 mintIndex = totalSupply();
        _safeMint(msg.sender, mintIndex);
        //ICosmoVault(VAULT_ADDRESS).changeTokenURI(
        ICosmoVault(creation.vault).changeTokenURI(
            mintIndex, _cidPath, _signature
        );
        return true;
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
        public payable returns (bool) {
            require(address(msg.sender) == ownerOf(_nutId), "Caller is not owner of nut");
            //require(totalSupply() >= NUTS_INITIAL, "Nuts still exist from creation");
            require(totalSupply() >= creation.initialSupply, "Nuts still exist from creation");

            //ICosmoTreasury(TREASURY_ADDRESS).spawnSeed(_nutId, _secretHash);
            ICosmoTreasury(creation.treasury).spawnSeed(_nutId, _secretHash);
            //ICosmoVault(VAULT_ADDRESS).changeTokenURI(
            ICosmoVault(creation.vault).changeTokenURI(
                _nutId, _cidPath, _signature
            );

            return true;
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
        uint256 _matterDrawRate,
        string memory _cidPath,
        bytes memory _signature
    ) public {
        require(address(msg.sender) == ownerOf(_nutId), "Caller is not owner of nut");
        //ICosmoTreasury(TREASURY_ADDRESS).newButter(_nutId, _matterContributed, _matterDrawRate, _secretHash);
        ICosmoTreasury(creation.treasury).newButter(_nutId, _matterContributed, _matterDrawRate, _secretHash);
        //ICosmoVault(VAULT_ADDRESS).changeTokenURI(
        ICosmoVault(creation.vault).changeTokenURI(
            _nutId, _cidPath, _signature
        );
    }

    /**
     * Called by CosmoButter when some matter is drawn from the contract.
     */
    function spreadButter(
        uint256 _tokenId,
        string memory _cidPath,
        bytes memory _signature
        ) external virtual override returns (bool) {
        //ICosmoVault(VAULT_ADDRESS).changeTokenURI(
        ICosmoVault(creation.vault).changeTokenURI(
            _tokenId, _cidPath, _signature
        );
        return true;
    }

}
