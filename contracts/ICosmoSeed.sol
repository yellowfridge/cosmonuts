// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

interface ICosmoSeed {

    function getBalance() external view returns (uint256);

    function initialize(
        uint256 _seedId,
        uint256 _nutId,
        address _treasuryLocation,
        address _cosmosLocation,
        bytes32 _secretHash
    ) external;

}
