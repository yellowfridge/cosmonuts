export default async function getVerification(req, res) {
  const EthCrypto = require('eth-crypto');

  const imgHash = req.body.imgHash;
  const signature = req.body.signedHash;
  const account = process.env.ACCOUNT;
  const publicKey = process.env.PUBLIC_KEY;

  const signerAccount = EthCrypto.recover(
    signature,
    imgHash
    //EthCrypto.hash.keccak256(imgHash)
  );
  console.log("Signer Account: ", signerAccount);

  const signerPublicKey = EthCrypto.recoverPublicKey(
    signature,
    imgHash
    //EthCrypto.hash.keccak256(imgHash)
  );
  console.log("Signer Public Key", signerPublicKey);

  function verify(account, hash, signature) {
    if (signerAccount == account) {
      if (signerPublicKey == publicKey) {
        console.log("Data is verified.")
        return true
      } else {
        console.log("Account is correct but public key is not.")
        return false
      }
    } else {
      console.log("Not signed by this account.")
      return false
    }
  }
  const verification = verify(account, imgHash, signature);

  res.status(200).json({ verification: verification });
}
