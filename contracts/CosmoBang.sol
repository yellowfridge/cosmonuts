// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import { Clones } from "openzeppelin-solidity/contracts/proxy/Clones.sol";

import "./CosmoNuts.sol";
import "./ICosmoNuts.sol";
import "./CosmoTreasury.sol";

contract CosmoBang {

    struct Cosmo {
        address systemAddress;
        address matterAddress;
        address treasuryImplementation;
    }
    Cosmo cosmo;

    function initialize(
        address _systemAddress,
        address _matterAddress,
        address _treasuryImplementation,
        address _seedImplementation,
        address _butterImplementation,
        uint256 _price,
        uint256 _rate
    ) external returns (address) {
        cosmo.systemAddress = _systemAddress;
        cosmo.matterAddress = _matterAddress;
        cosmo.treasuryImplementation = _treasuryImplementation;

        CosmoTreasury treasury = CosmoTreasury(Clones.clone(cosmo.treasuryImplementation));
        treasury.initialize(
            cosmo.systemAddress,
            cosmo.matterAddress,
            _seedImplementation,
            _butterImplementation,
            _price,
            _rate
        );

        return address(treasury);
    }

    function createCosmo(
        string memory _name,
        string memory _symbol,
        uint256 _supply,
        address _treasuryLocation,
        address _vaultImplementation
    ) external returns (address) {
        CosmoNuts nuts = new CosmoNuts(
            _name,
            _symbol,
            _supply,
            cosmo.systemAddress,
            _treasuryLocation,
            _vaultImplementation
        );
        ICosmoNuts(address(nuts)).createVault();

        return address(nuts);
    }

}
