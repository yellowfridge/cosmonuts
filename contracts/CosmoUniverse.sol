// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "openzeppelin-solidity/contracts/access/Ownable.sol";
import "./CosmoMatter.sol";
//import "./CosmoBang.sol";
import "./CosmoSystems.sol";

/**
 * CosmoUniverse is the top contract for the developer to create the planned system.
 *
 */
 // *** HERE ** DECIDED TO REMOVE CosmoSystems (make it an outside contract to build and then just return needed addresses)
contract CosmoUniverse is CosmoSystems, Ownable {

    CosmoMatter matter;

    constructor(
        address _systemAddress
    ) CosmoSystems(_systemAddress)
    {
        SYSTEM_ADDRESS = _systemAddress;
        //matter = new CosmoMatter(_matterName, _matterSymbol);
        //MATTER_ADDRESS = address(matter);
        //bang = new CosmoBang(
        //    SYSTEM_ADDRESS,
        //    MATTER_ADDRESS
        //);
        //bangAddress = address(bang);
    }

    //function deployCosmo(string memory _cosmoName, string memory _cosmoSymbol) public {
        //cosmos[cosmosIndex].name = _matterName;
        //cosmos[cosmosIndex].symbol = _matterSymbol;
        //CosmoBuilding cosmobuild = new CosmoBuilding(_cosmoName, _cosmoSymbol);
        //buildLocation = address(cosmobuild);
    //}

    function deployCosmo(
        uint256 _id,
        uint256 _price,
        uint256 _rate,
        uint256 _amount,
        string memory _name,
        string memory _symbol
    ) public {
        cosmos[COSMOS_INDEX].id = _id;
        cosmos[COSMOS_INDEX].price = _price;
        cosmos[COSMOS_INDEX].rate =  _rate;
        cosmos[COSMOS_INDEX].amount = _amount;
        cosmos[COSMOS_INDEX].name = _name;
        cosmos[COSMOS_INDEX].symbol = _symbol;

        createVault();
    }

    function makeMatter(string memory _matterName, string memory _matterSymbol) public {
        matter = new CosmoMatter(_matterName, _matterSymbol);
        MATTER_ADDRESS = address(matter);
    }

    function bigBang() public {
        // seperate out mattertocreate later as a function that can be viewed before bigBang;
        uint256 matterToCreate = cosmos[COSMOS_INDEX].rate * cosmos[COSMOS_INDEX].amount;
        matter = CosmoMatter(MATTER_ADDRESS);
        matter.mintMatter(cosmos[COSMOS_INDEX].vaultLocation, matterToCreate);
        createCosmo();
    }

    /**
     * The function starts the CosmoNuts universe.
     * The amount of matter created is dependent on the desired number of NFT tokens needed and their rate.
     * Total matter created is ultimately equal to number of NFT tokens times the selected rate.
     */
     /*
    function bigBang(
        string memory _cosmosName,
        string memory _cosmosSymbol,
        uint256 _nutPrice,
        uint256 _nutRate,
        uint256 _desiredEntities
    ) public onlyOwner {
        //CosmoBang bang = CosmoBang(bangAddress);
        uint256 matterToCreate = _nutRate * _desiredEntities;
        matter.mintMatter(address(this), matterToCreate);
        address[] memory cosmoAddresses = bang.nutBang(
            _cosmosName,
            _cosmosSymbol,
            _nutPrice,
            _nutRate,
            _desiredEntities
        );

        cosmo.id = COSMOS_INDEX;
        cosmo.status = true;
        cosmo.name = _cosmosName;
        cosmo.symbol = _cosmosSymbol;
        cosmo.location = cosmoAddresses[0];
        cosmo.vaultLocation = cosmoAddresses[1];

        cosmos[COSMOS_INDEX] = cosmo;
    }
    */

}
