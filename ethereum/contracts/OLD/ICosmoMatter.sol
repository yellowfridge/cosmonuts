// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

interface ICosmoMatter {

    function mintMatter(address _mintTo, uint256 _matterToMint) external;
    function getBalanceOf(address _user) external view returns (uint256);
    function burnMatter(uint256 _toBurn) external;
    function transferMatter(address _to, uint256 _amount) external;

}
