window.onload = function() {
  // Initializing the Canvas
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");

  // Getting Dimensions for Canvas
  var w = window.innerWidth;
  var h = window.innerHeight;

  canvas.width = w;
  canvas.height = h;

  // Particles
  var mp = 25; // Maximum Number of Particles
  var particles = []; // Array for Particles

  for (var i = 0; i < mp; i++) {
    particles.push({
      x : Math.random() * w, // X Coordinate
      y : Math.random() * h, // Y Coordinate
      r : Math.random() * 6 + 1, // Particle Radius
      d : Math.random() * mp, // Density
    });
  }

  // Function to Draw Snowflakes
  function draw() {
    ctx.clearRect(0,0,w,h);
    ctx.fillStyle = "rgba(255,255,255,0.8)";
    ctx.beginPath();

    for (var i = 0; i < mp; i++) {
      var p = particles[i];
      ctx.moveTo(p.x,p.y);
      ctx.arc(p.x,p.y,p.r,0,Math.PI * 2,true);
    }

    ctx.fill();
    update();
  }

  var angle = 0;

  // Update Snowflake Movements
  function update() {
    angle += 0.01;

    for (var i = 0; i < mp; i++) {
      var p = particles[i];
      // Update 2D Coordinates
      p.y += Math.cos(angle + p.d) + 1 + p.r / 2;
      p.x += Math.sin(angle) * 2;

      // Sending Coordinates Back to the Top of the Screen
      if (p.x > w + 7 || p.x < -7 || p.y > h) {
        if (i%3 > 0) {
          // for 2/3 of all the flakes
          particles[i] = {x:Math.random() * w, y:-10, r : p.r, d : p.d};

        } else {
          // Flakes exiting from right
          if (Math.sin(angle) > 0) {
            particles[i] = {x:-7, y:Math.random()*h, r:p.r, d:p.d};
          } else {
            // Flakes entering from right
            particles[i] = {x:w+7,y:Math.random()*h, r:p.r, d:p.d};
          }
        }
      }
    }
  }

  // Animation every 33 seconds
  setInterval(draw, 33);
}
