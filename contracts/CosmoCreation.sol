// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";
import "openzeppelin-solidity/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "openzeppelin-solidity/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "openzeppelin-solidity/contracts/access/Ownable.sol";
import "openzeppelin-solidity/contracts/utils/cryptography/ECDSA.sol";

import "./CosmoVault.sol";

contract CosmoCreation is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable {

    uint256 public INITIAL_NUTS;

    uint256 public totalNuts;
    bool public saleIsActive = false;

    address treasuryAddress;

    CosmoVault vault;

    constructor(
        string memory _name,
        string memory _symbol,
        uint256 _initialSupply,
        address _vaultAddress
    )
    ERC721(_name, _symbol)
    {
        totalNuts = totalSupply();
        INITIAL_NUTS = _initialSupply;
        vault = CosmoVault(_vaultAddress);
        treasuryAddress = vault.TREASURY_ADDRESS();
    }

    function _baseURI() internal pure override returns (string memory) {
        return "https://ipfs.io/ipfs/";
    }

    function mintNut(string memory _nutCID) public payable {
        require(saleIsActive, "Sale must be active");
        require(totalSupply() < INITIAL_NUTS, "Exceed initial supply of nuts");
        //require(NUT_PRICE * _numberOfNuts <= msg.value, "Ether value is not correct");

        _safeMint(treasuryAddress, totalSupply());
        _setTokenURI(totalSupply(), _nutCID);
        vault.giveMintBalance(totalSupply());
    }

    function changeTokenURI(uint256 _tokenId, string memory _cidPath, bytes memory _signature) internal {
        require(_isApprovedOrOwner(_msgSender(), _tokenId), "Caller is not owner nor approved");
        bytes32 pathHash = keccak256(abi.encodePacked(_cidPath));
        require(vault.isVerified(pathHash, _signature), "Data does not match signature");

        _setTokenURI(_tokenId, _cidPath);
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
