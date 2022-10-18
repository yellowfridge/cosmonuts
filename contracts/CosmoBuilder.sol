// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./CosmoVault.sol";
import "./CosmoBang.sol";

contract CosmoBuilder {

    address public SYSTEM_ADDRESS;

    address private vaultAddress;
    address private cosmosAddress;

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
    //mapping(uint256 => Cosmo) public cosmos;

    //mapping(uint256 => address) bangAddressOfCosmo;

    constructor(address _systemAddress) {
        SYSTEM_ADDRESS = _systemAddress;
    }

    function insertSystemInfo(
        uint256 _id,
        uint256 _price,
        uint256 _rate,
        uint256 _amount,
        string memory _name,
        string memory _symbol
    ) external {
        cosmo.status = false;
        cosmo.id = _id;
        cosmo.price = _price;
        cosmo.rate =  _rate;
        cosmo.amount = _amount;
        cosmo.name = _name;
        cosmo.symbol = _symbol;
    }

    function createVault(address _matterAddress) internal returns (address) {
        CosmoVault vault = new CosmoVault(SYSTEM_ADDRESS, _matterAddress);
        return address(vault);
    }


    // This needs to utilize CosmoBang contract to move away CosmoNuts
    /*
    function createCosmo(
        //uint256 _id,
        //string memory _name,
        //string memory _symbol,
        //uint256 _amount,
        address _matterAddress
    ) external returns (address) {
        //CosmoVault vault = new CosmoVault(SYSTEM_ADDRESS, _matterAddress);
        vaultAddress = createVault(_matterAddress);

        //CosmoBang bang = new CosmoBang(
        //    _name, _symbol, _amount, SYSTEM_ADDRESS, vaultAddress
        //);

        //bangAddressOfCosmo[_id] = address(bang);

        //bang.nutBang();

        return address(bang);
    }
    */


}
