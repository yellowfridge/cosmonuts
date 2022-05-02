import Web3 from 'web3';
import HDWalletProvider from '@truffle/hdwallet-provider';
import { getServerProvider } from '../components/helpers/apiRequests';

async function getWeb3(provider) {
  let web3;

  if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
    console.log("Browser is Detected and MetaMask is running");
    web3 = new Web3(window.ethereum);
  } else {
    console.log("Either on server or the user is not running Metamask");

    getServerProvider().then((provider) => {
      console.log("Server Provider-web3.js", provider);
      web3 = new Web3(provider);
    });

  }

return web3;
}



export default
