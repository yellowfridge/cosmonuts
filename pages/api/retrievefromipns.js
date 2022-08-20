import { create } from 'ipfs-http-client';

export default async function retrieveFromIPNS(req, res) {
  const ipfsPrivateKey = process.env.IPFS_PRIVATE_KEY;
  const nutCID = req.body.ipnsCID;

  // Creating the local IPFS server
  const ipfsServer = await create({
    privateKey: ipfsPrivateKey
  });

  //console.log("Nut CID", nutCID);
  const data = await ipfsServer.cat("/ipns/" + nutCID);
  let content = [];
  for await (const chunk of data) {
    content = [...content, ...chunk];
  }

  //console.log("Data", content.toString());

  const raw = Buffer.from(content).toString('utf8');
  //console.log(JSON.parse(raw));

  const data_json = JSON.parse(raw);

  res.status(200).json({
    data: data_json
  });

}
