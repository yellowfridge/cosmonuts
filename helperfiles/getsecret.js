const secret = "password";

function getSecret() {
  console.log("Will create a hash for following secret:");
  console.log(secret);
  console.log("-----SECRET HASH-----")

  const EthCrypto = require('eth-crypto');
  const secretHash = EthCrypto.hash.keccak256(secret);

  console.log(secretHash);

  return secretHash;
}

getSecret();
