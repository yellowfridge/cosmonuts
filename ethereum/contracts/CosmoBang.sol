// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./CosmoNuts.sol";

contract CosmoBang {

    string public COSMOS_NAME;
    string public COSMOS_SYMBOL;

    uint256 public cosmosIndex;
    address public cosmosAddress;

    CosmoNuts cosmonuts;

    constructor(
        string memory _cosmosName,
        string memory _cosmosSymbol
        )
        {
            COSMOS_NAME = _cosmosName;
            COSMOS_SYMBOL = _cosmosSymbol;
        }

    function nutBang(
        uint256 _initialSupply,
        address _systemAddress,
        address _treasuryAddress,
        uint256 _nutPrice
    ) internal {
        cosmonuts = new CosmoNuts(COSMOS_NAME, COSMOS_SYMBOL, _initialSupply, _systemAddress, _treasuryAddress, _nutPrice);
        cosmosAddress = address(cosmonuts);
    }

}
