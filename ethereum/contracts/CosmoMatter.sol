// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract CosmoMatter is ERC20, ERC20Burnable {

    string public MATTER_NAME;
    string public MATTER_SYMBOL;
    uint256 public MATTER_CREATED = 0;
    uint256 public MATTER_NEEDED = 100;
    address public TREASURY_ADDRESS;

    constructor(string memory _name, string memory _symbol) ERC20(_name, _symbol) {
        MATTER_NAME = _name;
        MATTER_SYMBOL = _symbol;
    }

    function createMatter(uint256 _initialMatter, address _treasuryAddress) internal returns(address) {
        require(_initialMatter % MATTER_NEEDED == 0, "Matter created is not perfectly divisable by matter needed.");
        _mint(_treasuryAddress, _initialMatter);
        MATTER_CREATED = _initialMatter;
        TREASURY_ADDRESS = _treasuryAddress;
        return address(this);
    }

    function newMatter(address _treasuryAddress, uint256 _matterToCreate) external {
        _mint(_treasuryAddress, _matterToCreate);
    }

}
