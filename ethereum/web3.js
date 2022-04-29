import detectEthereumProvider from '@metamask/detect-provider';
import Web3 from 'web3';

let web3;
let provider;




/*
(async () => {
  provider = await detectEthereumProvider();
})();

if (provider) { // provider === window.ethereum
  web3 = new Web3(provider);
} else {
  web3 = "blank"
}
*/

export default web3;
