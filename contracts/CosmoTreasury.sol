// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "openzeppelin-solidity/contracts/utils/math/Math.sol";
import "./CosmoMatter.sol";
import "./CosmoSeed.sol";
import "./CosmoButter.sol";
import "./ICosmoTreasury.sol";

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
    }
    AddressOf public addressOf;

    struct Nut {
        uint256 price;
        uint256 rate;
    }
    Nut public nut;

    mapping(uint256 => address) public currentOwnerOfNut; // Record of current nut owners by address
    mapping(uint256 => uint256) public matterBalanceOfNut; // Matter balance of each Nut recorded by the Treasury

    uint256[] public nutsPayeeList; // List of nuts to be provided a balance

    /**
     *
     */
    constructor(address _systemAddress, address _matterAddress) {
        addressOf.system = _systemAddress;
        addressOf.matter = _matterAddress;
        addressOf.treasury = address(this);
    }

    /*
    modifier onlyUniverse {
        require(address(msg.sender) == UNIVERSE_ADDRESS, "Caller is not Universe");
        _;
    }
    */

    /*
    function updateCosmosAddress(address _matterAddressNew) external onlyUniverse {
        MATTER_ADDRESS = _matterAddressNew;
    }
    */

    //function updateNutPrice(uint256 _setNutPrice) external onlyUniverse {
    //    NUT_PRICE = _setNutPrice;
    //}

    function getPrice() public view virtual override returns (uint256) {
        return nut.price;
    }

    function matterNeeded(uint256 _nutId) public view virtual override returns (uint256) {
        return nut.rate ^ (numOfSeedsOf(_nutId));
    }

    function spawnSeed(uint256 _nutId, bytes32 _secretHash) external virtual override payable returns (bool) {
        uint256 ethToHold = nut.price ^ (numOfSeedsGrownOf(_nutId));
        require(msg.value >= ethToHold, "Ether value is not enough");

        CosmoMatter matter = CosmoMatter(addressOf.matter);
        uint256 matterToBurn = matterNeeded(_nutId);
        uint256 matterOfOwner = matter.balanceOf((currentOwnerOfNut[_nutId]));
        require(matterOfOwner >= matterToBurn, "Matter balance is not enough");

        CosmoSeed cosmoseed = new CosmoSeed(
            seedsCreated, _nutId, address(this), addressOf.cosmos, _secretHash
        );
        address seedLocation = address(cosmoseed);
        integrateSeed(_nutId, seedsCreated, seedLocation);

        matter.burn(matterToBurn);
        payable(seedLocation).transfer(msg.value);

        return true;
    }

    /**
     * Called from CosmoSeed contract.
     */
    function seedFromNut(uint256 _seedId, uint256 _matterNeeded) external virtual override returns (bool) {
        address seedAddress = seedLocations[_seedId];
        require(address(msg.sender) == seedAddress, "Caller is not the right CosmoSeed contract");
        //require(matter.balanceOf(address(msg.sender)) >= _matterNeeded, "Not enough matter");

        CosmoSeed seed = CosmoSeed(seedAddress);

        address nutOwner = currentOwnerOfNut[seed.nutId()];
        CosmoMatter matter = CosmoMatter(addressOf.matter);
        matter.transfer(nutOwner, _matterNeeded);
        matter.mintMatter(addressOf.treasury, 1);

        growSeed(_seedId);

        return true;
    }

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
    ) external virtual override returns (bool) {
        address nutOwner = currentOwnerOfNut[_nutId];
        // Do we need to be doing these checks twice? Or really new check that caller is from contract (? or person who clicked?)
        require(nutOwner == address(msg.sender), "Caller is not the owner");
        require(matterBalanceOfNut[_nutId] >= _matterContributed, "Not have enough matter");
        CosmoMatter matter = CosmoMatter(addressOf.matter);
        require(_matterContributed <= matter.balanceOf(nutOwner), "Not high enough");
        require(_matterContributed % _matterDrawRate == 0, "Draw rate not divisible");

        /**
         * A nut must have already grown a seed to start being counted as part of the deficiency list.
         */
        if (numOfSeedsGrownOf(_nutId) > 0) {
            butterDeficiencyInUniverse += _matterContributed;
            butterDeficiencyOfNut[_nutId] += _matterContributed;
            nutsPayeeList.push(_nutId);
        }

        /**
         * The Treasury wants to distribute its available balance to the nutsPayeeList.
         * It will distribute the minimum of either its available balance or the deficiency in the Universe.
         * All payees are awarded one matter and moved to the end of the list.
         * When their maximum available balance is reached, they are removed from the payee list.
         */
        uint256 matterInTreasury = matter.balanceOf(addressOf.treasury);
        if (matterInTreasury > 0) {
            uint256 toDistribute = Math.min(matterInTreasury, butterDeficiencyInUniverse);

            uint256 index = 0;
            for (uint j = 0; j != toDistribute; j++) {
                uint256 allPayees = nutsPayeeList.length;
                if (allPayees == 0) {
                    break;
                }

                if (j > allPayees) {
                    index = 0;
                }

                uint256 nutPayeeId = nutsPayeeList[index];
                address nutOwnerPayee = currentOwnerOfNut[nutPayeeId];
                uint256 maxMatter = numOfSeedsGrownOf(nutPayeeId) * nut.rate;
                if (matterBalanceOfNut[nutPayeeId] == maxMatter) {
                    delete nutsPayeeList[index];
                } else {
                    matter.transfer(nutOwnerPayee, 1);
                    nutsPayeeList.push(nutPayeeId);
                    delete nutsPayeeList[index];

                    butterDeficiencyInUniverse -= 1;
                    butterDeficiencyOfNut[nutPayeeId] -= 1;
                }

                index++;
           }
           matterInTreasury = matter.balanceOf(addressOf.treasury);
        }

        CosmoButter butter = new CosmoButter(
            butterJars, _nutId, _matterContributed, _matterDrawRate, addressOf.treasury, _secretHash
        );
        matter.transfer(address(butter), _matterContributed);
        churnButter(_nutId, butterJars, address(butter), _matterContributed);

        return true;

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
        CosmoMatter matter = CosmoMatter(addressOf.matter);
        matter.transfer(_drawer, _balance);
        matter.mintMatter(address(this), _balance);
        distributeButter(_butterId, _balance, _currentBalance);

        return true;
    }

    function assignMintBalance(address _tokenOwner, uint256 _tokenId) external virtual override returns (bool) {
        CosmoMatter matter = CosmoMatter(addressOf.matter);
        require(matter.balanceOf(addressOf.treasury) >= nut.rate, "Not enough matter");
        matter.transfer(_tokenOwner, nut.rate);
        matterBalanceOfNut[_tokenId] = nut.rate;

        return true;
    }

}
