import { useEffect } from 'react';

export default function Starfield(props) {

  useEffect(() => {
    var starfield_canvas = document.getElementById('starfield');
    var starfield_ctx = starfield_canvas.getContext('2d');
    var w = starfield_canvas.width = window.innerWidth;
    var h = starfield_canvas.height = window.innerHeight;

    var hue = 217;
    var stars = [];
    var count = 0;
    var maxStars = 1400;

    var new_canvas = document.createElement('canvas');
    var new_ctx = new_canvas.getContext('2d');
    new_canvas.width = 100;
    new_canvas.height = 100;

    var half_canvas = new_canvas.width / 2;
    var gradient = new_ctx.createRadialGradient(half_canvas, half_canvas, 0, half_canvas, half_canvas, half_canvas);
    gradient.addColorStop(0.025, '#fff');
    gradient.addColorStop(0.1, 'hsl(' + hue + ', 61%, 33%)');
    gradient.addColorStop(0.25, 'hsl(' + hue + ', 64%, 6%)');
    gradient.addColorStop(1, 'transparent');

    new_ctx.fillStyle = gradient;
    new_ctx.beginPath();
    new_ctx.arc(half_canvas, half_canvas, half_canvas, 0, Math.PI * 2);
    new_ctx.fill();

    var Star = function() {
      this.orbitRadius = random(maxOrbit(w, h));
      this.radius = random(60,  this.orbitRadius) / 12;
      this.orbitX = w / 2;
      this.orbitY = h / 2;
      this.timePassed = random(0, maxStars);
      this.speed = random(this.orbitRadius) / 50000;
      this.alpha = random(2, 10) / 10;

      count++;
      stars[count] = this;
    }

    Star.prototype.draw = function() {
      var x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX;
      var y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY;
      var twinkle = random(10);

      if (twinkle === 1 && this.alpha > 0) {
        this.alpha -= 0.05;
      } else if (twinkle === 2 && this.alpha < 1) {
        this.alpha += 0.05;
      }

      starfield_ctx.globalAlpha = this.alpha;
      starfield_ctx.drawImage(
        new_canvas,
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
      starfield_ctx.fillStyle = 'hsla(' + hue + ', 64%, 6%, 1)';
      starfield_ctx.fillRect(0, 0, w, h);

      starfield_ctx.globalCompositeOperation = 'lighter';
      for (var i = 1, l = stars.length; i < l; i++) {
        stars[i].draw();
      }

      window.requestAnimationFrame(animation);
    }
    animation();

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
