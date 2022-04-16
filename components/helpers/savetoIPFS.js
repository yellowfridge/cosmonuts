import * as IPFS from 'ipfs-core';

export default async function savetoIPFS(byteData) {
  const ipfs = await IPFS.create();
  const { cid } = await ipfs.add(byteData);

  return cid;
}
