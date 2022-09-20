// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./CosmoNuts.sol";

contract CosmoSappling {

    uint256 public TOKEN_ID;
    uint256 public SAPPLING_ID;
    bytes32 private SECRET_HASH;

    CosmoNuts COSMO_NUTS;

    constructor(address _nutsAddress, uint256 _tokenId, uint256 _sapplingId, bytes32 _secretHash) {
        COSMO_NUTS = CosmoNuts(_nutsAddress);
        TOKEN_ID = _tokenId;
        SAPPLING_ID = _sapplingId;
        SECRET_HASH = _secretHash;
    }
    
    function verifySecret(string memory _input) private view returns(bool isSecret) {
        bytes32 inputHash = keccak256(abi.encodePacked(_input));
        require(inputHash == SECRET_HASH, "Provided input does not match secret");
        isSecret = true;
        return isSecret;
    }

    function spawnNut(string memory _secret, string memory _cidPath, bytes memory _signature) public {
        verifySecret(_secret);
        COSMO_NUTS.createNut(TOKEN_ID, SAPPLING_ID, _cidPath, _signature);
        selfdestruct(payable(msg.sender));
    }

}
