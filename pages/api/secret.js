export default async function getSecret(req, res) {
  const buffer = require('buffer');
  const EthCrypto = require('eth-crypto');

  const imgHash = req.body.imgHash;
  const privateKey = process.env.PRIVATE_KEY;

  console.log("Image Hash:", imgHash);

  //const ethHash = EthCrypto.hash.keccak256(imgHash);
  //console.log("Eth Hash", ethHash);

  const signature = EthCrypto.sign(
    privateKey,
    imgHash
  );
  console.log("Signature", signature);

  res.status(200).json({ signedImage: signature });
}
