import { create } from 'ipfs-http-client';

export default async function retrieveFromIPFS(req, res) {
  const ipfsPrivateKey = process.env.IPFS_PRIVATE_KEY;
  const ipfsCID = req.body.ipfsCID;
  const type = req.body.type;

  // Creating the local IPFS server
  const ipfsServer = await create({
    privateKey: ipfsPrivateKey
  });

  const data = await ipfsServer.cat("/ipfs/" + ipfsCID);
  // Data object is a AsyncGenerator, needs below to function
  let content = [];
  for await (const chunk of data) {
    content = [...content, ...chunk];
  }
  // Content comes out in numbers list 125, 50, 5, 10, 164, ...

  let item;
  if (type == "image") {
    item = Buffer.from(content).toString('base64');
  } else {
    let raw = Buffer.from(content).toString('utf8');
    item = JSON.parse(raw);
  }

  res.status(200).json({
    item: item
  });

}
