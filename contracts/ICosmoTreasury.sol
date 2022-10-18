// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

interface ICosmoTreasury {

    function getPrice() external view returns (uint256);
    function matterNeeded(uint256 _nutId) external view returns (uint256);
    function spawnSeed(uint256 _nutId, bytes32 _seretHash) external payable returns (bool);
    function seedFromNut(uint256 _seedId, uint256 _matterNeeded)  external returns (bool);
    function newButter(
        uint256 _nutId,
        uint256 _matterContributed,
        uint256 _matterDrawRate,
        bytes32 _secretHash
    ) external returns (bool);
    function butterDrawn(
        address _drawer,
        uint256 _butterId,
        uint256 _balance,
        uint256 _currentBalance
    ) external returns (bool);
    function assignMintBalance(address _tokenOwner, uint256 _tokenId) external returns (bool);

}
