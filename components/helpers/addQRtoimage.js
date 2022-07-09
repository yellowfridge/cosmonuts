export default async function addQRtoImage(img, qr) {
  console.log("Adding QR code to image...");
  //console.log("Image in adding QR: ", img);
  //console.log("QR Code in adding QR: ", qr);

  var cvs = document.createElement('canvas');
  var ctx = cvs.getContext('2d');
  cvs.width = 631;
  cvs.height = 631;

  await ctx.drawImage(img, 0, 0);
  await ctx.drawImage(qr, 360,380);

  var cvsURI = cvs.toDataURL();

  return cvsURI;
}
