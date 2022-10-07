// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./CosmoNuts.sol";
import "./CosmoVault.sol";

contract CosmoBang {

    CosmoVault vault;

    constructor(
        address _systemAddress,
        address _matterAddress
        //uint256 _nutPrice,
        //uint256 _matterRate
    )
    {
        vault = new CosmoVault(_systemAddress, _matterAddress);
    }

    function nutBang(
        string memory _cosmosName,
        string memory _cosmosSymbol,
        uint256 _nutPrice,
        uint256 _nutRate,
        uint256 _desiredEntities
    ) external returns (address) {
        vault.entityCreation(_nutPrice, _nutRate, _desiredEntities);
        CosmoNuts nuts = new CosmoNuts(
            _cosmosName,
            _cosmosSymbol,
            _desiredEntities,
            vault.SYSTEM_ADDRESS(),
            vault.TREASURY_ADDRESS()
        );
        return address(nuts);
    }

}
