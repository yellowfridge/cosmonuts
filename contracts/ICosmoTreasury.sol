// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

interface ICosmoTreasury {

    function viewCosmos() external view returns (address);

    function burnMatterFrom(address _from, uint256 _toBurn) external returns (uint256 newMatterSupply);

    function matterOf(uint256 _nutId) external view returns (uint256 matterOfNutOwner);

    function linkCosmo(address _cosmoAddress) external;

    function getVaultLocation() external returns (address);

    function getPrice() external view returns (uint256);

    function ethToHold(uint256 _nutId) external view returns (uint256);

    function grantApproval(address _owner, address _spender, uint256 _allowance) external returns (bool);

    function matterNeeded(uint256 _nutId) external view returns (uint256);

    function spawnSeed(uint256 _nutId, bytes32 _secretHash) external returns (address seedLocation);
    //function spawnSeed(uint256 _nutId, bytes32 _seretHash) external returns (address payable seedLocation);

    function seedFromNut(uint256 _seedId, uint256 _matterNeeded) external returns (bool);

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
