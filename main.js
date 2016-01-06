// modified version from: http://thecodeplayer.com/walkthrough/3d-perspective-projection-canvas-javascript

(function () {
  var canvas = document.querySelector('#canvas');
  var canvas2 = document.querySelector('#canvas2');
  var body = document.body;
  var ctxWidth = canvas.width = canvas2.width = window.innerWidth;
  var ctxHeight = canvas.height = canvas2.height = window.innerHeight;
  var fov = 150;
  var ctx = canvas.getContext('2d');
  var ctx2 = canvas2.getContext('2d');
  var start = window.mozAnimationStartTime || new Date().getTime();
  var cached = {};
  var switchLayout = false;
  var pixels = [];

  function generate() {
    var max = 150;

    for (var x = -max; x < max; x += 25) {
      for (var z = -max; z < max; z += 10) {
        pixels.push(
          {
            x: max,
            y: x,
            z: z
          },
          {
            x: -max,
            y: x,
            z: z
          });
      }
    }

     for (var x = -max; x < max; x += 50) {
      for (var z = -max; z < max; z += 25) {
        pixels.push(
          {
            x: x,
            y: max,
            z: z
          },
          {
            x: z,
            y: -max,
            z: x
          });
      }
    }
  }

  function render() {
    var i = pixels.length;

    ctx.clearRect(100, 100, ctxWidth / 2, ctxHeight);

    var red = Math.floor(Math.random() * 255 + 10);
    var green = Math.floor(Math.random() * 255 + 50);
    var blue = Math.floor(Math.random() * 155 + 100);

    while (i--) {
      var pixel = pixels[i];
      //calculating 2d position for 3d coordinates
      //fov = field of view = denotes how far the pixels are from us.
      //the scale will control how the spacing between the pixels will decrease with increasing distance from us.
      var scale = fov / (fov + pixel.z);
      var xView = Math.floor(Math.random() * 100 + 1);

      var x2d = pixel.x * scale + ctxWidth / xView;
      var y2d = pixel.y * scale + ctxHeight / xView;

      //marking the points only if they are inside the screen
      if (x2d >= 0 && x2d <= ctxWidth && y2d >= 0 && y2d <= ctxHeight) {
        var shapeType = Math.floor(Math.random() * 2 + 1);

        if (!cached[x2d + '-' + y2d + '-' + shapeType]) {
          var rad;

          red = Math.floor(Math.random() * 255 + 100);
          green = Math.floor(Math.random() * 55 + 10);
          blue = Math.floor(Math.random() * 255 + 150);

          cached[x2d + '-' + y2d + '-' + shapeType] = 'rgba(' + red + ', ' + green + ', ' + blue + ', 0.3)';
        }

        ctx.fillStyle = cached[x2d + '-' + y2d + '-' + shapeType];

        ctx.lineWidth = 1;
        ctx.strokeStyle = '#fff';
        ctx.strokeRect(120, 120, 210, 100);
        ctx.strokeRect(x2d, y2d, 100, Math.floor(Math.random() * 150 + 10));

        if (shapeType === 1) {
          ctx.fillRect(x2d, y2d, 100, Math.floor(Math.random() * 150 + 10));
        } else {
          ctx.fillRect(x2d, y2d, Math.floor(Math.random() * 100 + 10), Math.floor(Math.random() * 100 + 10));
        }

        ctx.rotate(1);

      }

      pixel.z -= 2;

      if (pixel.z < -fov) {
        pixel.z += 5 * fov;
      }
    }

    setTimeout(function () {
      requestAnimationFrame(render);
    }, 1000 / 60);
  }

  generate(start);
  render();

  setInterval(function () {
    switchLayout = !switchLayout;

    if (switchLayout) {
      body.classList.add('switch');
      body.classList.remove('switch-off');
    } else {
      body.classList.remove('switch');
      body.classList.add('switch-off');
    }

  }, 6000);

})();