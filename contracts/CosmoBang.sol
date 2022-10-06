// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./CosmoNuts.sol";
//import "./CosmoTreasury.sol";
import "./CosmoVault.sol";

contract CosmoBang is CosmoVault {

    //address public SYSTEM_ADDRESS;
    //address public MATTER_ADDRESS;
    //address public TREASURY_ADDRESS;
    address public COSMOS_ADDRESS;

    //CosmoTreasury treasury;
    //CosmoNuts nuts;

    constructor(
        address _systemAddress,
        address _matterAddress,
        //string memory _cosmosName,
        //string memory _cosmosSymbol,
        uint256 _nutPrice,
        //uint256 _desiredEntities,
        uint256 _matterRate
    )
    CosmoVault(_systemAddress, _matterAddress, _nutPrice, _matterRate)
    //CosmoTreasury(_matterAddress, _matterRate, _nutPrice)

    //CosmoNuts(_cosmosName, _cosmosSymbol, _desiredEntities, _systemAddress, address(treasury))
    {
        //treasury = new CosmoTreasury(_matterAddress, _matterRate);
        //cosmonuts = new CosmoNuts(_cosmosName, _cosmosSymbol, _desiredEntities, _systemAddress, address(treasury));
        //COSMO_ADDRESS = address(nuts);
        //MATTER_ADDRESS = _matterAddress;
        //treasury = CosmoTreasury(address(treasury));

    }

    function nutBang(
        string memory _cosmosName,
        string memory _cosmosSymbol,
        uint256 _desiredEntities
    ) external {
        CosmoNuts nuts = new CosmoNuts(_cosmosName, _cosmosSymbol, _desiredEntities, SYSTEM_ADDRESS, TREASURY_ADDRESS);
        COSMOS_ADDRESS = address(nuts);
    }

    /*
    function nutBang(
        address _systemAddress,
        address _matterAddress,
        string memory _cosmosName,
        string memory _cosmosSymbol,
        uint256 _desiredEntities,
        uint256 _matterRate
    ) external {
        CosmoTreasury treasury = new CosmoTreasury(_matterAddress, _matterRate);
        CosmoNuts nuts = new CosmoNuts(_cosmosName, _cosmosSymbol, _desiredEntities, _systemAddress, address(treasury));
        TREASURY_ADDRESS = address(treasury);
        COSMO_ADDRESS = address(nuts);
    }
    */

}
