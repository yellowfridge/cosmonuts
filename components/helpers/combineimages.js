export default async function combineImages(img1, img2) {
  console.log("Combining images...");
  //console.log("1st Image to Combine", img1);
  //console.log("2nd Image to Combine", img2);

  // Creating canvas to work on
  var cvs = document.createElement('canvas');
  var ctx = cvs.getContext('2d');
  cvs.width = 610;  // Hardcoding seemed to work better
  cvs.height = 610; // Hardcoding seemed to work better

  ctx.fillStyle = "black"; // Testing showed QR codes easier to read
  ctx.fillRect(0, 0, cvs.width, cvs.height); // Fill background with black

  ctx.drawImage(img1, 10, 10); // Draws the open message (text)
  ctx.drawImage(img2, 350, 10); // Draws the public message (QR)

  var cvsURI = cvs.toDataURL();
  //console.log("Combined Img URL", cvsURL);

  return cvsURI;
}
