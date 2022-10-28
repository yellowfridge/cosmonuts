// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "openzeppelin-solidity/contracts/utils/math/Math.sol";
import { Clones } from "openzeppelin-solidity/contracts/proxy/Clones.sol";

import "./CosmoMatter.sol";
import "./CosmoSeed.sol";
import "./CosmoButter.sol";
import "./ICosmoTreasury.sol";
import "./ICosmoNuts.sol";
import "./ICosmoSeed.sol";
import "./ICosmoMatter.sol";

import "./SeedAccounts.sol";
import "./ButterAccounts.sol";

/**
 * @dev Manages the matter balance of the CosmoNuts collection and handles interaction with the
 * ERC20 Token to mint, burn, and allocate balances
 * Acts as storage for the ERC 721 tokens on their created Seed and Butter contracts.
 */
contract CosmoTreasury is SeedAccounts, ButterAccounts, ICosmoTreasury {

     /**
      * @dev Saved addresses include the contract which created the Treasury: UNIVERSE_ADDRESS, and
      * the address of the CosmoNuts contract (NFTs) which is created after the Treasury and then updated: matter_ADDRESS.
      */
    struct AddressOf {
        address system;
        address matter;
        address treasury;
        address cosmos;
        address seedImplementation;
        address butterImplementation;
    }
    AddressOf public addressOf;

    struct Nut {
        uint256 price;
        uint256 rate;
    }
    Nut public nut;

    uint256 public paymentTicket;
    uint256[] public nutsPayeeList;

    function initialize(
        address _systemAddress,
        address _matterAddress,
        address _seedImplementation,
        address _butterImplementation,
        uint256 _price,
        uint256 _rate
    ) external {
        addressOf.system = _systemAddress;
        addressOf.matter = _matterAddress;
        addressOf.treasury = address(this);
        nut.price = _price;
        nut.rate = _rate;

        addressOf.seedImplementation = _seedImplementation;
        addressOf.butterImplementation = _butterImplementation;

        paymentTicket = 0;
    }

    /*
    modifier onlyUniverse {
        require(address(msg.sender) == UNIVERSE_ADDRESS, "Caller is not Universe");
        _;
    }
    */

    function viewCosmos() public view virtual override returns (address) {
        return addressOf.cosmos;
    }

    function matterOf(address _account) public view virtual override returns (uint256 matterOfOwner) {
        matterOfOwner = ICosmoMatter(addressOf.matter).matterOf(_account);
        return matterOfOwner;
    }

    function linkCosmo(address _cosmoAddress) external virtual override {
        addressOf.cosmos = _cosmoAddress;
    }

    function getVaultLocation() public virtual override returns (address) {
       return ICosmoNuts(addressOf.cosmos).vaultLocation();
    }

    function getSystem() public view virtual override returns (address) {
        return addressOf.system;
    }

    function getPrice() public view virtual override returns (uint256) {
        return nut.price;
    }

    function grantApproval(address _owner, address _spender, uint256 _allowance) external virtual override returns (bool) {
         ICosmoMatter(addressOf.matter).grantApproval(_owner, _spender, _allowance);
         return true;
    }

    function transferMatter(address _to, uint256 _toTransfer) public virtual override returns (bool) {
        ICosmoMatter(addressOf.matter).transferMatter(_to, _toTransfer);
        return true;
    }

    function transferMatterFrom(
        address _from,
        address _to,
        uint256 _toTransfer
    ) public virtual override returns (bool) {
        ICosmoMatter(addressOf.matter).transferMatterFrom(
            _from, _to, _toTransfer
        );
        return true;
    }

    function burnMatterFrom(
        address _from,
        uint256 _toBurn
    ) external virtual override returns (uint256 newMatterSupply) {
        ICosmoMatter(addressOf.matter).burnMatterFrom(_from, _toBurn);
        newMatterSupply = ICosmoMatter(addressOf.matter).totalMatter();
        return newMatterSupply;
    }

    function matterNeeded(uint256 _nutId) public view virtual override returns (uint256) {
        return nut.rate ^ (numOfSeedsOf(_nutId));
    }

    function ethToHold(uint256 _nutId) public view virtual override returns (uint256) {
        return nut.price ^ (numOfSeedsGrownOf(_nutId));
    }

    function growSeed(uint256 _seedId) external virtual override returns (bool) {
        uint256 nutId = nutOfSeed[_seedId];
        seedsGrownOfNut[nutId].push(_seedId);
        isSeedActive[nutId] = false;

        return true;
    }

    /**
     * Called from CosmoNuts contract.
     */
    function spawnSeed(uint256 _nutId, bytes32 _secretHash) external virtual override returns (address seedLocation) {
        CosmoSeed seed = CosmoSeed(payable(Clones.clone(addressOf.seedImplementation)));

        seed.initialize(
            seedsCreated,
            _nutId,
            addressOf.matter,
            address(this),
            addressOf.cosmos,
            _secretHash
        );
        seedLocation = address(seed);

        integrateSeed(_nutId, seedsCreated, seedLocation);

        return seedLocation;
    }

    // Consider converting to modifier below for checking calls made to this contract
    //address seedAddress = seedLocations[_seedId];
    //require(msg.sender == seedAddress, "Caller is not the right CosmoSeed contract");


    /**
     * Creating new butter means the creation of a contract where other users can withdraw matter from.
     * Need to contribute butter (which can only be done if you have a Nut with the desired level of matter to give away.
     * A secret message is provided in hash form and checked for verification to withdraw funds.
     */
    function newButter(
        uint256 _nutId,
        uint256 _matterContributed,
        uint256 _matterDrawRate,
        bytes32 _secretHash
    ) external virtual override returns (address butterLocation) {
        /**
         * The Treasury wants to distribute its available balance to the nutsPayeeList.
         * It will distribute the minimum of either its available balance or the deficiency in the Universe.
         * All payees are awarded one matter and moved to the end of the list.
         * When their maximum available balance is reached, they are removed from the payee list.
         */
        uint256 matterInTreasury = ICosmoMatter(addressOf.matter).matterOf(addressOf.treasury);
        if (matterInTreasury > 0) {
            uint256 toDistribute = Math.min(matterInTreasury, butterDeficiencyInUniverse);

            uint256 index = paymentTicket;
            for (uint j = 0; j != toDistribute; j++) {
                if (butterDeficiencyInUniverse == 0) break;

                uint256 nutPayeeId = nutsPayeeList[index];
                if (butterDeficiencyOfNut[nutPayeeId] == 0) {
                    delete nutsPayeeList[index];
                } else {
                    address nutOwnerPayee = ICosmoNuts(addressOf.cosmos).getOwnerOf(nutPayeeId);
                    ICosmoMatter(addressOf.matter).transferMatter(nutOwnerPayee, 1);

                    butterDeficiencyInUniverse -= 1;
                    butterDeficiencyOfNut[nutPayeeId] -= 1;

                    nutsPayeeList.push(nutPayeeId);
                    delete nutsPayeeList[index];
                }

                index++;
                paymentTicket++;
           }
        }

        CosmoButter butter = CosmoButter(Clones.clone(addressOf.butterImplementation));
        butter.initialize(
            butterJars, _nutId, _matterContributed, _matterDrawRate, addressOf.treasury, _secretHash
        );
        butterLocation = address(butter);

        address nutIdOwner = ICosmoNuts(addressOf.cosmos).getOwnerOf(_nutId);
        ICosmoMatter(addressOf.matter).transferMatterFrom(nutIdOwner, butterLocation, _matterContributed);

        nutsPayeeList.push(_nutId);

        ICosmoMatter(addressOf.matter).mintMatter(address(this), _matterContributed);

        churnButter(_nutId, butterJars, address(butter), _matterContributed);

        return butterLocation;
    }

    /**
     * Runs from CosmoButter contract when someone requests to draw matter.
     */
    function butterDrawn(
        address _drawer,
        uint256 _butterId,
        uint256 _balance,
        uint256 _currentBalance
    ) external virtual override returns (bool) {
        ICosmoMatter(addressOf.matter).transferMatter(_drawer, _balance);
        distributeButter(_butterId, _balance, _currentBalance);
        return true;
    }

    function assignMintBalance(address _nutOwner) external virtual override returns (bool) {
        uint256 matterOfTreasury = ICosmoMatter(addressOf.matter).matterOf(address(this));
        require(matterOfTreasury >= nut.rate, "Nut enough matter in Treasury to mint");

        ICosmoMatter(addressOf.matter).transferMatter(_nutOwner, nut.rate);
        return true;
    }

}
