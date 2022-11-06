const input = "hey";

async function getCIDPath() {
  console.log("Will get the IPFS CID path for the below input:");
  console.log(input);
  console.log("-----CID PATH-----");

  const Hash = require('ipfs-only-hash');
  const cidPath = await Hash.of(input);

  console.log(cidPath);

  return cidPath;
}

getCIDPath();
