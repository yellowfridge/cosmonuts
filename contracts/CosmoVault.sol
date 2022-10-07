// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "openzeppelin-solidity/contracts/utils/cryptography/ECDSA.sol";
import "./CosmoTreasury.sol";

contract CosmoVault {

    address public SYSTEM_ADDRESS;
    address public TREASURY_ADDRESS;
    uint256 public NUT_PRICE;
    uint256 public NUT_RATE;
    uint256 public NUTS_INITIAL;
    bool public SALE_STATUS;

    CosmoTreasury treasury;

    using ECDSA for bytes32;

    constructor(
        address _systemAddress,
        address _matterAddress
    )
    {
        SALE_STATUS = false;
        treasury = new CosmoTreasury(_systemAddress, _matterAddress);
        TREASURY_ADDRESS = address(treasury);
    }

    function lightsOn() external {
        SALE_STATUS = true;
    }

    function entityCreation(uint256 _nutPrice, uint256 _nutRate, uint256 _numNuts) external {
        NUT_PRICE = _nutPrice;
        NUT_RATE = _nutRate;
        NUTS_INITIAL = _numNuts;
    }

    function calcMatterNeeded(uint256 _nutId) public view returns (uint256) {
        return treasury.matterNeeded(_nutId);
    }

    function giveMintBalance(uint256 _nutIndex) external {
        treasury.assignMintBalance(TREASURY_ADDRESS, _nutIndex);
    }

    function growSeedFromNut(uint256 _seedId) public {
        uint256 nutId = treasury.nutOfSeed(_seedId);
        uint256 matterNeeded = calcMatterNeeded(nutId);
        treasury.seedFromNut(_seedId, matterNeeded);
    }

    function newSeed(uint256 _nutId, bytes32 _secretHash) external {
        treasury.spawnSeed(_nutId, _secretHash);
    }

    function newButterJar(uint256 _nutId, uint256 _matterContributed, bytes32 _secretHash) external {
        treasury.newButter(_nutId, _matterContributed, NUT_RATE, _secretHash);
    }

    //modifier onlySystem {
    //    require(address(msg.sender) == SYSTEM_ADDRESS, "Caller is not system");
    //    _;
    //}

    //function updateSystemAddress(address _newSystemAddress) public onlySystem {
    //    SYSTEM_ADDRESS = _newSystemAddress;
    //}

    //function updateTreasuryAddress(address _newTreasuryAddress) public onlySystem {
    //    TREASURY_ADDRESS = _newTreasuryAddress;
    //}

    function signerAddress(bytes32 _hash, bytes memory _signature) internal pure returns (address) {
        return _hash.recover(_signature);
    }


    function isVerified(bytes32 _pathHash, bytes memory _signature) external view returns (bool) {
        // *Research* - Should you include the following "\x19Ethereum Signed Message:\n32"
        require(signerAddress(_pathHash, _signature) == SYSTEM_ADDRESS, "Invalid signature");
        return true;
    }


}
