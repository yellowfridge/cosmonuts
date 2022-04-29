import * as IPFS from 'ipfs-core';

const addToIPFS = async (qrImg, embImg) => {
  const ipfs = await IPFS.create();
  const qrImg_cid = await ipfs.add(qrImg);
  const embImg_cid = await ipfs.add(embImg);

  console.log("Consolidated Image:", embImg_cid);
  return { qrImg_cid, embImg_cid }
}

export default addToIPFS
