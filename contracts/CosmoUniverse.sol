// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "openzeppelin-solidity/contracts/access/Ownable.sol";
import { Clones } from "openzeppelin-solidity/contracts/proxy/Clones.sol";
import "./CosmoMatter.sol";
import "./CosmoBang.sol";
//import "./CosmoBuilder.sol";
//import "./CosmoVault.sol";
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
    //address private BUILDER_ADDRESS;

    address implementationAddress;

    /*
    struct Cosmo {
        bool status;
        uint256 id;
        uint256 price;
        uint256 rate;
        uint256 amount;
        string name;
        string symbol;
        address location;
        address vaultLocation;
    }
    Cosmo cosmo;
    mapping(uint256 => Cosmo) public cosmos;
    */

    CosmoMatter matter;
    //CosmoBuilder builder;
    //CosmoBang bang;

    constructor(
        address _systemAddress,
        string memory _matterName,
        string memory _matterSymbol
    )
    {
        SYSTEM_ADDRESS = _systemAddress;
        matter = new CosmoMatter(_matterName, _matterSymbol);
        MATTER_ADDRESS = address(matter);

        //builder = new CosmoBuilder(_systemAddress);
        //BUILDER_ADDRESS = address(builder);
        //bang = new CosmoBang(_systemAddress, _matterAddress);
    }

    function bigBang(
        string memory _cosmosName,
        string memory _cosmosSymbol,
        uint256 _desiredEntities
        //address _vaultAddress
    ) public onlyOwner returns (address) {
        /*
        CosmoBang bang = new CosmoBang(
            _cosmosName,
            _cosmosSymbol,
            _desiredEntities,
            SYSTEM_ADDRESS,
            MATTER_ADDRESS
        );
        */
        //CosmoBang bang = new CosmoBang(SYSTEM_ADDRESS, MATTER_ADDRESS);
        CosmoBang bang = CosmoBang(Clones.clone(implementationAddress));
        bang.initialize(SYSTEM_ADDRESS, MATTER_ADDRESS);

        address cosmoAddress = ICosmoBang(address(bang)).createCosmo(
            _cosmosName,
            _cosmosSymbol,
            _desiredEntities
        );

        return cosmoAddress;
        //return ICosmoBang(address(bang)).createCosmo();
        //return ICosmoBang(address(bang)).COSMO_ADDRESS();
        //return CosmoBang(address(bang)).COSMO_ADDRESS();

    }

    /*
    function buildASystem(
        uint256 _id,
        uint256 _price,
        uint256 _rate,
        uint256 _amount,
        string memory _name,
        string memory _symbol
    ) public {
        //CosmoSystems builder = new CosmoSystems(
        //    _id, _price, _rate, _amount, _name, _symbol
        //);
        //CosmoSystems builder = new CosmoSystems(SYSTEM_ADDRESS);
        //BUILDER_ADDRESS = address(builder);

        //cosmos[COSMOS_INDEX].id = _id;
        //cosmos[COSMOS_INDEX].price = _price;
        //cosmos[COSMOS_INDEX].rate =  _rate;
        //cosmos[COSMOS_INDEX].amount = _amount;
        //cosmos[COSMOS_INDEX].name = _name;
        //cosmos[COSMOS_INDEX].symbol = _symbol;

        //cosmos[COSMOS_INDEX].vaultLocation = builder.createVault(MATTER_ADDRESS);

        builder.insertSystemInfo(
            _id, _price, _rate, _amount, _name, _symbol
        );
    }
    */

    /*
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
    */

    /*
    function makeMatter(string memory _matterName, string memory _matterSymbol) public {
        matter = new CosmoMatter(_matterName, _matterSymbol);
        MATTER_ADDRESS = address(matter);
    }
    */

    /*
    function bigBang() public {
        // seperate out mattertocreate later as a function that can be viewed before bigBang;
        //uint256 matterToCreate = cosmos[COSMOS_INDEX].rate * cosmos[COSMOS_INDEX].amount;
        //matter = CosmoMatter(MATTER_ADDRESS);
        //matter.mintMatter(cosmos[COSMOS_INDEX].vaultLocation, matterToCreate);
        //CosmoSystems builder = CosmoSystems(BUILDER_ADDRESS);
        builder.createCosmo(
            //cosmo.name,
            //cosmo.symbol,
            //cosmo.amount,
            //cosmos[COSMOS_INDEX].name,
            //cosmos[COSMOS_INDEX].symbol,
            //cosmos[COSMOS_INDEX].amount,
            MATTER_ADDRESS
        );
    }
    */

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
