import HDWalletProvider from '@truffle/hdwallet-provider';
import Web3 from 'web3';
import CosmoNuts from '../../ethereum/build_manual/CosmoNuts_abi.json';

export default async function getInitialNutData(req, res) {
  console.log("Get initial nut data");
  const privateKey = process.env.PRIVATE_KEY;
  const infuraKey = process.env.infura_mnemonic;

  // Code to enable local connection (not working poll tracked - updating blocks?)
  // Probably needs an active node connected to ETH on local server
  //const serverProvider = new HDWalletProvider(
  //  privateKey,
  //  "http://localhost:3000"
  //);

  let web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/74359b5dcb78433cbf58438ae3625b64"))

  //let accounts = await web3.eth.getAccounts().then((accounts) => {
  //  return accounts;
  //});
  //console.log("Accounts", accounts);

  // Initiate the cosmo nuts contract so calls can be made to it
  let cosmoNuts = new web3.eth.Contract(CosmoNuts, '0x66023f6da39cbffd7ad4f287ad4f8b44e0725167');
  //console.log("Cosmo Nuts", cosmoNuts);

  // Grab all the relevant info from the smart contract
  let isActive = await cosmoNuts.methods.saleIsActive().call();
  let maxNuts = await cosmoNuts.methods.MAX_NUTS().call();
  let nutPrice = await cosmoNuts.methods.nutPrice().call();
  let maxNutPurchase = await cosmoNuts.methods.maxNutPurchase().call();
  let revealTimeStamp = await cosmoNuts.methods.REVEAL_TIMESTAMP().call();
  let totalSupply = await cosmoNuts.methods.totalSupply().call();
  //let cosmosCID = await cosmoNuts.methods.COSMOS_METADATA().call(); // Not yet put on new contract

  // Won't work because serverProvider is not valid - what do you need from here???
  res.status(200).json({
    isActive: isActive,
    totalSupply: totalSupply,
    maxNuts: maxNuts,
    nutPrice: nutPrice,
    maxNutPurchase: maxNutPurchase,
    revealTimeStamp: revealTimeStamp
    //cosmosCID: cosmosCID
  });

}
