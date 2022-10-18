// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract CosmoMatter is ERC20, ERC20Burnable {

    constructor(string memory _name, string memory _symbol) ERC20(_name, _symbol) {}

    // Needs some restrictions
    function mintMatter(address _mintTo, uint256 _matterToMint) external {
        _mint(_mintTo, _matterToMint);
    }

}
