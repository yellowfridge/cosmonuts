// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";
import "openzeppelin-solidity/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "openzeppelin-solidity/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "openzeppelin-solidity/contracts/access/Ownable.sol";
import "openzeppelin-solidity/contracts/utils/cryptography/ECDSA.sol";

//import "./CosmoVault.sol";
import "./ICosmoTreasury.sol";

contract CosmoCreation is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable {

    //CosmoVault vault;

    uint256 public NUTS_INITIAL;

    address public SYSTEM_ADDRESS;
    address public TREASURY_ADDRESS;

    using ECDSA for bytes32;

    constructor(
        string memory _name,
        string memory _symbol,
        uint256 _supply,
        address _systemAddress,
        address _treasuryAddress
    )
    ERC721(_name, _symbol)
    {
        //vault = CosmoVault(_vaultAddress);
        NUTS_INITIAL = _supply;
        SYSTEM_ADDRESS = _systemAddress;
        TREASURY_ADDRESS = _treasuryAddress;
    }

    function _baseURI() internal pure override returns (string memory) {
        return "https://ipfs.io/ipfs/";
    }

    function mintNut(uint256 _nutId, string memory _nutCID) public payable {
        //require(vault.SALE_STATUS(), "Sale must be active");
        //require(totalSupply() < vault.NUTS_INITIAL(), "Exceed initial supply of nuts");
        //require(NUT_PRICE * _numberOfNuts <= msg.value, "Ether value is not correct");

        //_safeMint(vault.TREASURY_ADDRESS(), totalSupply());
        _safeMint(TREASURY_ADDRESS, totalSupply());
        _setTokenURI(totalSupply(), _nutCID);
        //vault.giveMintBalance(totalSupply());
        ICosmoTreasury(TREASURY_ADDRESS).assignMintBalance(TREASURY_ADDRESS, _nutId);
    }

    function changeTokenURI(uint256 _tokenId, string memory _cidPath, bytes memory _signature) internal {
        require(_isApprovedOrOwner(_msgSender(), _tokenId), "Caller is not owner nor approved");
        bytes32 pathHash = keccak256(abi.encodePacked(_cidPath));
        require(isVerified(pathHash, _signature), "Data does not match signature");

        _setTokenURI(_tokenId, _cidPath);
    }

    function signerAddress(bytes32 _hash, bytes memory _signature) internal pure returns (address) {
        return _hash.recover(_signature);
    }

    function isVerified(bytes32 _pathHash, bytes memory _signature) internal view returns (bool) {
        // *Research* - Should you include the following "\x19Ethereum Signed Message:\n32"
        require(signerAddress(_pathHash, _signature) == SYSTEM_ADDRESS, "Invalid signature");
        return true;
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
