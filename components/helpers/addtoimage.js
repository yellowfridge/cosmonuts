export default async function addToImage(nutId, img, qr) {
  console.log("Adding components to image...");
  console.log("Nut Id in Image Components: ", nutId);
  //console.log("Image in Image Components: ", img);
  //console.log("QR Code in Image Components: ", qr);

  // Creating canvas to work on
  var cvs = document.createElement('canvas');
  var ctx = cvs.getContext('2d');
  cvs.width = 631; // Hardcoding seemed to work better
  cvs.height = 631; // Hardcoding seemed to work better

  // Creating the number id image to place on canvas
  

  // Perform drawings
  await ctx.drawImage(img, 0, 0); // Draws the original nut image
  await ctx.drawImage(qr, 500,500, 100, 100); // Draws the QR code on the bottom right side

  var cvsURI = cvs.toDataURL();

  return cvsURI;
}
