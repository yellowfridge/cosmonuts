// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

interface ICosmoMatter {

    function totalMatter() external view returns (uint256);

    function matterOf(address _account) external view returns (uint256);

    function mintMatter(address _mintTo, uint256 _matterToMint) external returns (uint256);

    function transferMatter(address _to, uint256 _toTransfer) external;

    function transferMatterFrom(address _from, address _to, uint256 _toTransfer) external;

    function burnMatterFrom(address _from, uint256 _toBurn) external;

    function viewAllowances(address _owner, address _spender) external view returns (uint256);

    function grantApproval(address _owner, address _spender, uint256 _amount) external returns (bool);

}
