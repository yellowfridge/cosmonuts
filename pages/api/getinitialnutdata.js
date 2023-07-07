import HDWalletProvider from '@truffle/hdwallet-provider';
import Web3 from 'web3';
import CosmoNuts from '../../ethereum/build_manual/CosmoNuts_abi.json';

export default async function getInitialNutData(req, res) {
  const privateKey = process.env.PRIVATE_KEY;
  const infuraKey = process.env.INFURA_MNEMONIC;
  // BELOW NEEDS TO BE DYNAMIC - EVERYWHERE
  const contractAddress = '0xF9A938eE9F7ee1EF8457c3c6e4CDf94A00afa58e';
  const infuraID = "https://goerli.infura.io/v3/7062ef4505da4e3d9e333b9ed6a07c6d";

  let web3 = new Web3(new Web3.providers.HttpProvider(infuraID));

  // Initiate the cosmo nuts contract so calls can be made to it
  let cosmoNuts = new web3.eth.Contract(CosmoNuts, contractAddress);

  // Grab all the relevant info from the smart contract
  let totalSupply = await cosmoNuts.methods.totalSupply().call();

  res.status(200).json({
    totalSupply: totalSupply,
  });

}
