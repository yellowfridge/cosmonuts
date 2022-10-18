// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./CosmoNuts.sol";
import "./CosmoTreasury.sol";
import "./ICosmoBang.sol";

contract CosmoBang is ICosmoBang {

    struct Cosmo {
        address systemAddress;
        address matterAddress;
    }
    Cosmo cosmo;

    function initialize(
        address _systemAddress,
        address _matterAddress
    ) public {
        cosmo.systemAddress = _systemAddress;
        cosmo.matterAddress = _matterAddress;
    }

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
    ) external virtual override returns (address cosmoAddress) {
        address treasuryAddress = createTreasury();
        cosmoAddress = createNuts(_name, _symbol, _supply, treasuryAddress);
        return cosmoAddress;
    }

}
