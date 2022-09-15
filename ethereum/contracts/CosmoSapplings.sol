// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./CosmoNuts.sol";

contract CosmoSappling {

    uint256 public TOKEN_ID;
    bytes32 public SECRET_HASH;
    uint256 public SAPPLING_ID;

    CosmoNuts COSMO_NUTS;

    constructor(address _nutsAddress, uint256 _tokenId, bytes32 _secretHash, uint256 _sapplingId) {
        TOKEN_ID = _tokenId;
        SECRET_HASH = _secretHash;
        COSMO_NUTS = CosmoNuts(_nutsAddress);
        SAPPLING_ID = _sapplingId;
    }

    function verifySecret(string memory _input) private view returns(bool isSecret) {
        bytes32 inputHash = keccak256(abi.encodePacked(_input));
        require(inputHash == SECRET_HASH, "Provided input does not match secret");
        isSecret = true;
        return isSecret;
    }

    function spawnNut(string memory _secret, string memory _cidPath, bytes memory _signature) public {
        verifySecret(_secret);
        COSMO_NUTS.growSappling(TOKEN_ID, SAPPLING_ID, _cidPath, _signature);
        selfdestruct(payable(msg.sender));
    }

}
