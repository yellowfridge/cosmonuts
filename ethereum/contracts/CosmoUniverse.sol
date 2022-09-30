// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/access/Ownable.sol";

import "./CosmoMatter.sol";
import "./CosmoBang.sol";
import "./CosmoTreasury.sol";

contract CosmoUniverse is CosmoMatter, CosmoBang, Ownable {

    address private SYSTEM_ADDRESS;

    CosmoTreasury treasury;

    constructor(
        string memory _cosmosName,
        string memory _cosmosSymbol,
        address _systemAddress,
        string memory _matterName,
        string memory _matterSymbol
        )
        CosmoMatter(_matterName, _matterSymbol)
        CosmoBang(_cosmosName, _cosmosSymbol)
    {
            SYSTEM_ADDRESS = _systemAddress;
    }

    function createTreasury(address _universeAddress, uint256 _matterNeeded) public onlyOwner {
        treasury = new CosmoTreasury(_universeAddress, _matterNeeded, MATTER_NEEDED);
        TREASURY_ADDRESS = address(treasury);
    }

    function setNutPrice(uint256 _desiredPrice) public onlyOwner {
        require(TREASURY_ADDRESS != address(0), "No treasury created to set nut price");
        treasury.updateNutPrice(_desiredPrice);
    }

    function bigBang(uint256 _initialMatter) public onlyOwner {
        require(TREASURY_ADDRESS != address(0), "No treasury created to deposit matter");
        cosmosAddress = createMatter(_initialMatter, TREASURY_ADDRESS);
        treasury = CosmoTreasury(TREASURY_ADDRESS);
        treasury.updateCosmosAddress(cosmosAddress);
        uint256 nutPrice = treasury.NUT_PRICE();

        uint256 initialSupply = _initialMatter / MATTER_NEEDED;
        nutBang(initialSupply, SYSTEM_ADDRESS, address(this), nutPrice);
    }

}
