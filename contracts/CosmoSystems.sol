// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./CosmoVault.sol";
import "./CosmoBang.sol";

contract CosmoSystems {

    uint256 COSMOS_INDEX;

    address public SYSTEM_ADDRESS;
    address public MATTER_ADDRESS;

    struct Cosmo {
        bool status;
        uint256 id;
        uint256 price;
        uint256 rate;
        uint256 amount;
        string name;
        string symbol;
        address location;
        address vaultLocation;
    }
    Cosmo cosmo;
    mapping(uint256 => Cosmo) public cosmos;

    constructor(address _systemAddress) {
        SYSTEM_ADDRESS = _systemAddress;
        COSMOS_INDEX = 0;
    }

    /*
    constructor(string memory _name, string memory _symbol) {
        cosmo.name = _name;
        cosmo.symbol = _symbol;
    }
    */

    function createVault() internal {
        CosmoVault vault = new CosmoVault(SYSTEM_ADDRESS, MATTER_ADDRESS);
        cosmos[COSMOS_INDEX].vaultLocation = address(vault);
    }

    // This needs to utilize CosmoBang contract to move away CosmoNuts
    function createCosmo() internal {
        CosmoBang bang = new CosmoBang(
            cosmos[COSMOS_INDEX].name,
            cosmos[COSMOS_INDEX].symbol,
            cosmos[COSMOS_INDEX].amount,
            SYSTEM_ADDRESS,
            cosmos[COSMOS_INDEX].vaultLocation
        );
        /*
        CosmoNuts nuts = new CosmoNuts(
            cosmos[COSMOS_INDEX].name,
            cosmos[COSMOS_INDEX].symbol,
            cosmos[COSMOS_INDEX].amount,
            SYSTEM_ADDRESS,
            cosmos[COSMOS_INDEX].vaultLocation
        );
        */

        // Maybe assert that the above came back true ...
        //cosmos[COSMOS_INDEX].location = address(nuts);
        cosmos[COSMOS_INDEX].location = bang.COSMO_ADDRESS();
        cosmos[COSMOS_INDEX].status = true;
    }


}
