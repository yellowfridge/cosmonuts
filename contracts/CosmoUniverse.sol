// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "openzeppelin-solidity/contracts/access/Ownable.sol";
import { Clones } from "openzeppelin-solidity/contracts/proxy/Clones.sol";
import "./CosmoMatter.sol";
import "./CosmoBang.sol";
import "./ICosmoMatter.sol";

/**
 * @title CosmoUniverse - Cosmos containing ERC721 NFT Collections
 * @author yellowfridge
 * @notice Main contract which ties all other contracts together.  Start here.
 * @dev The creation of this contract creates an ERC20 coin.  CosmoMatter.
 * @dev The owner of this contract has the option to create a big bang starting a new cosmo.
 * @dev Each cosmo is comprised of an NFT collection, a Treasury to manage funds of that NFT collection,
 * and a Vault to insure security.
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

    /**
     * @notice Beginning of a Universe requires three inputs.
     * @param _systemAddress is the wallet address of the application designed to manage front-end access.
     * @param _matterName will serve as the input for the ERC20 name in the creation of a coin.
     * @param _matterSymbol will serve as the input for the ERC20 symbol in the creation of a coin.
     * @dev Name and symbol are the only two inputs required to create a ERC20 compliant coin.
     * @dev There are no coins in circulation at the absolute beginning.
     */
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
        totalMatterBalance = ICosmoMatter(MATTER_ADDRESS).totalMatter();
        return totalMatterBalance;
    }

    function matterBalanceOf(address _address) public view returns (uint256 matterBalance) {
        matterBalance = ICosmoMatter(MATTER_ADDRESS).matterOf(_address);
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
