import * as IPFS from 'ipfs-core';
import { create } from 'ipfs-http-client';
//import publishToIPNS from '../../components/helpers/publishtoipns';

const addToIPFS = async (openImg, qrImg, finalImg, nutMetadata) => {
  console.log("Adding files to IPFS...");

  let ipfs;
  try {
    // It will create an IPFS instance, if one does not exist already
    ipfs = await IPFS.create();
  } catch (error) {
    console.log("IPFS Error", error);
    // If one exists, it will connect to intialized IPFS
    // This is likely not right
    //var ipfs = create('http://127.0.0.1:5002');
  }

  //const ipfs = await IPFS.create();
  //const ipfs = await IPFS.create({
  //  privateKey: ipfsPrivateKey
  //}); // Initialize IPFS

  // Need to add all of these under IPNS
  // ADD THESE ALL AS VERSION 1 later
  console.log("Starting to add...");
  const openImg_cid = await ipfs.add(openImg.data);
  //console.log("Open Image CID:", openImg_cid);

  const qrImg_cid = await ipfs.add(qrImg.data);
  //console.log("QR Img CID:", qrImg_cid);

  const finalImg_cid = await ipfs.add(finalImg.data);
  //console.log("Consolidated Image CID:", finalImg_cid);

  const metadata_str = JSON.stringify(nutMetadata);
  const nutMetadata_cid = await ipfs.add(metadata_str);
  //console.log("Nut Metadata CID:", nutMetadata_cid);

  // Publishing to IPNS
  // Need to identify which nut is being changed
  // for now set at Nut0
  //var nutPath = '/ipfs/' + nutMetadata_cid.path;
  //console.log("Path", nutPath);
  //publishToIPNS();

  //ipfs.name.publish(nutPath, {
  //  key: 'nut0' // It does not recognize this
  //});

  return { openImg_cid, qrImg_cid, finalImg_cid, nutMetadata_cid }
}

// HOW DO WE GET RID OF ANY LOCKED FILES ????
export default async function getIPFSPaths(req, res) {

  const openImg = req.body.openImg;
  const pubQR = req.body.pubQR;
  const finalImg = req.body.finalImg;
  const newNutMeta = req.body.newNutMeta;

  //console.log("Open Img", openImg);
  //console.log("Pub QR", pubQR);
  //console.log("Final Img", finalImg);
  //console.log("new Nut Meta", newNutMeta);

  const getNutMetadata = async () => {
    const cids = await addToIPFS(openImg, pubQR, finalImg, newNutMeta);
    //console.log("Nut CIDS", cids);
    return cids;
  }

  getNutMetadata().then((cids) => {
    res.status(200).json({
      openImg: cids.openImg_cid.path,
      qrImg: cids.qrImg_cid.path,
      finalImg: cids.finalImg_cid.path,
      nutMeta: cids.nutMetadata_cid.path
    });
  });

}
