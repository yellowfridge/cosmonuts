pragma solidity >=0.7.0;

/**
  * @title CosmoNuts contract
  */
contract CosmoNuts is ERC721, Ownable {
  using SafeMath for uint256;

  string public CN_PROVENANCE = "";
  uint256 public constant nutPrice = 100000000000000000; //0.1 ETH BAYC had .08 ETH
  // Should we just do 1?  Isn't that point?  BAYC did 20.
  uint256 public constant maxNutPurchase = 1; // sets the max number of nuts you can buy at a time
  uint256 public MAX_NUTS;
  bool public saleIsActive = false;
  uint256 public REVEAL_TIMESTAMP;

  constructor(string memory name, string memory symbol, uint256 maxNFTSupply, uint256 saleStart) ERC721(name, symbol) {
      MAX_NUTS = maxNFTSupply;
      REVEAL_TIMESTAMP = saleStart + (86400 * 9) // Represents 9 days - from BAYC code (86,400 * 9) - showing exact amount to save gas
  }

  // Allows developer to withdraw funds
  function withdraw() public onlyOwner {
    uint balance = address(this).balance;
    msg.sender.transfer(balance);
  }

  // Set reveal timestamp
  // Do you need the above reveal_timestamp in constructor - why not just set from here - i guess to have the option to change?
  function setRevealTimestamp(uint256 revealTimeStamp) public onlyOwner {
    REVEAL_TIMESTAMP = revealTimeStamp;
  }

  // Set initial provenance hash to prove initial set of images is same
  function setProvenanceHash(string memory provenanceHash) public onlyOwner {
    BACY_PROVENANCE = provenanceHash;
  }

  // Pause sale if active, make active if paused
  function flipSaleState() public onlyOwner {
      saleIsActive = !saleIsActive;
  }

  // Set the baseuri where metadata will be stored
  // This is no longer how it is done - using URIStorage - go to newest implementation
  function setBaseURI(string memory baseURI) public onlyOwner {
    _setBaseURI(baseURI);
  }

  // Mint Cosmo Nuts
  function mintNut(uint numberOfTokens) public payable {
    require(saleIsActive, "Sale must be active to mint Nut");
    require(numberOfTokens <= maxNutPurchase, "Can only mint 1 token at a time");
    require(totalSupply().add(numberOfTokens) <= MAX_NUTS, "Purchase would exceed max supply of Nuts");
    require(nutPrice.mul(numberOfTokens) <= msg.value, "Ether value sent is not correct");
  }

  //


}
