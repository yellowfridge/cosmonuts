// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "openzeppelin-solidity/contracts/access/Ownable.sol";
import { Clones } from "openzeppelin-solidity/contracts/proxy/Clones.sol";
import "./CosmoMatter.sol";
import "./CosmoBang.sol";

/**
 * CosmoUniverse is the top contract for the developer to create the planned system.
 * The creation of this contract creates an ERC20 coin called CosmoMatter.
 * The owner of this contract has the option to create a big bang starting the CosmoNuts universe.
 * Each universe is comprised of an NFT collection and a Treasury to manage funds of that NFT collection.
 */
 contract CosmoUniverse is Ownable {

    uint256 public COSMO_INDEX = 0;
    address public SYSTEM_ADDRESS;
    address public MATTER_ADDRESS;

    struct Bang {
        string name;
        uint256 matterCreated;
        address implementation;
        address cosmo;
    }
    Bang bang;
    mapping(uint256 => Bang) public bangs;

    CosmoMatter matter;

    constructor(
        address _systemAddress,
        string memory _matterName,
        string memory _matterSymbol
    )
    {
        SYSTEM_ADDRESS = _systemAddress;
        matter = new CosmoMatter(_matterName, _matterSymbol);
        MATTER_ADDRESS = address(matter);
    }

    function totalMatter() public view returns (uint256 totalMatterBalance) {
        totalMatterBalance = CosmoMatter(MATTER_ADDRESS).totalSupply();
        return totalMatterBalance;
    }

    function matterBalanceOf(address _address) public view returns (uint256 matterBalance) {
        matterBalance = CosmoMatter(MATTER_ADDRESS).balanceOf(_address);
        return matterBalance;
    }

    function changeCosmoIndex(uint256 _newCosmoIndex) public onlyOwner {
        require(COSMO_INDEX != _newCosmoIndex, "Same cosmo index");
        COSMO_INDEX = _newCosmoIndex;
    }

    function setImplementation(address _implementationAddress) public onlyOwner {
        bangs[COSMO_INDEX].implementation = _implementationAddress;
    }

    function bigBang(
        string memory _cosmosName,
        string memory _cosmosSymbol,
        uint256 _desiredEntities,
        uint256 _price,
        uint256 _rate,
        address _treasuryImplementation,
        address _seedImplementation,
        address _butterImplementation,
        address _vaultImplementation
    ) public onlyOwner returns (address cosmoAddress) {
        require(bangs[COSMO_INDEX].implementation != address(0), "No bang implementation on current Cosmo");
        CosmoBang cosmobang = CosmoBang(Clones.clone(bangs[COSMO_INDEX].implementation));
        address treasuryAddress = cosmobang.initialize(
            SYSTEM_ADDRESS,
            MATTER_ADDRESS,
            _treasuryImplementation,
            _seedImplementation,
            _butterImplementation,
            _price,
            _rate
        );

        bangs[COSMO_INDEX].matterCreated = (_rate * _desiredEntities) + 1;
        CosmoMatter(MATTER_ADDRESS).mintMatter(
            treasuryAddress,
            bangs[COSMO_INDEX].matterCreated
        );

        cosmoAddress = cosmobang.createCosmo(
            _cosmosName,
            _cosmosSymbol,
            _desiredEntities,
            treasuryAddress,
            _vaultImplementation
        );

        bangs[COSMO_INDEX].name = _cosmosName;
        bangs[COSMO_INDEX].cosmo = cosmoAddress;

        return cosmoAddress;
    }

}
