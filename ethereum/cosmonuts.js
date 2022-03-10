import Web3 from "web3";
import HDWalletProvider from '@truffle/hdwallet-provider';

const mnemonic = "call glow acoustic vintage front ring trade assist shuffle mimic volume reject";
const provider = new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/1d5e3588363b4f5a91ca15573760408c");

const web3 = new Web3(provider);

const instance = new web3.eth.Contract(
  JSON.parse(CosmoNuts.interface),
  'NEED CONTRACT ADDRESS HERE 0x...'
);

export default instance;
