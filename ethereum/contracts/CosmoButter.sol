// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./CosmoNuts.sol";

contract CosmoButter {

    uint256 public TOKEN_ID;
    bytes32 public SECRET_HASH;
    uint256 public BUTTER_LIMIT;
    uint256 public BUTTER_ID;

    CosmoNuts COSMO_NUTS;

    uint256 public butterAmount;

    mapping(address => bool) public drawnBefore;

    constructor(address _nutsAddress, uint256 _tokenId, bytes32 _secretHash, uint256 _butterAmount, uint256 _butterLimit, uint256 _butterId) {
        COSMO_NUTS = CosmoNuts(_nutsAddress);
        TOKEN_ID = _tokenId;
        SECRET_HASH = _secretHash;
        BUTTER_LIMIT = _butterLimit;
        butterAmount = _butterAmount;
        COSMO_NUTS = CosmoNuts(_nutsAddress);
        BUTTER_ID = _butterId;
    }

    modifier onlyOnce {
        require(drawnBefore[msg.sender] != true, "Address has drawn before");
        _;
    }

    function drawButter(string memory _secret, string memory _cidPath, bytes memory _signature) onlyOnce public {
        verifySecret(_secret);
        butterAmount = address(this).balance;
        require(butterAmount > 0 wei, "No butter to draw");
        payable(msg.sender).transfer(BUTTER_LIMIT);
        butterAmount -= BUTTER_LIMIT;
        drawnBefore[msg.sender] = true;

        COSMO_NUTS.spreadButter(TOKEN_ID, BUTTER_ID, BUTTER_LIMIT, _cidPath, _signature);

        // If no more butter is left, destroy the contract
        if(butterAmount == 0 wei) {
            selfdestruct(payable(msg.sender));
        }
    }

    function verifySecret(string memory _input) private view returns(bool isSecret) {
        bytes32 inputHash = keccak256(abi.encodePacked(_input));
        require(inputHash == SECRET_HASH, "Provided input does not match secret");
        isSecret = true;
        return isSecret;
    }


}
