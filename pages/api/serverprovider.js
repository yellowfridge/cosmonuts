import HDWalletProvider from '@truffle/hdwallet-provider';

export default async function getServerProvider(req, res) {
  const privateKey = process.env.PRIVATE_KEY;

  const serverProvider = new HDWalletProvider(
    privateKey,
    "http://localhost:3000"
  );
  console.log("Server Provider", serverProvider);

  res.status(200).json({ provider: serverProvider });
}
