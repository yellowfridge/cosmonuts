import * as IPFS from 'ipfs-core';

const addToIPFS = async (openImg, qrImg, finalImg) => {
  const ipfs = await IPFS.create(); // Initialize IPFS

  // Need to add all of these under IPNS

  // ADD THESE ALL AS VERSION 1 later
  const openImg_cid = await ipfs.add(openImg);
  const qrImg_cid = await ipfs.add(qrImg);
  const finalImg_cid = await ipfs.add(finalImg);

  console.log("Consolidated Image:", finalImg_cid);
  return { openImg_cid, qrImg_cid, finalImg_cid }
}

export default addToIPFS
