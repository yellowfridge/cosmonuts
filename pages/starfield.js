import { useState, useEffect } from 'react';

export default function Starfield(props) {

  const [imgURL, setImgURL] = useState('');

  useEffect(() => {
    var starfield_canvas = document.getElementById('starfield');
    document.body.appendChild(starfield_canvas);
    var starfield_ctx = starfield_canvas.getContext('2d');
    var w = starfield_canvas.width = window.innerWidth;
    var h = starfield_canvas.height = window.innerHeight;

    var stars = [];
    var count = 0;
    var maxStars = 1500;
    var backgroundHue = 228;

    // Define Star 1
    var star1_canvas = document.createElement('canvas');
    var star1_ctx = star1_canvas.getContext('2d');
    star1_canvas.width = 100;
    star1_canvas.height = 100;

    var half1_canvas = star1_canvas.width / 2;
    var gradient1 = star1_ctx.createRadialGradient(half1_canvas, half1_canvas, 0, half1_canvas, half1_canvas, half1_canvas);
    gradient1.addColorStop(0.025, '#fff');
    gradient1.addColorStop(0.1, 'hsl(' + 28 + ', 61%, 33%)');
    gradient1.addColorStop(0.25, 'hsl(' + 22 + ', 64%, 6%)');
    gradient1.addColorStop(1, 'transparent');

    star1_ctx.fillStyle = gradient1;
    star1_ctx.beginPath();
    star1_ctx.arc(half1_canvas, half1_canvas, half1_canvas, 0, Math.PI * 2);
    star1_ctx.fill();
    // End of Star 1

    // Define Star 2
    var star2_canvas = document.createElement('canvas');
    var star2_ctx = star2_canvas.getContext('2d');
    star2_canvas.width = 100;
    star2_canvas.height = 100;

    var half2_canvas = star2_canvas.width / 2;
    var gradient2 = star2_ctx.createRadialGradient(half2_canvas, half2_canvas, 0, half2_canvas, half2_canvas, half2_canvas);
    gradient2.addColorStop(0.025, '#fff');
    gradient2.addColorStop(0.1, 'hsl(' + 228 + ', 61%, 33%)');
    gradient2.addColorStop(0.25, 'hsl(' + 223 + ', 64%, 6%)');
    gradient2.addColorStop(1, 'transparent');

    star2_ctx.fillStyle = gradient2;
    star2_ctx.beginPath();
    star2_ctx.arc(half2_canvas, half2_canvas, half2_canvas, 0, Math.PI * 2);
    star2_ctx.fill();
    // End of Star 2

    var starsList = [star1_canvas, star2_canvas];

    var Star = function() {
      this.orbitRadius = random(maxOrbit(w, h));
      this.radius = random(100,  this.orbitRadius) / 12;
      this.orbitX = w / 2;
      this.orbitY = h / 4;
      this.timePassed = random(0, maxStars);
      this.speed = random(this.orbitRadius) / 1000000;
      this.alpha = random(2, 10) / 10;

      count++;
      stars[count] = this;
    }

    Star.prototype.draw = function() {
      var x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX;
      var y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY;
      var twinkle = random(100);
      var twinkleDepth = 1; // greater means less twinkling in front

      if (Math.round(this.speed*100000) % twinkleDepth === 0) {
        if (twinkle === 1 && this.alpha > 0) {
          this.alpha -= 0.01;
        } else if (twinkle === 2 && this.alpha < 1) {
          this.alpha += 0.01;
        }
      }

      var star_canvas = starsList[Math.floor(Math.random() * starsList.length)];

      starfield_ctx.globalAlpha = this.alpha;
      starfield_ctx.drawImage(
        star_canvas,
        x - this.radius / 2,
        y - this.radius / 2,
        this.radius,
        this.radius
      );
      this.timePassed += this.speed;
    }

    for (var i = 0; i < maxStars; i++) {
      new Star();
    }

    function animation() {
      starfield_ctx.globalCompositeOperation = 'source-over';
      starfield_ctx.globalAlpha = 0.8;
      starfield_ctx.fillStyle = 'hsla(' + backgroundHue + ', 64%, 6%, 1)';
      starfield_ctx.fillRect(0, 0, w, h);

      starfield_ctx.globalCompositeOperation = 'lighter';
      for (var i = 1, l = stars.length; i < l; i++) {
        stars[i].draw();
      }

      window.requestAnimationFrame(animation);
    }
    animation();

    var starfieldURL = starfield_canvas.toDataURL();
    //console.log("Starfield URL", starfieldURL);
    function updateURL() {
      setImgURL(starfieldURL);
    }

  });

  function random(min, max) {
    if (arguments.length < 2) {
      max = min;
      min = 0;
    }

    if (min > max) {
      var hold = max;
      max = min;
      min = hold;
    }

    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function maxOrbit(x, y) {
    var max = Math.max(x, y);
    var diameter = Math.round(Math.sqrt(max*max + max*max));

    return diameter / 2;
  }

  return (
    <canvas id="starfield" />
  )

}
