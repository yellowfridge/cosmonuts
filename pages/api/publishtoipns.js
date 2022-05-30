import { create } from 'ipfs-http-client';

export default async function publishToIPNS(req, res) {
  console.log("Publishing to IPNS ...");

  const ipfsPrivateKey = process.env.IPFS_PRIVATE_KEY;
  const nutMeta_cid = req.body.nutMeta_cid;
  console.log("Nut Meta_cid", nutMeta_cid);

  const ipfsServer = await create({
    privateKey: ipfsPrivateKey
  });

  let test = 'testing';

  const nutPath = '/ipfs/' + nutMeta_cid;
  console.log("Nut Path:", nutPath);

  // Publishing to IPNS
  // Need to identify which nut is being changed
  // for now set at Nut0

  //const publishedCID = ipfsServer.name.publish(nutPath, {
  //  key: 'nut0'
  //});

  ipfsServer.name.publish(nutPath, {
    key: 'nut0'
  }).then((publishedCID) => {
    console.log("Published CID", publishedCID);

    res.status(200).json({
        nutIPNS: publishedCID.name
    });

  });

}
