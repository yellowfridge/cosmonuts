import HDWalletProvider from '@truffle/hdwallet-provider';
import Web3 from 'web3';
import CosmoNuts from '../../ethereum/build_manual/CosmoNuts_abi.json';

export default async function getInitialNutData(req, res) {
  console.log("Get initial nut data");
  const privateKey = process.env.PRIVATE_KEY;
  const infuraKey = process.env.infura_mnemonic;

  const filler = req.body.filler;

  // Code to enable local connection (not working poll tracked - updating blocks?)
  //const serverProvider = new HDWalletProvider(
  //  privateKey,
  //  "http://localhost:3000"
  //);

  // Code to enable for infura connection
  //let serverProvider = new HDWalletProvider(
  //  infuraKey,
  //  "https://rinkeby.infura.io/v3/1d5e3588363b4f5a91ca15573760408c"
  //);

  //let web3 = new Web3(serverProvider);

  let web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/74359b5dcb78433cbf58438ae3625b64"))

  //let accounts = await web3.eth.getAccounts().then((accounts) => {
  //  return accounts;
  //});
  //console.log("Accounts", accounts);

  let cosmoNuts = new web3.eth.Contract(CosmoNuts, '0x66023f6da39cbffd7ad4f287ad4f8b44e0725167');
  //console.log("Cosmo Nuts", cosmoNuts);

  let isActive = await cosmoNuts.methods.saleIsActive().call();

  // Won't work because serverProvider is not valid - what do you need from here???
  res.status(200).json({
    isActive: isActive
  });

}
