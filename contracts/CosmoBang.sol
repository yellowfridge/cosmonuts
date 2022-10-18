// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./CosmoNuts.sol";
//import "./CosmoVault.sol";
//import "./ICosmoTreasury.sol";
import "./CosmoTreasury.sol";
import "./ICosmoBang.sol";

contract CosmoBang is ICosmoBang {

    struct Cosmo {
        //string name;
        //string symbol;
        //uint256 supply;
        address systemAddress;
        address matterAddress;
    }
    Cosmo cosmo;

    //address public override COSMO_ADDRESS;

    //CosmoVault vault;
    //CosmoTreasury treasury;
    //CosmoTreasury treasury;
    //CosmoNuts cosmonuts;

    function initialize(
        address _systemAddress,
        address _matterAddress
    ) public {
        cosmo.systemAddress = _systemAddress;
        cosmo.matterAddress = _matterAddress;
    }

    /*
    constructor(
        //string memory _name,
        //string memory _symbol,
        //uint256 _supply,
        address _systemAddress,
        address _matterAddress
    )
    {
        //treasury = new CosmoTreasury(_systemAddress, _matterAddress);

        //cosmo.name = _name;
        //cosmo.symbol = _symbol;
        //cosmo.supply = _supply;
        cosmo.systemAddress = _systemAddress;
        cosmo.matterAddress = _matterAddress;

        /*
        cosmonuts = new CosmoNuts(
            cosmo.name,
            cosmo.symbol,
            cosmo.supply,
            cosmo.systemAddress,
            address(treasury)
        );

        COSMO_ADDRESS = address(cosmonuts);

    }
    */

    function createTreasury() internal returns (address) {
        CosmoTreasury treasury = new CosmoTreasury(cosmo.systemAddress, cosmo.matterAddress);
        return address(treasury);
    }

    function createNuts(
        string memory _name,
        string memory _symbol,
        uint256 _supply,
        address _treasuryLocation
    ) internal returns (address) {
        CosmoNuts nuts = new CosmoNuts(
           _name,
            _symbol,
            _supply,
            cosmo.systemAddress,
            _treasuryLocation
        );

        return address(nuts);
    }

    function createCosmo(
        string memory _name,
        string memory _symbol,
        uint256 _supply
    ) external virtual override returns (address) {
        address treasuryAddress = createTreasury();
        return createNuts(_name, _symbol, _supply, treasuryAddress);
    }

    /*
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
    */

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
