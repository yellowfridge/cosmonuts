const privateKey = ""

//const Hash = require('ipfs-only-hash');
const EthCrypto = require('eth-crypto');

// inputHash: hey
// const input = "QmPSSaHUU7m2ScHWvFFXQsryyeCauoPnuiRZ3FdnCi6STj";
const input = "0";

//function add_0x(hex) {
//  return "0x" + hex;
//}

//function getBytes32FromIPFSHash(ipfsCID) {
//  const bs58 = require('bs58');
//  let hex = bs58.decode(ipfsCID).slice(2).toString('hex');
//  return add_0x(hex);
//}

function getSignature() {
  console.log("Will sign for the following input hash:");
  console.log(input);

  //const ipfsHash = await Hash.of(input);
  //console.log("IPFS Hash:", ipfsHash);
  const inputEthHash = EthCrypto.hash.keccak256(input);
  //const inputHash = getBytes32FromIPFSHash(ipfsHash);
  //inputHash = add_0x(input_hash);
  console.log("Eth Hash of Input: ", inputEthHash);

  console.log("-----SIGNATURE-----");

  const signature = EthCrypto.sign(
    privateKey,
    inputEthHash
  );
  console.log(signature);

  return signature;
}

getSignature();
