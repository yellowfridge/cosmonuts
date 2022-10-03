// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract ButterAccounts {

    /**
     * butterWeight is the amount of matter in the universe thta is currently outstanding.
     * butterSpread is the amount of matter that has been distributed from butterWeight, thus reducing its value.
     * butterJams represent the total number of matter contracts created in the Universe.
     */
    uint256 public butterWeight = 0;
    uint256 public butterSpread = 0;
    uint256 public butterJars = 0;

    /**
     * buttersOfNut represents a list of all butter contracts created byt that nut.
     * butterLocations represents the address of contract identifed by butterId.
     *
     */
    mapping(uint256 => uint256[]) public buttersOfNut;
    mapping(uint256 => address) public butterLocations;
    mapping(uint256 => uint256) public matterMintedByNut; // Amount of matter minted by this Nut
    mapping(uint256 => uint256) public butterChurnedByNut;
    mapping(uint256 => uint256) public nutOfButter;

    uint256 public butterDeficiencyInUniverse = 0; // Represents matter that's not fully restored to each nut
    mapping(uint256 => uint256) public butterDeficiencyOfNut;
    mapping(uint256 => bool) public isButterActive;

    function numberOfButterJars(uint256 _nutId) public view returns (uint256) {
        return buttersOfNut[_nutId].length;
    }

    function churnButter(uint256 _nutId, uint256 _butterId, address _butterAddress, uint256 _butterToCreate) internal {
        butterJars += 1;
        butterWeight += _butterToCreate;
        buttersOfNut[_nutId].push(_butterId);
        butterChurnedByNut[_nutId] += _butterToCreate;
        butterLocations[_nutId] = _butterAddress;
        isButterActive[_nutId] = true;
        nutOfButter[_butterId] = _nutId;
    }

    function distributeButter(uint256 _butterId, uint256 _depletedBy, uint256 _balanceBefore) internal {
        butterWeight -= _depletedBy;
        butterSpread += _depletedBy;
        uint256 nutId = nutOfButter[_butterId];
        matterMintedByNut[nutId] += _depletedBy;

        // Maybe we use assert on these (research material)
        if (_balanceBefore - _depletedBy == 0) {
            isButterActive[_butterId] = false;
        }
    }

}
