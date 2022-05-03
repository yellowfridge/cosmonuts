import HDWalletProvider from '@truffle/hdwallet-provider';

export default async function getServerProvider(req, res) {
  const privateKey = process.env.PRIVATE_KEY;
  const infuraKey = process.env.infura_mnemonic;

  //const serverProvider = new HDWalletProvider(
  //  privateKey,
  //  "http://localhost:3000"
  //);

  // Code to enable for infura connection
  let serverProvider = new HDWalletProvider({
    mnemonic: { phrase: infuraKey },
    providerOrUrl: "https://rinkeby.infura.io/v3/1d5e3588363b4f5a91ca15573760408c"
  });
  console.log("Server Provider", serverProvider);

  // Won't work because serverProvider is not valid - what do you need from here???
  res.status(200).json({ provider: serverProvider });
}
