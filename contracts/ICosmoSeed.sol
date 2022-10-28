// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

interface ICosmoSeed {

    function getBalance() external view returns (uint256);

    function initialize(
        uint256 _seedId,
        uint256 _nutId,
        //uint256 _nutPrice,
        //address _system,
        address _matter,
        address _treasury,
        address _cosmos,
        bytes32 _secretHash
    ) external;

}
