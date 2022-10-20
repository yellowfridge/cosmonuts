// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

interface ICosmoBang {

    function createCosmo(
        string memory _name,
        string memory _symbol,
        uint256 _supply,
        uint256 _price,
        uint256 _rate
    ) external returns (address);

}
