import * as IPFS from 'ipfs-core';

const addToIPFS = async (openImg, qrImg, finalImg, nutMetadata) => {
  console.log("Adding files to IPFS...");
  const ipfs = await IPFS.create(); // Initialize IPFS

  // Need to add all of these under IPNS

  // ADD THESE ALL AS VERSION 1 later
  const openImg_cid = await ipfs.add(openImg);
  const qrImg_cid = await ipfs.add(qrImg);

  const finalImg_cid = await ipfs.add(finalImg);
  console.log("Consolidated Image:", finalImg_cid);

  const metadata_str = JSON.stringify(nutMetadata);
  const nutMetadata_cid = await ipfs.add(metadata_str);
  console.log("Nut Metadata CID:", nutMetadata_cid);

  // Publishing to IPNS
  // Need to identify which nut is being changed
  // for now set at Nut0
  console.log("Publishing to IPNS...");
  var nutPath = '/ipfs/' + nutMetadata_cid.path;
  console.log("Path", nutPath);
  //ipfs.name.publish(nutPath, {
  //  key: 'nut0' // It does not recognize this
  //});

  return { openImg_cid, qrImg_cid, finalImg_cid, nutMetadata_cid }
}

// HOW DO WE GET RID OF ANY LOCKED FILES ????
export default async function getIPFSPaths(req, res) {
  const ipfsPrivateKey = process.env.IPFS_PRIVATE_KEY;

  const openImg = req.body.openImg;
  const pubQR = req.body.pubQR;
  const finalImg = req.body.finalImg;
  const newNutMeta = req.body.newNutMeta;

  const nutMetadata = addToIPFS(openImg, pubQR, finalImg, newNutMeta).then((paths) => {
    console.log("Paths Add to IPFS - new Nut Meta: ", paths.newNutMeta);
    return paths.newNutMeta;
  });

  res.status(200).json({ nutMetaCID: nutMetadata });
}

// This is old code below - to be deleted after
//export default addToIPFS
