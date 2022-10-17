// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./CosmoNuts.sol";
import "./CosmoVault.sol";

contract CosmoBang {

    struct Cosmo {
        string name;
        string symbol;
        uint256 supply;
        address systemAddress;
        address vaultAddress;
    }
    Cosmo cosmo;

    address public COSMO_ADDRESS;

    //CosmoVault vault;
    //CosmoNuts cosmo;

    constructor(
        string memory _name,
        string memory _symbol,
        uint256 _supply,
        address _systemAddress,
        address _vaultAddress
    )
    {
        cosmo.name = _name;
        cosmo.symbol = _symbol;
        cosmo.supply = _supply;
        cosmo.systemAddress = _systemAddress;
        cosmo.vaultAddress = _vaultAddress;
    }

    function nutBang() external {
        CosmoNuts cosmonuts = new CosmoNuts(
            cosmo.name,
            cosmo.symbol,
            cosmo.supply,
            cosmo.systemAddress,
            cosmo.vaultAddress
        );
        COSMO_ADDRESS = address(cosmonuts);
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
