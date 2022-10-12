// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let state = "start";
let flowerImg;
let strtImg;
let startX = 300;
let startY = 400;
let startW = 300;
let startH = 150;

function preload() {
  flowerImg = loadImage("flowers.jpg");
  strtImg = loadImage("start.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background("black");
  if (state === "start") {
    startScreen();
  }
  if (state === "main") {
    image(flowerImg, 0, 0, width, height);
  }
}

function mousePressed() {
  if (state === "start" && mouseInsideRect(startX, startY*2, 400, 550)) {
    state = "main";
  } 
}

function startScreen() {
  if (mouseInsideRect(startX, startY*2, 400, 550)) {
    startW = 400;
    startH = 200;
  }
  else {
    startW = 300;
    startH = 150;
  }
  image(strtImg, startX, startY, startW, startH);
}
function mouseInsideRect(left, right, top, bottom) {
  return mouseX >= left && mouseX <= right &&
         mouseY >= top && mouseY <= bottom;
}
