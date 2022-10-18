// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

interface ICosmoBang {

    function createCosmo(
        string memory _name,
        string memory _symbol,
        uint256 _supply
    ) external returns (address);

}
