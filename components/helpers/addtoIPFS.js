import * as IPFS from 'ipfs-core';

const addToIPFS = async (qrImg, finalImg) => {
  const ipfs = await IPFS.create();
  const qrImg_cid = await ipfs.add(qrImg);
  const finalImg_cid = await ipfs.add(finalImg);

  console.log("Consolidated Image:", finalImg_cid);
  return { qrImg_cid, finalImg_cid }
}

export default addToIPFS
