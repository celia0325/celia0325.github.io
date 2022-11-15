let theCircles = [];
let speed;

function setup() {
  createCanvas(windowWidth, 600);
}

function draw() {
  background(220);
  displayCircles();
}

function mousePressed() {
  spawnBall();
}

function displayCircles() {
  for (let i = 0; i < theCircles.length; i++) {
    noStroke();
    fill(theCircles[i].theColor);
    circle(theCircles[i].x, theCircles[i].y, theCircles[i].d);
    theCircles[i].y+= 10;
    if (theCircles[i].y >= height - theCircles[i].d/2) {
      theCircles[i].y-= 20;
    }
  }
}



function spawnBall(tempX, tempY) {
  let newBall = {
    x: tempX,
    y: tempY,
    d: random(50, 75),
    theColor: color(random(150), random(150), random(150),random(150)),
    dx: random (-5,5),
    dy: random (-5,5),
  };
  return newBall;
}