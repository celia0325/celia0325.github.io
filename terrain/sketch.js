// Terrain Generator
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let theHeights = [];
let start = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  theHeights = generateHeights(20000);
}

function draw() {
  background(220);
  for (let i = start; i < start + width; i++) {
    fill("red");
    drawRect(i-start, theHeights[i], 1);
  }

  if (keyIsPressed) {
    start +=30;
  }
}

function drawRect(x, h, w) {
  let y = height - h;
  rect(x, y, w, h);
}

function generateHeights(amount) {
  let tempArray = [];
  let time = random(10000);
  for (let i = 0; i < amount; i++) {
    tempArray.push(noise(time) * height);
    time += 0.001;
  }
  return tempArray;
}