// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

interface ICosmoVault {

    function changeTokenURI(
        uint256 _tokenId,
        string memory _cidPath,
        bytes memory _signature
    ) external;

}
