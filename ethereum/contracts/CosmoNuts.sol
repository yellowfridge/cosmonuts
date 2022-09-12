// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./ERC721.sol";
import "../extensions/ERC721Enumerable";
import "../extensions/ERC721URIStorage.sol";
import "../access/Ownable.sol";
import "../utils/cryptography/ECDSA.sol";

/**
  * @title CosmoNuts contract
  * @custom:security-contact security@gmail.com //put security contact info (recommended)
*/
contract CosmoNuts is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable {

    uint256 public constant nutPrice = 100000000000000000;
    uint256 public constant maxNutPurchase = 1;
    uint256 public MAX_NUTS;
    bool public saleIsActive = false;
    address private SYSTEM_ADDRESS;

    using ECDSA for bytes32;

    constructor(string memory _name, string memory _symbol, uint256 _maxNFTSupply, address _systemAddress) ERC721(_name, _symbol) {
        MAX_NUTS = _maxNFTSupply;
        SYSTEM_ADDRESS = _systemAddress;
    }

    function _baseURI() internal pure override returns (string memory) {
    return "https://ipfs.io/ipfs/";
    }

    function withdraw() public onlyOwner {
    uint balance = address(this).balance;
    payable(msg.sender).transfer(balance);
    }

    function flipSaleState() public onlyOwner {
        saleIsActive = !saleIsActive;
    }

    function mintNut(uint numberOfNuts, string memory nutCID) public payable {
        require(saleIsActive, "Sale must be active to mint Nut");
        require(numberOfNuts <= maxNutPurchase, "Exceeded the number of tokens that can be minted at a time");
        require(totalSupply() + numberOfNuts <= MAX_NUTS, "Purchase would exceed max supply of Nuts");
        require(nutPrice * numberOfNuts <= msg.value, "Ether value sent is not correct");

        for(uint i=0; i<numberOfNuts; i++) {
            uint mintIndex = totalSupply();
            _safeMint(msg.sender, mintIndex);
            _setTokenURI(mintIndex, nutCID);
        }
    }

    function signerAddress(bytes32 hash, bytes memory signature) internal pure returns (address) {
        return hash.recover(signature);
    }

    function isVerified(bytes32 pathHash, bytes memory signature) private view returns (bool isValid) {
        // *Research* - Should you include the following "\x19Ethereum Signed Message:\n32"
        require(signerAddress(pathHash, signature) == SYSTEM_ADDRESS, "Invalid signature");
        isValid = true;
        return isValid;
    }

    function changeTokenURI(uint256 tokenId, string memory cidPath, bytes memory signature) public {
        require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721: Caller is not owner nor approved");
        bytes32 pathHash = keccak256(abi.encodePacked(cidPath));
        require(isVerified(pathHash, signature), "Provided data does not match signed hash");
        _setTokenURI(tokenId, cidPath);
    }

    // Work in progress
    function spawnSapplings(uint256 tokenId, bytes32 secretHash, uint numberOfSapplings) public payable {
        require(totalSupply() >= MAX_NUTS, "Cannot spawn until total supply of nuts is met");
        require(nutPrice * numberOfSapplings <= msg.value, "Ether value sent is not correct");
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
}
