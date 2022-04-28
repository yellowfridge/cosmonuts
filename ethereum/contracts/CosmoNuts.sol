// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./ERC721.sol";
import "../extensions/ERC721Enumerable";
import "../extensions/ERC721URIStorage.sol";
import "../access/Ownable.sol";

/**
  * @title CosmoNuts contract
  * @custom:security-contact security@gmail.com //put security contact info (recommended)
  */
contract CosmoNuts is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable {
  //using SafeMath for uint256; //Do you need to define this still - taking out for now - not needed for .8.0 and above

  string public CN_PROVENANCE = "";
  uint256 public constant nutPrice = 100000000000000000; //0.1 ETH BAYC had .08 ETH
  // Should we just do 1?  Isn't that point?  BAYC did 20.
  uint256 public constant maxNutPurchase = 1; // sets the max number of nuts you can buy at a time
  uint256 public MAX_NUTS;
  bool public saleIsActive = false;
  uint256 public REVEAL_TIMESTAMP;

  // Create a mapping of token id to all token uri's
  mapping(uint256 => string[]) private traveledURIs;

  // Using 1645347572 for saleStart date in tests
  constructor(string memory name, string memory symbol, uint256 maxNFTSupply, uint256 saleStart) ERC721(name, symbol) {
      MAX_NUTS = maxNFTSupply;
      REVEAL_TIMESTAMP = saleStart + (86400 * 9); // Represents 9 days - from BAYC code (86,400 * 9) - should show exact amount to save gas
  }

  // Set Base URI
  function _baseURI() internal pure override returns (string memory) {
    return "https://baseruri/";
  }

  // Allows developer to withdraw funds
  function withdraw() public onlyOwner {
    uint balance = address(this).balance;
    payable(msg.sender).transfer(balance);
  }

  // Set reveal timestamp
  // Do you need the above reveal_timestamp in constructor - why not just set from here - i guess to have the option to change?
  function setRevealTimestamp(uint256 revealTimeStamp) public onlyOwner {
    REVEAL_TIMESTAMP = revealTimeStamp;
  }

  // Set initial provenance hash to prove initial set of images is same
  function setProvenanceHash(string memory provenanceHash) public onlyOwner {
    CN_PROVENANCE = provenanceHash;
  }

  // Pause sale if active, make active if paused
  function flipSaleState() public onlyOwner {
      saleIsActive = !saleIsActive;
  }

  // Mint Cosmo Nuts
  function mintNut(uint numberOfTokens) public payable {
    require(saleIsActive, "Sale must be active to mint Nut");
    require(numberOfTokens <= maxNutPurchase, "Can only mint 1 token at a time");
    require(totalSupply() + numberOfTokens <= MAX_NUTS, "Purchase would exceed max supply of Nuts");
    require(nutPrice * numberOfTokens <= msg.value, "Ether value sent is not correct");

    for(uint i = 0; i < numberOfTokens; i++) {
      uint mintIndex = totalSupply();

      // Do we need this check in the new contract? (does it do it automatically?)
      if (totalSupply() < MAX_NUTS) {
        _safeMint(msg.sender, mintIndex);
        _setTokenURI(mintIndex, Strings.toString(mintIndex));
        string memory uri = tokenURI(mintIndex);
        traveledURIs[mintIndex].push(uri);
      }
    }

  }

  // Starting revisions

  // Allows CosmoNuts to change their URI
  function changeTokenURI(uint256 tokenId, string memory new_tokenURI) public {
    require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721: caller is not owner nor approved");
    _setTokenURI(tokenId, new_tokenURI);
    string memory new_uri = tokenURI(tokenId);
    traveledURIs[tokenId].push(new_uri);
  }

  function getURIs(uint256 tokenId) public view virtual returns (string[] memory) {
    return traveledURIs[tokenId];
  }

  // The following functions are overrides required by Solidity.
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
