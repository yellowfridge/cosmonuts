// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "openzeppelin-solidity/contracts/utils/cryptography/ECDSA.sol";
import "./CosmoTreasury.sol";

contract CosmoVault {

    address public SYSTEM_ADDRESS;
    //address public MATTER_ADDRESS;
    address public TREASURY_ADDRESS;
    //address public COSMO_ADDRESS;

    uint256 public NUT_PRICE;
    uint256 public MATTER_RATE;

    CosmoTreasury treasury;

    using ECDSA for bytes32;

    constructor(
        address _systemAddress,
        address _matterAddress,
        //address _treasuryAddress,
        //address _cosmoAddress
        uint256 _nutPrice,
        uint256 _matterRate
    )
    //CosmoTreasury(_systemAddress, _matterAddress, _matterRate, _nutPrice)
    {
        //SYSTEM_ADDRESS = _systemAddress;
        //MATTER_ADDRESS = _matterAddress;
        //TREASURY_ADDRESS = _treasuryAddress;
        //COSMO_ADDRESS = _cosmoAddress;
        treasury = new CosmoTreasury(_systemAddress, _matterAddress, _matterRate, _nutPrice);
        TREASURY_ADDRESS = address(treasury);
        NUT_PRICE = _nutPrice;
        MATTER_RATE = _matterRate;
    }

    function calcMatterNeeded(uint256 _nutId) public view returns (uint256) {
        return treasury.matterNeeded(_nutId);
    }

    function giveMintBalance(uint256 _nutIndex) external {
        treasury.assignMintBalance(TREASURY_ADDRESS, _nutIndex);
    }

    function growSeedFromNut(uint256 _seedId) public {
        //uint256 nutId = treasury.nutOfSeed[_seedId];
        uint256 nutId = treasury.nutOfSeed(_seedId);
        uint256 matterNeeded = calcMatterNeeded(nutId);
        treasury.seedFromNut(_seedId, matterNeeded);
    }

    function newSeed(uint256 _nutId, bytes32 _secretHash) external {
        treasury.spawnSeed(_nutId, _secretHash);
    }

    function newButterJar(uint256 _nutId, uint256 _matterContributed, bytes32 _secretHash) external {
        treasury.newButter(_nutId, _matterContributed, MATTER_RATE, _secretHash);
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
        require(signerAddress(_pathHash, _signature) == treasury.SYSTEM_ADDRESS(), "Invalid signature");
        return true;
    }


}
