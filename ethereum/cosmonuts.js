import web3 from './web3';
import CosmoNuts from '../ethereum/build_manual/CosmoNuts_abi.json';

const cosmonuts = new web3.eth.Contract(
  CosmoNuts,
  '0x66023f6da39cbffd7ad4f287ad4f8b44e0725167'
);

export default cosmonuts;
