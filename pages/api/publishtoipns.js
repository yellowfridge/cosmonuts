import { create } from 'ipfs-http-client';

export default async function publishToIPNS(req, res) {
  const ipfsPrivateKey = process.env.IPFS_PRIVATE_KEY;
  const nutKey = req.body.nutKey;
  const nutMeta_cid = req.body.nutMeta_cid;
  //console.log("Nut Meta_cid", nutMeta_cid);
  const openImg_cid = req.body.openImg_cid;
  const qrImg_cid = req.body.qrImg_cid;
  const finalImg_cid = req.body.finalImg_cid;
  const embImg_cid = req.body.embImg_cid;

  // Creating the local IPFS server
  const ipfsServer = await create({
    privateKey: ipfsPrivateKey
  });

  console.log("Pinning generated IPFS files to local node server ...");
  // Testing to see if this will help retrieve IPFS files better
  ipfsServer.pin.add(nutMeta_cid);
  ipfsServer.pin.add(openImg_cid);
  ipfsServer.pin.add(qrImg_cid);
  ipfsServer.pin.add(finalImg_cid);
  ipfsServer.pin.add(embImg_cid);

  const nutPath = '/ipfs/' + nutMeta_cid;
  //console.log("Nut Path:", nutPath);

  console.log("Publishing to IPNS ...");
  ipfsServer.name.publish(nutPath, {
    key: nutKey
  }).then((publishedCID) => {
    console.log("Published CID", publishedCID);

    res.status(200).json({
        nutIPNS: publishedCID.name
    });

  });

}
