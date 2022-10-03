// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./CosmoNuts.sol";
import "./CosmoTreasury.sol";

contract CosmoBang {

    address public COSMO_ADDRESS;
    address public TREASURY_ADDRESS;

    CosmoNuts cosmonuts;
    CosmoTreasury treasury;

    constructor(
        address _systemAddress,
        address _matterAddress,
        string memory _cosmosName,
        string memory _cosmosSymbol,
        uint256 _desiredEntities,
        uint256 _matterRate
    ) {
        //uint256 matterToCreate = _desiredEntities * _matterRate;

        treasury = new CosmoTreasury(_matterAddress, _matterRate);
        cosmonuts = new CosmoNuts(_cosmosName, _cosmosSymbol, _desiredEntities, _systemAddress, address(treasury));
        //treasury.updateCosmosAddress(cosmosAddress);

        TREASURY_ADDRESS = address(treasury);
        COSMO_ADDRESS = address(cosmonuts);
    }

    /*
    function nutBang(
        uint256 _initialSupply,
        address _systemAddress,
        address _treasuryAddress
    ) internal {
        cosmonuts = new CosmoNuts(COSMOS_NAME, COSMOS_SYMBOL, _initialSupply, _systemAddress, _treasuryAddress);
        cosmosAddress = address(cosmonuts);
    }
    */

}
