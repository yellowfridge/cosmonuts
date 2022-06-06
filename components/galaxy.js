import { useState, useEffect } from 'react';

export default function Galaxy(props) {

  useEffect(() => {
    var galaxy_canvas = document.getElementById('galaxy');
    var galaxy_ctx = galaxy_canvas.getContext('2d');
    var w = galaxy_canvas.width = window.innerWidth;
    var h = galaxy_canvas.height = window.innerHeight;

    var hue = 217; // should be same as starfield for integration
    var stars = [];
    var count = 0;
    var maxStars = 1000;

    var star_canvas = document.createElement('canvas');
    var star_ctx = star_canvas.getContext('2d');
    star_canvas.width = 100;
    star_canvas.height = 100;

    var half_canvas = star_canvas.width / 2;
    var gradient = star_ctx.createRadialGradient(half_canvas, half_canvas, 0, half_canvas, half_canvas, half_canvas);
    gradient.addColorStop(0.025, '#fff');
    gradient.addColorStop(0.1, 'hsl(' + hue + ', 61%, 33%)');
    gradient.addColorStop(0.25, 'hsl(' + hue + ', 64%, 6%)');
    gradient.addColorStop(1, 'transparent');

    star_ctx.fillStyle = gradient;
    star_ctx.beginPath();
    star_ctx.arc(half_canvas, half_canvas, half_canvas, 0, Math.PI * 2);
    star_ctx.fill();

    var Star = function() {
      this.orbitRadius = random(maxOrbit(w, h)) / 10;
      this.radius = random(1,  this.orbitRadius);
      this.orbitX = w / 2;
      this.orbitY = h / 2;
      this.timePassed = random(0, maxStars);
      this.speed = random(this.orbitRadius) / 100000;
      this.alpha = random(2, 10) / 10;

      count++;
      stars[count] = this;
    }

    Star.prototype.draw = function() {
      var x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX;
      var y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY;
      var twinkle = random(10);
      var twinkleDepth = 20; // greater means less twinkling in front

      if (Math.round(this.speed*100000) % twinkleDepth === 0) {
        if (twinkle === 1  && this.alpha > 0) {
          this.alpha -= 0.01;
        } else if (twinkle === 2 && this.alpha < 1) {
          this.alpha += 0.01;
        }
      }

      galaxy_ctx.globalAlpha = this.alpha;
      galaxy_ctx.drawImage(
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
      galaxy_ctx.globalCompositeOperation = 'source-over';
      galaxy_ctx.globalAlpha = 0.8;
      galaxy_ctx.fillStyle = 'hsla(' + hue + ', 64%, 6%, 1)';
      galaxy_ctx.fillRect(0, 0, w, h);

      galaxy_ctx.globalCompositeOperation = 'lighter';
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
    <canvas id="galaxy" />
  )

}
