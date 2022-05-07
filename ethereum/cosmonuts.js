import web3 from './web3';
import CosmoNuts from '../ethereum/build_manual/CosmoNuts_abi.json';

const cosmonuts = new web3.eth.Contract(
  CosmoNuts,
  process.env.COSMONUTS_ADDRESS
);

export default cosmonuts;
