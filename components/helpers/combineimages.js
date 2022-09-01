export default async function combineImages(nutId, img1, img2) {
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

  ctx.drawImage(img1, 10, 100); // Draws the open message (text)
  ctx.drawImage(img2, 350, 100); // Draws the public message (QR)

  ctx.font = "bold 20px Arial"; // Font of the text
  ctx.fillStyle = "yellow" // Changing canvas selected color to white
  var firstLine = "Nut Id: " + nutId; // Text to write on first line
  await ctx.fillText(firstLine, 20, 30); // Draws the first line close to the top left corner

  var currentTime = new Date(); // Get current date (includes time)
  //console.log("Current Time", currentTime);
  var dd = String(currentTime.getDate()).padStart(2, '0');
  //console.log("Day", dd);
  var mm = String(currentTime.getMonth() + 1).padStart(2, '0');
  //console.log("Month", mm);
  var yyyy = currentTime.getFullYear();
  //console.log("Year", yyyy);

  var date = mm + "/" + dd + "/" + yyyy; // Create full date format
  var secondLine = "Date Posted: " + date; // Text to write on second line
  await ctx.fillText(secondLine, 20, 55); // Draws the second line right under first

  var cvsURI = cvs.toDataURL();
  //console.log("Combined Img URL", cvsURL);

  return cvsURI;
}
