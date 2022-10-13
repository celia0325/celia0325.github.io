// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let state = "start";
let startBlueImg;
let strtImg;
let img;

let l = 300;
let r = 300;
let t = 200;
let b = 100;

function preload() {
  startBlueImg = loadImage("startblue.png");
  strtImg = loadImage("start.png");
  flowerImg = loadImage("flowers.jpg")
}

function setup() {
  cnv = createCanvas(600, windowHeight);
  centerCanvas();
  imageMode(CENTER);
}

function centerCanvas() {
  let w = (windowWidth - width) / 2;
  let h = windowHeight/100 - 10;
  cnv.position(w, h);
}

function draw() {
  background("black");
  if (state === "start") {
    startScreen();
  }
  if (state === "game") {
    image(flowerImg, 0, 0, width, height);
  }
}

function mousePressed() {
  if (state === "start" && mouseInsideRect(l, l+r, t, b+r)) {
    state = "game";
  } 
}

function startScreen() {
  if (mouseInsideRect(l, l+r, t, b+r)) {
    img = startBlueImg;
  }
  else {
    img = strtImg;
  }
  image(img, l, r, t, b);
}

function mouseInsideRect(left, right, top, bottom) {
  return mouseX >= left - l/3 && mouseX <= right - r/1.5 && mouseY >= top + t/6 && mouseY <= bottom - b/2;
}