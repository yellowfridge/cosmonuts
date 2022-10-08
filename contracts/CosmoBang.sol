// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./CosmoNuts.sol";
import "./CosmoVault.sol";

contract CosmoBang {

    address public COSMO_ADDRESS;

    CosmoVault vault;
    CosmoNuts cosmo;

    constructor(
        string memory _name,
        string memory _symbol,
        uint256 _supply,
        address _systemAddress,
        address _vaultAddress
    )
    {
        //vault = new CosmoVault(_systemAddress, _matterAddress);
        vault = CosmoVault(_vaultAddress);
        cosmo = new CosmoNuts(_name, _symbol, _supply, _systemAddress, _vaultAddress);
        COSMO_ADDRESS = address(cosmo);
    }

    /*
    function nutBang(
        string memory _cosmosName,
        string memory _cosmosSymbol,
        uint256 _nutPrice,
        uint256 _nutRate,
        uint256 _desiredEntities
    ) external returns (address[] memory cosmoAddresses) {
        vault.entityCreation(_nutPrice, _nutRate, _desiredEntities);
        CosmoNuts cosmonuts = new CosmoNuts(
            _cosmosName,
            _cosmosSymbol,
            _desiredEntities,
            vault.SYSTEM_ADDRESS(),
            vault.TREASURY_ADDRESS()
        );
        cosmoAddresses[0] = address(vault);
        cosmoAddresses[1] = address(cosmonuts);
        return cosmoAddresses;
    }
    */

}
