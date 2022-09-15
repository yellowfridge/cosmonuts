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

    uint256 public INITIAL_NUTS;
    address private SYSTEM_ADDRESS;

    uint256 public totalNuts;
    uint256 public constant nutPrice = 100000000000000000; // .01 eth
    uint256 public constant maxNutPurchase = 1;
    bool public saleIsActive = false;

    // Variables for the CosmoSapplings
    CosmoSappling sappling;
    uint256 public totalSapplings;
    mapping(uint256 => uint256) public sapplingsCount;
    mapping(uint256 => uint256) public grownSapplingsCount;
    mapping(uint256 => uint256[]) public sapplingsHeld;
    mapping(uint256 => address) public sapplingLocations;

    // Variables for the CosmoButter
    CosmoButter butter;
    uint256 public totalButter;
    mapping(uint256 => uint256) public butterCount;
    mapping(uint256 => uint256) public butterCreated;
    mapping(uint256 => uint256[]) public butterHeld;
    mapping(uint256 => uint256) public butterOutstanding;
    mapping(uint256 => address) public butterLocations;

    using ECDSA for bytes32;

    constructor(string memory _name, string memory _symbol, uint256 _initialNFTSupply, address _systemAddress) ERC721(_name, _symbol) {
        INITIAL_NUTS = _initialNFTSupply;
        SYSTEM_ADDRESS = _systemAddress;
        totalNuts = totalSupply();
    }

    function _baseURI() internal pure override returns (string memory) {
        return "https://ipfs.io/ipfs/";
    }

    function withdraw() public onlyOwner {
        uint balance = address(this).balance;
        require(balance > 0 wei, "No balance to withdraw");
        payable(msg.sender).transfer(balance);
    }

    function flipSaleState() public onlyOwner {
        saleIsActive = !saleIsActive;
    }

    function mintNut(uint numberOfNuts, string memory nutCID) public payable {
        require(saleIsActive, "Sale must be active to mint Nut");
        require(numberOfNuts <= maxNutPurchase, "Exceeded the number of tokens that can be minted at a time");
        require(totalSupply() + numberOfNuts <= INITIAL_NUTS, "Purchase would exceed initial supply of nuts");
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

    function createNut(string memory _cidPath, bytes memory _signature) private {
        uint mintIndex = totalSupply();
        _safeMint(msg.sender, mintIndex);
        changeTokenURI(mintIndex, _cidPath, _signature);
    }

    function growSappling(uint256 _tokenId, uint256 _sapplingId, string memory _cidPath, bytes memory _signature) public {
        sapplingsCount[_tokenId] -=  1;
        grownSapplingsCount[_tokenId] += 1;
        delete sapplingsHeld[_tokenId][_sapplingId];
        delete sapplingLocations[_sapplingId];
        createNut(_cidPath, _signature);
    }

    function spawnSappling(uint256 tokenId, bytes32 secretHash, string memory cidPath, bytes memory signature) public payable {
        require(totalSupply() >= INITIAL_NUTS, "Cannot spawn until total supply of initial nuts is met");
        require(nutPrice ^ (sapplingsCount[tokenId] + 1) <= msg.value, "Ether value sent is not correct");

        uint256 sapplingId = sapplingsCount[tokenId];
        sappling = new CosmoSappling(address(this), tokenId, secretHash, sapplingId);
        payable(address(sappling)).transfer(msg.value);

        sapplingsCount[tokenId] += 1;
        sapplingsHeld[tokenId].push(sapplingId);
        sapplingLocations[sapplingId] = address(sappling);

        changeTokenURI(tokenId, cidPath, signature);
    }

    function createButter(uint256 _tokenId, bytes32 _secretHash, string memory _cidPath, bytes memory _signature, uint256 _butterDrawRate) public payable {
        uint256 butterToCreate = msg.value;
        require(butterToCreate % _butterDrawRate == 0, "Draw rate is not perfectly divisible by total amount");

        uint256 butterId = butterCount[_tokenId];
        butter = new CosmoButter(address(this), _tokenId, _secretHash, butterToCreate, _butterDrawRate, butterId);
        payable(address(butter)).transfer(msg.value);

        butterCount[_tokenId] += 1;
        butterCreated[_tokenId] += butterToCreate;
        butterHeld[_tokenId].push(butterId);
        butterLocations[_tokenId] = address(butter);
        butterOutstanding[_tokenId] += butterToCreate;
        changeTokenURI(_tokenId, _cidPath, _signature);
    }

    function spreadButter(uint256 _tokenId, uint256 _butterId, uint256 _butterTaken, string memory _cidPath, bytes memory _signature) public {
        butterCount[_tokenId] -= 1;
        butterOutstanding[_tokenId] -= _butterTaken;
        delete butterHeld[_tokenId][_butterId];
        delete butterLocations[_butterId];
        changeTokenURI(_tokenId, _cidPath, _signature);
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
