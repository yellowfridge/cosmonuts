export default async function addToImage(nutId, img, qr) {
  console.log("Adding components to image...");
  //console.log("Nut Id in Image Components: ", nutId);
  //console.log("Image in Image Components: ", img);
  //console.log("QR Code in Image Components: ", qr);

  // Creating canvas to work on
  var cvs = document.createElement('canvas');
  var ctx = cvs.getContext('2d');
  cvs.width = 631; // Reconsider - Hardcoding seemed to work better
  cvs.height = 631; // Reconsider - Hardcoding seemed to work better

  await ctx.drawImage(img, 0, 0); // Draws the original nut image
  //await ctx.drawImage(qr, 30, 30, 100, 100); // Draws the QR code on the top left side
  //await ctx.drawImage(qr, 500, 30, 100, 100); // Draws the QR code on the top right side
  //await ctx.drawImage(qr, 30, 500, 100, 100); // Draws the QR code on the bottom left side
  await ctx.drawImage(qr, 500,500, 100, 100); // Draws the QR code on the bottom right side

  // Creating the number id image to place on canvas
  ctx.font = "italic bold 80px Arial"; // Font of the text
  ctx.fillStyle = "rgba(100,90,0,0.5)"; // Yellow color with transparency (last item - alpha)
  var nutId_text = "#" + nutId; // Text to draw on the image
  await ctx.fillText(nutId_text, 150, 200); // Draws the text image close to the top left of the face

  var cvsURI = cvs.toDataURL();

  return cvsURI;
}
