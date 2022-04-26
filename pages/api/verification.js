export default async function getVerification(req, res) {
  const crypto = require('crypto');

  const imgHash = req.body.imgHash;
  const signedHash = req.body.signedHash;
  const publicKey = process.env.PUBLIC_KEY;

  const data = Buffer.from(imgHash); // convert hash to buffer
  const signature = Buffer.from(signedHash, 'base64'); // convert string to buffer

  const verification = crypto.verify('SHA256', data, publicKey, signature); // Verify the decryption works

  res.status(200).json({ verification: verification });
}
