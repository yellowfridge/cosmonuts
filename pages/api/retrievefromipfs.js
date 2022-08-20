import { create } from 'ipfs-http-client';

export default async function retrieveFromIPFS(req, res) {
  const ipfsPrivateKey = process.env.IPFS_PRIVATE_KEY;
  const ipfsCID = req.body.ipfsCID;

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
  // Content comes out in numbers

  const item = Buffer.from(content).toString('base64');

  res.status(200).json({
    item: item
  });

}
