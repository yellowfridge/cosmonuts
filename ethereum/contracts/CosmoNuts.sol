// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./CosmoCreation.sol";
import "./CosmoSappling.sol";
import "./CosmoButter.sol";

/**
  * @title CosmoNuts contract
  * @custom:security-contact security@gmail.com //put security contact info (recommended)
*/
// SPDX-License-Identifier: MIT
contract CosmoNuts is CosmoCreation {

    CosmoButter butter;
    CosmoSappling sappling;

    using ECDSA for bytes32;

    constructor(
        string memory _name,
        string memory _symbol,
        uint256 _initialNFTSupply,
        address _systemAddress,
        address _universeAddress
    )
        CosmoCreation(_name, _symbol, _initialNFTSupply, _systemAddress, _universeAddress) {}

    function withdraw() public onlyOwner {
        uint balance = address(this).balance;
        require(balance > 0 wei, "No balance to withdraw");
        payable(msg.sender).transfer(balance);
    }

    function flipSaleState() public onlyOwner {
        saleIsActive = !saleIsActive;
    }

    function createNut(
        uint256 _parentNut,
        uint256 _sapplingId,
        string memory _cidPath,
        bytes memory _signature
    ) public {
        require(_isApprovedOrOwner(_msgSender(), _parentNut), "ERC721: Caller is not owner nor approved");
        require(sapplingsOfNut[_parentNut] > 0, "Selected nut has no sapplings");

        growSappling(_parentNut, _sapplingId);

        uint mintIndex = totalSupply();
        _safeMint(msg.sender, mintIndex);
        changeTokenURI(mintIndex, _cidPath, _signature);
    }

    function createSappling(
        uint256 _tokenId,
        bytes32 _secretHash,
        string memory _cidPath,
        bytes memory _signature
        )
        public payable {
            require(totalSupply() >= INITIAL_NUTS, "Cannot spawn until total supply of initial nuts is met");
            require(nutPrice ^ (sapplingsOfNut[_tokenId] + 1) <= msg.value, "Ether value sent is not correct");

            uint256 sapplingIndex = sapplingsInUniverse;
            sappling = new CosmoSappling(address(this), _tokenId, sapplingIndex, _secretHash);
            payable(address(sappling)).transfer(msg.value);

            spawnSappling(_tokenId, sapplingIndex, address(sappling));

            changeTokenURI(_tokenId, _cidPath, _signature);
    }

    function createButter(
        uint256 _tokenId,
        bytes32 _secretHash,
        string memory _cidPath,
        bytes memory _signature,
        uint256 _butterDrawRate
        ) public payable {
            require(msg.value % _butterDrawRate == 0, "Draw rate is not perfectly divisible by total amount");

            uint256 butterIndex = butterCountInUniverse;
            butter = new CosmoButter(address(this), _tokenId, butterIndex, msg.value, _butterDrawRate, _secretHash);
            payable(address(butter)).transfer(msg.value);

            churnButter(_tokenId, butterIndex, address(butter), msg.value);

            changeTokenURI(_tokenId, _cidPath, _signature);
    }

    function spreadButter(
        uint256 _tokenId,
        uint256 _butterId,
        uint256 _butterTaken,
        string memory _cidPath,
        bytes memory _signature
        ) public {
        butterInUniverse -= _butterTaken;
        butterOutstandingOfNut[_tokenId][_butterId] -= _butterTaken;

        changeTokenURI(_tokenId, _cidPath, _signature);
    }

}
