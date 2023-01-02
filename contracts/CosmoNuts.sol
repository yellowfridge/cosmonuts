// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./CosmoCreation.sol";
import "./ICosmoNuts.sol";
import "./ICosmoVault.sol";
import "./ICosmoTreasury.sol";

/**
 * @title CosmoNuts - Collection of ERC721 Tokens
 */
contract CosmoNuts is CosmoCreation, ICosmoNuts {

    using ECDSA for bytes32;

    event ButterCreated(
        address indexed _from, uint256 _nutId, address indexed _location, uint256 _amount, uint256 _rate, string _path
    );
    event SeedCreated(
        address indexed _from, uint256 _nutId, address indexed _location, uint256 _heldEth, uint256 _burnedMatter, string _path
    );

    constructor(
        string memory _name,
        string memory _symbol,
        uint256 _initialNFTSupply,
        address _systemAddress,
        address _treasuryAddress,
        address _vaultImplementation
    )
        CosmoCreation(
            _name,
            _symbol,
            _initialNFTSupply,
            _systemAddress,
            _treasuryAddress,
            _vaultImplementation
        )
    {
        ICosmoTreasury(_treasuryAddress).linkCosmo(address(this));
    }

    function vaultLocation() public view override returns (address) {
        return creation.vault;
    }

    function setTokenURI(uint256 _nutId, string memory _nutCID) external virtual override {
        _setTokenURI(_nutId, _nutCID);
    }

    function getOwnerOf(uint256 _nutId) public view virtual override returns (address) {
        return ownerOf(_nutId);
    }

    function createVault() external virtual override returns (address) {
        return openVault(address(this));
    }

    // only system address?
    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        require(address(this).balance > 0 wei, "No balance to withdraw");
        payable(msg.sender).transfer(balance);
    }

    /// @dev What is this? Compared to mintNut?
    function newNutMint(address _to) external virtual override returns (uint256) {
        uint256 nutIndex = totalSupply();
        _safeMint(_to, nutIndex);

        return nutIndex;
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
        public payable returns (address seedLocation) {
            require(address(msg.sender) == ownerOf(_nutId), "Caller is not owner of nut");
            require(totalSupply() >= creation.initialSupply, "Nuts still exist from creation");

            uint256 ethToHold = ICosmoTreasury(creation.treasury).ethToHold(_nutId);
            require(msg.value >= ethToHold, "Ether value is not enough");

            uint256 matterNeeded = ICosmoTreasury(creation.treasury).matterNeeded(_nutId);
            uint256 matterOfOwner = ICosmoTreasury(creation.treasury).matterOf(msg.sender);
            require(matterOfOwner >= matterNeeded, "Matter balance is not enough");

            ICosmoTreasury(creation.treasury).grantApproval(
                msg.sender,
                creation.treasury,
                matterNeeded
            );

            ICosmoTreasury(creation.treasury).burnMatterFrom(msg.sender, matterNeeded);

            seedLocation = ICosmoTreasury(creation.treasury).spawnSeed(_nutId, _secretHash);
            (bool sentToSeed, /*memory data*/) = seedLocation.call{
                value: msg.value
            }("");
            require(sentToSeed, "Ether not sent to seed");

            ICosmoVault(creation.vault).changeTokenURI(
                _nutId, _cidPath, _signature
            );

            emit SeedCreated(
                msg.sender, _nutId, seedLocation, msg.value, matterNeeded, _cidPath
            );

            return seedLocation;
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
    ) public returns (address butterLocation) {
        require(address(msg.sender) == ownerOf(_nutId), "Caller is not owner of nut");
        require(_matterContributed % _matterDrawRate == 0, "Draw rate not perfectly divisible by contribution");
        uint256 matterOfOwner = ICosmoTreasury(creation.treasury).matterOf(msg.sender);
        require(matterOfOwner >= _matterContributed, "Matter owned is less than desired contribution");

        ICosmoTreasury(creation.treasury).grantApproval(
            msg.sender,
            creation.treasury,
            _matterContributed
        );

        butterLocation = ICosmoTreasury(creation.treasury).newButter(
            _nutId, _matterContributed, _matterDrawRate, _secretHash
        );

        ICosmoVault(creation.vault).changeTokenURI(
            _nutId, _cidPath, _signature
        );

        emit ButterCreated(
            msg.sender, _nutId, butterLocation, _matterContributed, _matterDrawRate, _cidPath
        );

        return butterLocation;
    }

}
