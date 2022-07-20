export default async function getSecret(req, res) {
  const buffer = require('buffer');
  const EthCrypto = require('eth-crypto');

  const imgHash = req.body.imgHash;
  const privateKey = process.env.PRIVATE_KEY;
  const privateKeyEC = process.env.PRIVATE_KEY_EC;

  console.log("Image Hash:", imgHash);

  // This was in old code - but is it needed??
  // Tried blocking out but did not work-
  // -- likely related to code in solidity contract not matching
  // -- needs review
  const ethHash = EthCrypto.hash.keccak256(imgHash);
  console.log("Eth Hash", ethHash);

  const signature = EthCrypto.sign(
    privateKey,
    ethHash
  );
  console.log("Signature", signature);

  res.status(200).json({ signedImage: signature });
}
