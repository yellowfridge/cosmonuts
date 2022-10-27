// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/token/ERC20/extensions/ERC20Burnable.sol";

import "./ICosmoMatter.sol";

contract CosmoMatter is ERC20, ERC20Burnable, ICosmoMatter {

    constructor(string memory _name, string memory _symbol) ERC20(_name, _symbol) {}

    // Needs some restrictions
    function mintMatter(address _mintTo, uint256 _matterToMint) external virtual override returns (uint256) {
        _mint(_mintTo, _matterToMint);
        return totalSupply();
    }

    function transferMatter(address _to, uint256 _toTransfer) external virtual override {
        transfer(_to, _toTransfer);
    }

    function transferMatterFrom(address _from, address _to, uint256 _toTransfer) external virtual override {
        transferFrom(_from, _to, _toTransfer);
    }

    function burnMatterFrom(address _from, uint256 _toBurn) external virtual override {
        burnFrom(_from, _toBurn);
    }

    function totalMatter() public view virtual override returns (uint256) {
        return totalSupply();
    }

    function viewAllowances(address _owner, address _spender) public view virtual override returns (uint256) {
        return allowance(_owner, _spender);
    }

    function grantApproval(address _owner, address _spender, uint256 _amount) external virtual override returns (bool) {
        _approve(_owner, _spender, _amount);
        return true;
    }

    function matterOf(address _account) public view virtual override returns (uint256) {
        return balanceOf(_account);
    }

}
