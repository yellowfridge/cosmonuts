export default async function getSecret(req, res) {
  const crypto = require('crypto');
  const buffer = require('buffer');

  const imgHash = req.body.imgHash;
  const privateKey = process.env.PRIVATE_KEY;

  const data = Buffer.from(imgHash); // convert hash to buffer
  const sign = crypto.sign('SHA256', data, {
    key: privateKey,
    format: 'pem'
  }); // sign the data and return signature in buffer

  const signedImage = sign.toString('base64'); // Convert returned buffer to base64

  res.status(200).json({ signedImage: signedImage });
}
