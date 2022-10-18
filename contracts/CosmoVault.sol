// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "openzeppelin-solidity/contracts/utils/cryptography/ECDSA.sol";

import "./ICosmoNuts.sol";
import "./ICosmoVault.sol";

contract CosmoVault is ICosmoVault {

    struct Vault {
        address system;
        address cosmos;
    }
    Vault private vault;

    using ECDSA for bytes32;

    function initialize(address _systemAddress, address _cosmosAddress) external {
        vault.system = _systemAddress;
        vault.cosmos = _cosmosAddress;
    }

    function changeTokenURI(uint256 _tokenId, string memory _cidPath, bytes memory _signature) external virtual override {
        //require(_isApprovedOrOwner(_msgSender(), _tokenId), "Caller is not owner nor approved");
        bytes32 pathHash = keccak256(abi.encodePacked(_cidPath));
        require(isVerified(pathHash, _signature), "Data does not match signature");

        ICosmoNuts(vault.cosmos).setTokenURI(_tokenId, _cidPath);
    }

    function signerAddress(bytes32 _hash, bytes memory _signature) internal pure returns (address) {
        return _hash.recover(_signature);
    }

    function isVerified(bytes32 _pathHash, bytes memory _signature) internal view returns (bool) {
        // *Research* - Should you include the following "\x19Ethereum Signed Message:\n32"
        require(signerAddress(_pathHash, _signature) == vault.system, "Invalid signature");
        return true;
    }

}
