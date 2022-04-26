import * as IPFS from 'ipfs-core';

const addToIPFS = async (img1_byteStr, img2_byteStr) => {
  const ipfs = await IPFS.create();
  const img1_cid = await ipfs.add(img1_byteStr);
  const img2_cid = await ipfs.add(img2_byteStr);

  console.log("Consolidated Image:", img2_cid);
  return { img1_cid, img2_cid }
}

export default addToIPFS
