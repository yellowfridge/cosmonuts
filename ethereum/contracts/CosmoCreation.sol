// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "./CosmoVault.sol";

contract CosmoCreation is CosmoVault, ERC721, ERC721Enumerable, ERC721URIStorage, Ownable {

    uint256 public INITIAL_NUTS;
    address public TRESAURY_ADDRESS;

    uint256 public totalNuts;
    uint256 public constant maxNutPurchase = 1;
    bool public saleIsActive = false;

    constructor(
        string memory _name,
        string memory _symbol,
        uint256 _initialSupply,
        address _systemAddress,
        address _treasuryAddress,
        uint256 _nutPrice
    )
    ERC721(_name, _symbol)
    CosmoVault(_systemAddress, _treasuryAddress, _nutPrice)
    {
        totalNuts = totalSupply();
        INITIAL_NUTS = _initialSupply;
        TREASURY_ADDRESS = _treasuryAddress;
    }

    function _baseURI() internal pure override returns (string memory) {
        return "https://ipfs.io/ipfs/";
    }

    function mintNut(uint _numberOfNuts, string memory _nutCID) public payable {
        require(saleIsActive, "Sale must be active to mint Nut");
        require(_numberOfNuts <= maxNutPurchase, "Exceeded the number of tokens that can be minted at a time");
        require(totalSupply() + _numberOfNuts <= INITIAL_NUTS, "Purchase would exceed initial supply of nuts");
        require(NUT_PRICE * _numberOfNuts <= msg.value, "Ether value sent is not correct");

        for(uint i=0; i<_numberOfNuts; i++) {
            uint mintIndex = totalSupply();
            _safeMint(TREASURY_ADDRESS, mintIndex);
            _setTokenURI(mintIndex, _nutCID);
            treasury.assignMintBalance(address(msg.sender), mintIndex);
        }
    }

    function changeTokenURI(uint256 _tokenId, string memory _cidPath, bytes memory _signature) internal {
        require(_isApprovedOrOwner(_msgSender(), _tokenId), "ERC721: Caller is not owner nor approved");
        bytes32 pathHash = keccak256(abi.encodePacked(_cidPath));
        require(isVerified(pathHash, _signature), "Provided data does not match signed hash");

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
