export default async function embedImage(img, imgToEmbed) {
  img.crossOrigin = 'Anonymous'; // This is because we are grabbing from somewhere else
  //console.log("Original Image:", img);
  //console.log("Image to Embed:", imgToEmbed);

  var embImgCordX = 10;
  var embImgCordY = 10;

  var sWidth = img.width; // Width of original image
  var sHeight = img.height; // height of original image

  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  canvas.width = sWidth; // Set equal to original image width
  canvas.height = sHeight; // Set equal to original image height

  // Instead of waiting like this, it needs to be changed to onload function of the images
  // error is that images are not loading in time for the drawimage to work
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
  console.log("Delay 1: Reminder to get rid of.");
  await delay(1000);

  ctx.drawImage(img, 0, 0);  // Draw the original image to the canvas

  var embedCanvas = document.createElement('canvas');
  var embedCtx = embedCanvas.getContext('2d');
  embedCanvas.width = imgToEmbed.width;
  embedCanvas.height = imgToEmbed.height;

  //console.log("Delay 2: Reminder to get rid of.");
  //await delay(1000);

  embedCtx.drawImage(imgToEmbed, 0, 0);

  //console.log("Delay 3: Reminder to get rid of.");
  //await delay(1000);

  var embedData = embedCtx.getImageData(0, 0, embedCanvas.width, embedCanvas.height);
  //console.log("QR Image Data", embedData);
  var origData = ctx.getImageData(embImgCordX, embImgCordY, embedCanvas.width, embedCanvas.height);
  //console.log("Nut Image Data", origData);

  //console.log("Delay 4: Reminder to get rid of.");
  //await delay(1000);

  var blackCount = 0;
  var whiteCount = 0;
  var count = 0;

  for (var x = 0; x < embedData.width; x++) {
    for (var y = 0; y < embedData.height; y++) {
      var idx = (x + y * embedData.width) * 4;

      // The RGB values
      var r = embedData.data[idx + 0];
      var g = embedData.data[idx + 1];
      var b = embedData.data[idx + 2];

      // The original RGB values
      var or = origData.data[idx + 0];
      var og = origData.data[idx + 1];
      var ob = origData.data[idx + 2];

      var isBlack = (r<=50) && (g<=50) && (b<=50);
      if (isBlack) {
        blackCount++;
      } else {
        whiteCount++;
      }

      var isOdd = ((or+og+ob)%2);
      var pixel = [or, og, ob];
      var fixedPixel = fixPixel(pixel, isBlack);

      embedData.data[idx + 0] = fixedPixel[0];
      embedData.data[idx + 1] = fixedPixel[1];
      embedData.data[idx + 2] = fixedPixel[2];
    }
  }

  ctx.putImageData(embedData, embImgCordX, embImgCordY);

  //console.log("Delay 5: Reminder to get rid of.");
  //await delay(1000);

  return canvas.toDataURL()
}

var fixPixel = function (pixel, needOdd) {
  var r = pixel[0];
  var g = pixel[1];
  var b = pixel[2];

  // see if odd already
  var isOdd = !((r+g+b) % 2);

  if ((needOdd && !isOdd) || (!needOdd && isOdd)) {
    if (r <= g && r <= b) {
      if (r==0) {
        r++;
      } else {
        r--;
      }
    } else if (g <= r && g <= b) {
      if (g == 0) {
        g++;
      } else {
        g--;
      }
    } else if (b <= r && b <= g) {
      if (b == 0) {
        b++;
      } else {
        b--;
      }
    }
  }
  return [r, g, b]
}
