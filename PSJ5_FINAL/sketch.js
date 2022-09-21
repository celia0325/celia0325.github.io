// Chessboard
// Celia Newell
// September 19
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let x = 0;
let y = 0;
let dx = 5;
let dy = 6;
let sqSize = 50;
let sqColor;

function setup() {
  createCanvas(windowWidth,windowHeight);
  sqColor = color(200, 0, 255);
}

function draw() {
  background("black");
  handleKeys();
  drawSquare();
  moveSquare();
  bounceOff();
}

function drawSquare() {
  fill(sqColor);
  square(x, y, sqSize);
}

function moveSquare() {
  x+= dx;
  y+= dy;
}

function bounceOff() {
// bounce off right wall
  if (x >= width - sqSize) {
    dx *= -1;
    sqColor = color(255, 0, 200);
    //don't get caught in wall
    x = width - sqSize - 1;
  } 
  // bounce off left wall
  else if (x <= 0) {
    dx *= -1;
    sqColor = color(200, 0, 250);
    x = 1;
  } 

  // y
  //bounce off bottom wall
  if (y >= height - sqSize) {
    dy *= -1;
    sqColor = color(255, 255, 0);
    y = height - sqSize - 1;
  } 

  // bounce off top wall
  if (y <= 0) {
    dy *= -1;
    sqColor = color(0, 255, 255);
    y = 1;
  } 
}

function mouseClicked() {
  if (dx === dx && dy === dy) {
    dx = random(4, 10);
    dy = random(4,10);
  }
}

function mouseWheel(event) {
  if (event.delta < 0) {
    if (sqSize < height *0.75 && 
        sqSize < width *0.75) {
      sqSize +=5;
    }
  }
  else {
    if (sqSize > 10) {
      sqSize -= 5;
    } 
  }
}

function handleKeys() {
  if (keyIsDown(13)) { 
    sqColor = random(100, 255);
  }
}