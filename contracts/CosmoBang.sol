// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./CosmoNuts.sol";
import "./CosmoTreasury.sol";

contract CosmoBang {

    address public COSMO_ADDRESS;
    address public TREASURY_ADDRESS;

    CosmoNuts nuts;
    CosmoTreasury treasury;

    /**
    constructor(
        address _systemAddress,
        address _matterAddress,
        string memory _cosmosName,
        string memory _cosmosSymbol,
        uint256 _desiredEntities,
        uint256 _matterRate
    ) {
        treasury = new CosmoTreasury(_matterAddress, _matterRate);
        cosmonuts = new CosmoNuts(_cosmosName, _cosmosSymbol, _desiredEntities, _systemAddress, address(treasury));
        TREASURY_ADDRESS = address(treasury);
        COSMO_ADDRESS = address(cosmonuts);
    }
    */

    function nutBang(
        address _systemAddress,
        address _matterAddress,
        string memory _cosmosName,
        string memory _cosmosSymbol,
        uint256 _desiredEntities,
        uint256 _matterRate
    ) external {
        treasury = new CosmoTreasury(_matterAddress, _matterRate);
        nuts = new CosmoNuts(_cosmosName, _cosmosSymbol, _desiredEntities, _systemAddress, address(treasury));
        TREASURY_ADDRESS = address(treasury);
        COSMO_ADDRESS = address(nuts);
    }

}
