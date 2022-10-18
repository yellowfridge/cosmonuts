// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "openzeppelin-solidity/contracts/access/Ownable.sol";
import { Clones } from "openzeppelin-solidity/contracts/proxy/Clones.sol";
import "./CosmoMatter.sol";
import "./CosmoBang.sol";
import "./ICosmoBang.sol";

/**
 * CosmoUniverse is the top contract for the developer to create the planned system.
 * The creation of this contract creates an ERC20 coin called CosmoMatter.
 * The owner of this contract has the option to create a big bang starting the CosmoNuts universe.
 * Each universe is comprised of an NFT collection and a Treasury to manage funds of that NFT collection.
 */
contract CosmoUniverse is Ownable {

    uint256 COSMOS_INDEX = 0;

    address public SYSTEM_ADDRESS;
    address public MATTER_ADDRESS;

    address implementationAddress;

    //mapping(uint256 => Cosmo) public cosmos;

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

    function bigBang(
        string memory _cosmosName,
        string memory _cosmosSymbol,
        uint256 _desiredEntities
    ) public onlyOwner returns (address) {
        CosmoBang bang = CosmoBang(Clones.clone(implementationAddress));
        bang.initialize(SYSTEM_ADDRESS, MATTER_ADDRESS);

        address cosmoAddress = ICosmoBang(address(bang)).createCosmo(
            _cosmosName,
            _cosmosSymbol,
            _desiredEntities
        );

        return cosmoAddress;
    }

}
