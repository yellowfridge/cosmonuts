// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/utils/math/Math.sol";
import "./CosmoMatter.sol";
import "./CosmoSeed.sol";
import "./CosmoButter.sol";

import "./SeedAccounts.sol";
import "./ButterAccounts.sol";

/**
 * @dev Manages the matter balance of the CosmoNuts collection and handles interaction with the
 * ERC20 Token to mint, burn, and allocate balances
 * Acts as storage for the ERC 721 tokens on their created Seed and Butter contracts.
 */
contract CosmoTreasury is SeedAccounts, ButterAccounts {

    /**
     * @dev Saved addresses include the contract which created the Treasury: UNIVERSE_ADDRESS, and
     * the address of the CosmoNuts contract (NFTs) which is created after the Treasury and then updated: matter_ADDRESS.
     */
    address public UNIVERSE_ADDRESS;
    address public COSMOS_ADDRESS = address(0);
    uint256 public NUT_PRICE;
    uint256 public MATTER_RATE;

    /**
     * @dev matterInUniverse is the Treasury's own account of the current ERC20 token supply available in Universe.
     * matterInTreasury is the balanceOf ERC20 tokens that are assigned to the Treasury address and controlled by this contract.
     * MATTER_RATE is the amount of matter it takes to create one NFT (used in calculating pricing) - set to 100
     */
    uint256 public matterInUniverse;
    uint256 public matterInTreasury = 0;

    mapping(uint256 => address) public currentOwnerOfNut; // Record of current nut owners by address
    mapping(uint256 => uint256) public matterBalanceOfNut; // Matter balance of each Nut recorded by the Treasury

    uint256[] public nutsPayeeList; // List of nuts to be provided a balance

    CosmoMatter matter;
    CosmoSeed seed;
    CosmoButter butter;

    /**
     *
     */
    constructor(address _universeAddress, uint256 _matterContributed, uint256 _matterRate) {
        UNIVERSE_ADDRESS = _universeAddress;
        matterInTreasury = _matterContributed;
        MATTER_RATE = _matterRate;
    }

    modifier onlyUniverse {
        require(address(msg.sender) == UNIVERSE_ADDRESS, "Caller is not designated Universe");
        _;
    }

    /**
     *
     */
    function calcSeedHoldPrice(uint256 _nutId) public view returns (uint256 ethToHold) {
        ethToHold = NUT_PRICE ^ (seedsGrownOfNut[_nutId] + 1);
        return ethToHold;
    }

    function calcSeedBurn(uint256 _nutId) public view returns (uint256 matterToBurn) {
        matterToBurn = MATTER_RATE ^ (seedsOfNut[_nutId] + 1);
        return matterToBurn;
    }

    function getSapplingLocation(uint256 _sapplingId) public view returns (address) {
        return seedLocations[_sapplingId];
    }

    function updateCosmosAddress(address _matterAddressNew) external onlyUniverse {
        COSMOS_ADDRESS = _matterAddressNew;
    }

    function updateNutPrice(uint256 _setNutPrice) external onlyUniverse {
        NUT_PRICE = _setNutPrice;
    }

    function calcNutOwnerMatter(uint256 _nutId) internal returns (uint256) {
        return getBalanceOf(currentOwnerOfNut[_nutId]);
    }

    function spawnSeed(uint256 _nutId, bytes32 _secretHash, uint256 _matterContributed) external payable {
        uint256 ethToHold = calcSeedHoldPrice(_nutId);
        require(msg.value >= ethToHold, "Ether value sent is not enough");
        uint256 matterToBurn = calcSeedBurn(_nutId);
        uint256 matterOfOwner = calcNutOwnerMatter(_nutId);
        require(matterOfOwner >= matterToBurn, "matter balance is not high enough");
        require(_matterContributed >= matterToBurn, "Not enough matter provided to initiate creation");

        seed = new CosmoSeed(
            COSMOS_ADDRESS, _nutId, seedsCreated, _secretHash, address(this), NUT_PRICE
        );
        integrateSeed(_nutId, seedsCreated, address(seed));

        uint256 excessMatter = _matterContributed - matterToBurn;

        matter = CosmoMatter(COSMOS_ADDRESS);
        matter.burn(matterToBurn);
        matter.transfer(address(seed), excessMatter);
        payable(address(seed)).transfer(msg.value);
    }

    function matterOf(address _caller) internal returns (uint256) {
        matter = CosmoMatter(COSMOS_ADDRESS);
        return matter.balanceOf(_caller);
    }

    function growSeedFromNut(uint256 _seedId, uint256 _matterNeeded) external {
        // Should be able to get matter needed from contract by itself
        require(matterOf(address(msg.sender)) >= _matterNeeded, "Not enough matter to spawn nut");

        // Don't think currentOwnerOfNut will work - will likely need to shift to CosmoNuts.balanceOf? maybe think
        address nutOwner = currentOwnerOfNut[seed.NUT_ID()];
        matter = CosmoMatter(COSMOS_ADDRESS);
        matter.transfer(nutOwner, _matterNeeded);
        matter.newMatter(address(this), 1);

        address seedAddress = seedLocations[_seedId];
        seed = CosmoSeed(seedAddress);
        seed.degradeSeed(nutOwner);

        matterInUniverse = matter.totalSupply();
        matterInTreasury = matter.balanceOf(address(this));

        growSeed(_seedId);

    }

    /**
     * Creating new butter means the creation of a contract where other users can withdraw matter from.
     * Need to contribute butter (which can only be done if you have a Nut with the desired level of matter to give away.
     * A secret message is provided in hash form and checked for verification to withdraw funds.
     */
    function newButter(uint256 _nutId, uint256 _matterContributed, uint256 _matterDrawRate, bytes32 _secretHash) external {
        address nutOwner = currentOwnerOfNut[_nutId];
        // Do we need to be doing these checks twice? Or really new check that caller is from contract (? or person who clicked?)
        require(nutOwner == address(msg.sender), "Caller is not the owner of the selected Nut");
        require(matterBalanceOfNut[_nutId] >= _matterContributed, "Nut does not have enough stated butter to contribute");
        matter = CosmoMatter(COSMOS_ADDRESS);
        require(_matterContributed <= matter.balanceOf(nutOwner), "Matter balance of owner is not high enough");
        require(_matterContributed % _matterDrawRate == 0, "Draw rate is not perfectly divisible by total amount");

        /**
         * A nut must have already grown a seed to start being counted as part of the deficiency list.
         */
        if (seedsGrownOfNut[_nutId] > 0) {
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
        matterInTreasury = matter.balanceOf(address(this));
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
                uint256 maxMatter = seedsGrownOfNut[nutPayeeId] * MATTER_RATE;
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
           matterInTreasury = matter.balanceOf(address(this));
        }

        butter = new CosmoButter(
            COSMOS_ADDRESS, address(this), _nutId, butterJars, _matterContributed, _matterDrawRate, _secretHash
        );
        matter.transfer(address(butter), _matterContributed);
        churnButter(_nutId, butterJars, address(butter), _matterContributed);

    }

    /**
     * Runs from CosmoButter contract when someone requests to draw matter.
     */
    function butterDrawn(address _drawer, uint256 _butterId, uint256 _balance, uint256 _currentBalance) external {
        matter = CosmoMatter(COSMOS_ADDRESS);
        matter.transfer(_drawer, _balance);
        matter.newMatter(address(this), _balance);
        distributeButter(_butterId, _balance, _currentBalance);

        matterInUniverse = matter.totalSupply();
        matterInTreasury = matter.balanceOf(address(this));
    }

    function assignMintBalance(address _tokenOwner, uint256 _tokenId) public {
        require(matterInTreasury >= MATTER_RATE, "Not enough matter remaining to assign");
        matter = CosmoMatter(COSMOS_ADDRESS);
        matter.transfer(_tokenOwner, MATTER_RATE);
        matterBalanceOfNut[_tokenId] = MATTER_RATE;
        matterInTreasury -= MATTER_RATE;
    }

    function getBalanceOf(address _tokenOwner) public returns (uint256) {
        matter = CosmoMatter(COSMOS_ADDRESS);
        return matter.balanceOf(_tokenOwner);
    }

}
