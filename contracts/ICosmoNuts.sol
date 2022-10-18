// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

interface ICosmoNuts {

    function createNut(
        string memory _cidPath,
        bytes memory _signature
    ) external returns (bool);

    function getOwnerOf(uint256 _nutId) external view returns (address);

    function setTokenURI(uint256 _nutId, string memory _nutCID) external;

    function createVault() external returns (address);

    function vaultLocation() external returns (address);

}
