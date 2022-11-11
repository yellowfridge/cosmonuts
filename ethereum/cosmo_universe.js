import Web3 from 'web3';
import CosmoUniverse from '../ethereum/build_manual/CosmoUniverse_abi.json';

const universeAddress = '0x78d61C45d0A7BE65C42F2D56d8745122d5e66261';
const web3 = new Web3(window.ethereum);
const universe = new web3.eth.Contract(CosmoUniverse, universeAddress);

export default universe;
