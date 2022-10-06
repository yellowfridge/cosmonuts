// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./CosmoNuts.sol";
import "./CosmoVault.sol";

contract CosmoBang {

    address public COSMOS_ADDRESS;
    address public VAULT_ADDRESS;

    CosmoVault vault;

    constructor(
        address _systemAddress,
        address _matterAddress,
        uint256 _nutPrice,
        uint256 _matterRate
    )
    {
        vault = new CosmoVault(_systemAddress, _matterAddress, _nutPrice, _matterRate);
        VAULT_ADDRESS = address(vault);
    }

    function nutBang(
        string memory _cosmosName,
        string memory _cosmosSymbol,
        uint256 _desiredEntities
    ) external {
        address treasuryAddress = vault.TREASURY_ADDRESS();
        address systemAddress = vault.SYSTEM_ADDRESS();
        CosmoNuts nuts = new CosmoNuts(_cosmosName, _cosmosSymbol, _desiredEntities, systemAddress, treasuryAddress);
        COSMOS_ADDRESS = address(nuts);
    }

}
