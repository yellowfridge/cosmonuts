// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract SeedAccounts {

    uint256 public seedsCreated = 0; // Number of seeds that have been created (never reduced)
    mapping(uint256 => uint256) public seedsOfNut; // Number of seeds created by this Nut in the Universe
    mapping(uint256 => uint256) public seedsGrownOfNut; // Seeds grown of Nut
    mapping(uint256 => uint256) public nutOfSeed; // The parent nut of the given seed
    mapping(uint256 => mapping(uint256 => bool)) public isSeedOfNut; // ** HERE CONVERT THIS
    mapping(uint256 => address) public seedLocations;
    mapping(uint256 => bool) public isSeedActive;

    function integrateSeed(
        uint256 _nutId,
        uint256 _seedId,
        address _seedLocation
    ) internal {
        nutOfSeed[_seedId] = _nutId;
        seedsOfNut[_nutId] += 1;
        isSeedOfNut[_seedId][_nutId] = true;
        seedLocations[_seedId] = _seedLocation;
        seedsCreated += 1;
        isSeedActive[_nutId] = true;
    }

    function growSeed(uint256 _seedId) internal {
        uint256 nutId = nutOfSeed[_seedId];
        seedsOfNut[nutId] -= 1;
        seedsGrownOfNut[nutId] += 1;
        isSeedActive[nutId] = false;
    }

}
