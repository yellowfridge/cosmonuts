// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract CosmoMatter is ERC20, ERC20Burnable {

    string public MATTER_NAME;
    string public MATTER_SYMBOL;

    constructor(string memory _name, string memory _symbol) ERC20(_name, _symbol) {
        MATTER_NAME = _name;
        MATTER_SYMBOL = _symbol;
    }

    function mintMatter(address _mintTo, uint256 _matterToMint) external {
        _mint(_mintTo, _matterToMint);
    }

}
