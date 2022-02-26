import Web3 from "web3";
import HDWalletProvider from '@truffle/hdwallet-provider';

/*
import detectEthereumProvider from '@metamask/detect-provider';
(async () => {
  try {
    const provider = await detectEthereumProvider();
    console.log("Provider: ", provider);
  } catch (err) {
    console.log("Could not find provider: ", err);
  }
})();
*/

/*
let web3;
if (typeof window != "undefined" && typeof window.web3 !== "undefined") {
  // We are in the browser and metamask is running
  web3 = new Web3(window.web3.currentProvider);
  console.log("Using Metamask");
} else {
  // We are on the server OR the user is not running metamask
  const provider = new Web3.providers.HttpProvider(
    "https://rinkeby.infura.io/v3/1d5e3588363b4f5a91ca15573760408c"
  );
  web3 = new Web3(provider);
  console.log("Using Infura");
}
*/
const mnemonic = "call glow acoustic vintage front ring trade assist shuffle mimic volume reject";
const provider = new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/1d5e3588363b4f5a91ca15573760408c");


// Default connection is to infura
//const provider = new Web3.providers.HttpProvider(
//  "https://rinkeby.infura.io/v3/1d5e3588363b4f5a91ca15573760408c"
//);
const web3 = new Web3(provider);

const defaultAccount = (async () => {
  try {
    const accounts = await web3.eth.getAccounts();
    console.log("Default Account: ", accounts[0]);
    return accounts[0]
  } catch (err) {
    console.log("Couldn't connect to Infura:", err);
  }
})();

//console.log(web3);

export {web3, defaultAccount}
