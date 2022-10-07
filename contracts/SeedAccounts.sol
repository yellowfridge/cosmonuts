// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract SeedAccounts {

    uint256 public seedsCreated = 0; // Number of seeds that have been created (never reduced)
    mapping(uint256 => uint256[]) public seedsOfNut;
    mapping(uint256 => uint256[]) public seedsGrownOfNut;
    mapping(uint256 => uint256) public nutOfSeed; // The parent nut of the given seed
    mapping(uint256 => mapping(uint256 => bool)) public isSeedOfNut;
    mapping(uint256 => address) public seedLocations;
    mapping(uint256 => bool) public isSeedActive;

    function numOfSeedsOf(uint256 _nutId) public view returns (uint256) {
        return seedsOfNut[_nutId].length;
    }

    function numOfSeedsGrownOf(uint256 _nutId) public view returns (uint256) {
        return seedsGrownOfNut[_nutId].length;
    }

    function integrateSeed(
        uint256 _nutId,
        uint256 _seedId,
        address _seedLocation
    ) internal {
        nutOfSeed[_seedId] = _nutId;
        seedsOfNut[_nutId].push(_seedId);
        isSeedOfNut[_seedId][_nutId] = true;
        seedLocations[_seedId] = _seedLocation;
        seedsCreated += 1;
        isSeedActive[_nutId] = true;
    }

    function growSeed(uint256 _seedId) internal {
        uint256 nutId = nutOfSeed[_seedId];
        seedsGrownOfNut[nutId].push(_seedId);
        isSeedActive[nutId] = false;
    }

}
