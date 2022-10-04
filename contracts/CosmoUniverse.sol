// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "openzeppelin-solidity/contracts/access/Ownable.sol";
import "./CosmoMatter.sol";
import "./CosmoBang.sol";

/**
 * CosmoUniverse is the top contract for the developer to create the planned system.
 *
 */
 contract CosmoUniverse is Ownable {

    address public SYSTEM_ADDRESS;
    address public MATTER_ADDRESS;

    struct Cosmo {
        uint256 cosmoId;
        bool status;
        string name;
        string symbol;
        address cosmo_location;
        address treasury_location;
    }
    Cosmo cosmo;
    Cosmo[] cosmos;

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
        uint256 _desiredEntities,
        uint256 _matterRate
    ) public onlyOwner {
        uint256 matterToCreate = _desiredEntities * _matterRate;
        matter.mintMatter(address(this), matterToCreate);
        CosmoBang bang = new CosmoBang(SYSTEM_ADDRESS, MATTER_ADDRESS, _cosmosName, _cosmosSymbol, _desiredEntities,  _matterRate);

        uint256 cosmosIndex = cosmos.length;
        cosmo = Cosmo(cosmosIndex, true, _cosmosName, _cosmosSymbol, bang.COSMO_ADDRESS(), bang.TREASURY_ADDRESS());
        cosmos.push(cosmo);
    }

}
