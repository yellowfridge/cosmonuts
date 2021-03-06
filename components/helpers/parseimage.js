export default async function parseImage(image) {
  image.crossOrigin = 'Anonymous'; // This is because we are grabbing from somewhere else
  var sWidth = image.width;
  var sHeight = image.height;

  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  canvas.width = sWidth;
  canvas.height = sHeight;

  // Instead of waiting like this, it needs to be changed to onload function of the images
  // error is that images are not loading in time for the drawimage to work
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
  console.log("Delay 1: Reminder to get rid of.");
  await delay(1000);

  ctx.drawImage(image, 0, 0);

  var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  for (var x = 0; x < canvas.width; x++) {
    for (var y = 0; y < canvas.height; y++) {
      var idx = (x + y * canvas.width) * 4;

      // The RGB values
      var r = imageData.data[idx + 0];
      var g = imageData.data[idx + 1];
      var b = imageData.data[idx + 2];

      var isOdd = !!((r+g+b) % 2);

      imageData.data[idx + 0] = isOdd ? 255 : 0;
      imageData.data[idx + 1] = isOdd ? 255 : 0;
      imageData.data[idx + 2] = isOdd ? 255 : 0;
    }
  }
  ctx.putImageData(imageData, 0, 0);

  return canvas.toDataURL()
}
