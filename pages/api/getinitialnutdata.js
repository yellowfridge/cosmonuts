import HDWalletProvider from '@truffle/hdwallet-provider';
import Web3 from 'web3';
import CosmoNuts from '../../ethereum/build_manual/CosmoNuts_abi.json';

export default async function getInitialNutData(req, res) {
  const privateKey = process.env.PRIVATE_KEY;
  const infuraKey = process.env.INFURA_MNEMONIC;
  // BELOW NEEDS TO BE DYNAMIC - EVERYWHERE
  const contractAddress = '0xb97C6312F412b58cCfac2c0E63609df0c2599CAa';

  const infuraID = "https://ropsten.infura.io/v3/74359b5dcb78433cbf58438ae3625b64"

  let web3 = new Web3(new Web3.providers.HttpProvider(infuraID));

  // Initiate the cosmo nuts contract so calls can be made to it
  let cosmoNuts = new web3.eth.Contract(CosmoNuts, contractAddress);

  // Grab all the relevant info from the smart contract
  let isActive = await cosmoNuts.methods.saleIsActive().call();
  let maxNuts = await cosmoNuts.methods.MAX_NUTS().call();
  let nutPrice = await cosmoNuts.methods.nutPrice().call();
  let maxNutPurchase = await cosmoNuts.methods.maxNutPurchase().call();
  let revealTimeStamp = await cosmoNuts.methods.REVEAL_TIMESTAMP().call();
  let totalSupply = await cosmoNuts.methods.totalSupply().call();
  //let cosmoCID = await cosmoNuts.methods.COSMOS_METADATA().call();

  res.status(200).json({
    isActive: isActive,
    totalSupply: totalSupply,
    maxNuts: maxNuts,
    nutPrice: nutPrice,
    maxNutPurchase: maxNutPurchase,
    revealTimeStamp: revealTimeStamp,
    //cosmoCID: cosmoCID
  });

}
