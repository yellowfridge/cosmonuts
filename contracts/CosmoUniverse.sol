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
        uint256 id;
        bool status;
        string name;
        string symbol;
        address location;
        address vaultLocation;
    }
    Cosmo cosmo;
    Cosmo[] public cosmos;

    CosmoMatter matter;
    CosmoBang bang;

    constructor(
        address _systemAddress,
        string memory _matterName,
        string memory _matterSymbol
    )
    {
        SYSTEM_ADDRESS = _systemAddress;
        matter = new CosmoMatter(_matterName, _matterSymbol);
        MATTER_ADDRESS = address(matter);
        bang = new CosmoBang(
            SYSTEM_ADDRESS,
            MATTER_ADDRESS
        );
    }

    /**
     * The function starts the CosmoNuts universe.
     * The amount of matter created is dependent on the desired number of NFT tokens needed and their rate.
     * Total matter created is ultimately equal to number of NFT tokens times the selected rate.
     */
    function bigBang(
        string memory _cosmosName,
        string memory _cosmosSymbol,
        uint256 _nutPrice,
        uint256 _nutRate,
        uint256 _desiredEntities
    ) public onlyOwner {
        address[] memory cosmoAddresses = bang.nutBang(
            _cosmosName,
            _cosmosSymbol,
            _nutPrice,
            _nutRate,
            _desiredEntities
        );

        cosmo.id = cosmos.length;
        cosmo.status = true;
        cosmo.name = _cosmosName;
        cosmo.symbol = _cosmosSymbol;
        cosmo.location = cosmoAddresses[0];
        cosmo.vaultLocation = cosmoAddresses[1];

        cosmos.push(cosmo);
    }

}
