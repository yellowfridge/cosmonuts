import { create } from 'ipfs-http-client';

export default async function publishToIPNS() {
  console.log("Publishing to IPNS ...");
  const ipfsPrivateKey = process.env.IPFS_PRIVATE_KEY;

  const ipfs = await create({
    privateKey: ipfsPrivateKey
  });

  console.log("IPFS", ipfs);
}
