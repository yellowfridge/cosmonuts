export default async function combineImages(img1, img2) {
  console.log("Combining images...");
  //console.log("1st Image to Combine", img1);
  //console.log("2nd Image to Combine", img2);

  var cvs = document.createElement('canvas');
  var ctx = cvs.getContext('2d');
  cvs.width = 610;
  cvs.height = 610;

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, cvs.width, cvs.height);

  ctx.drawImage(img1, 10, 0);
  ctx.drawImage(img2, 350, 0);

  var cvsURI = cvs.toDataURL();
  //console.log("Combined Img URL", cvsURL);

  return cvsURI;
}
