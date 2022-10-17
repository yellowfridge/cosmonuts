// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./CosmoVault.sol";
import "./CosmoBang.sol";

contract CosmoBuilder {

    address public SYSTEM_ADDRESS;

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

    //mapping(uint256 => address) bangAddressOfCosmo;

    /*
    constructor(address _systemAddress) {
        SYSTEM_ADDRESS = _systemAddress;
    }
    */

    //function createVault(address _matterAddress) internal returns (address) {
    //    CosmoVault vault = new CosmoVault(SYSTEM_ADDRESS, _matterAddress);
    //    return address(vault);
    //}

    // This needs to utilize CosmoBang contract to move away CosmoNuts
    function createCosmo(
        //uint256 _id,
        string memory _name,
        string memory _symbol,
        uint256 _amount,
        address _matterAddress
    ) internal returns (address) {
        CosmoVault vault = new CosmoVault(SYSTEM_ADDRESS, _matterAddress);

        CosmoBang bang = new CosmoBang(
            _name, _symbol, _amount, SYSTEM_ADDRESS, address(vault)
        );

        //bangAddressOfCosmo[_id] = address(bang);

        bang.nutBang();

        return bang.COSMO_ADDRESS();
    }


}
