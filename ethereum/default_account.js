import Web3 from "web3";
import HDWalletProvider from '@truffle/hdwallet-provider';

const mnemonic = "call glow acoustic vintage front ring trade assist shuffle mimic volume reject";
const provider = new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/1d5e3588363b4f5a91ca15573760408c");

const web3i = new Web3(provider);

const defaultAccount = (async () => {
  try {
    const accounts = await web3i.eth.getAccounts();
    console.log("Default Account: ", accounts[0]);
    return accounts[0]
  } catch (err) {
    console.log("Couldn't connect to Infura:", err);
  }
})();

export { web3i, defaultAccount }
