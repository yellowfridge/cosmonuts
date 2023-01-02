// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";
import "openzeppelin-solidity/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "openzeppelin-solidity/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "openzeppelin-solidity/contracts/access/Ownable.sol";
import "openzeppelin-solidity/contracts/utils/cryptography/ECDSA.sol";
import { Clones } from "openzeppelin-solidity/contracts/proxy/Clones.sol";

import "./ICosmoTreasury.sol";
import "./CosmoVault.sol";

/**
 * @title CosmoCreation - The Forming of the Cosmo
 * @notice Handles the creation process of the NFT collection.
 * @dev Implementation of the ERC721 contract occurs here.  Name and symbol are only inputs required.
 */
contract CosmoCreation is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable {

    using ECDSA for bytes32;

    struct Creation {
        uint256 initialSupply;
        address system;
        address treasury;
        address vault;
        address vaultImplementation;
    }
    Creation public creation;

    event NutMinted(address indexed _to, uint256 _nutId, string _nutCID);

    constructor(
        string memory _name,
        string memory _symbol,
        uint256 _supply,
        address _systemAddress,
        address _treasuryAddress,
        address _vaultImplementation
    )
    ERC721(_name, _symbol)
    {
        creation.initialSupply = _supply;
        creation.system = _systemAddress;
        creation.treasury = _treasuryAddress;
        creation.vaultImplementation = _vaultImplementation;
    }

    function _baseURI() internal pure override returns (string memory) {
        return "https://ipfs.io/ipfs/";
    }

    function openVault(
        address _cosmosAddress
    ) internal returns (address) {
        CosmoVault vault = CosmoVault(Clones.clone(creation.vaultImplementation));
        vault.initialize(creation.system, _cosmosAddress);
        creation.vault = address(vault);
        return creation.vault;
    }

    /**
     * @notice Creates a new nut and assigns ownership to the caller provided they have paid the required price in ETH.
     * @dev Once the initial supply of nuts is depleted, this function will no longer work.
     */
    function mintNut(string memory _nutCID) public payable {
        /// @param nutIndex is the current id number of the nut.  First Nut is 0.
        uint256 nutIndex = totalSupply();
        require(nutIndex < creation.initialSupply, "Initial supply of nuts is depleted");

        /// @param nutPrice is the amount needed and is stored under the Treasury contract.
        uint256 nutPrice = ICosmoTreasury(creation.treasury).getPrice();
        require(msg.value >= nutPrice, "Ether value provided is not enough");

        _safeMint(msg.sender, nutIndex);
        _setTokenURI(nutIndex, _nutCID);
        ICosmoTreasury(creation.treasury).assignMintBalance(msg.sender);

        emit NutMinted(msg.sender, nutIndex, _nutCID);
    }

    /// @dev The following functions are overrides required due to inheritance of ERC721 Enumerable and Storage.
    function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721Enumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
    // -----      -----     -----     -----     -----
}
