// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "./CosmoTreasury.sol";

contract CosmoVault {

    address private SYSTEM_ADDRESS;
    address public TREASURY_ADDRESS;
    uint256 public NUT_PRICE;

    CosmoTreasury treasury;

    using ECDSA for bytes32;

    constructor(address _systemAddress, address _treasuryAddress, uint256 _nutPrice) {
        SYSTEM_ADDRESS = _systemAddress;
        TREASURY_ADDRESS = _treasuryAddress;
        NUT_PRICE = _nutPrice;
        treasury = CosmoTreasury(_treasuryAddress);
    }

    modifier onlySystem {
        require(address(msg.sender) == SYSTEM_ADDRESS, "Caller is not system");
        _;
    }

    function updateSystemAddress(address _newSystemAddress) public onlySystem {
        SYSTEM_ADDRESS = _newSystemAddress;
    }

    function updateTreasuryAddress(address _newTreasuryAddress) public onlySystem {
        TREASURY_ADDRESS = _newTreasuryAddress;
    }

    function signerAddress(bytes32 _hash, bytes memory _signature) internal pure returns (address) {
        return _hash.recover(_signature);
    }

    function isVerified(bytes32 _pathHash, bytes memory _signature) internal view returns (bool isValid) {
        // *Research* - Should you include the following "\x19Ethereum Signed Message:\n32"
        require(signerAddress(_pathHash, _signature) == SYSTEM_ADDRESS, "Invalid signature");
        isValid = true;
        return isValid;
    }

}
