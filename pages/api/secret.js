import axios from 'axios';

export default async function serverSideCall(req, res) {
  //const {
  //  query: { imgHash },
  //} = req;

  var imgHash = req.body.imgHash;

  //const privateKey = process.env.PRIVATE_KEY;

  res.status(200).json({ signedImage: 'hello' });
}
