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

contract CosmoCreation is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable {

    struct Creation {
        uint256 initialSupply;
        address system;
        address treasury;
        address vault;
        address vaultImplementation;
    }
    Creation public creation;

    using ECDSA for bytes32;

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

    function mintNut(uint256 _nutId, string memory _nutCID) public payable {
        //require(vault.SALE_STATUS(), "Sale must be active");
        //require(totalSupply() < vault.NUTS_INITIAL(), "Exceed initial supply of nuts");
        //require(NUT_PRICE * _numberOfNuts <= msg.value, "Ether value is not correct");

        _safeMint(creation.treasury, totalSupply());
        _setTokenURI(totalSupply(), _nutCID);
        ICosmoTreasury(creation.treasury).assignMintBalance(creation.treasury, _nutId);
    }

    // ----- The following functions are overrides required by Solidity -----
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
