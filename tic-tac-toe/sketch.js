// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let grid = 
[[0,1,1], [1,0,1], [0,1,0,], 
];

let state = "start";

let xImg;
let oImg;
let img;

let cnv;

function preload() {
  xImg = loadImage("xImage.png");
  oImg = loadImage("oImage.png");
}

function setup() {
  cnv = createCanvas(800, 700);
  centerCanvas();
  
}

function centerCanvas() {
  let w = (windowWidth - width) / 2;
  let h = windowHeight/100 - 10;
  cnv.position(w, h);
}

function draw() {
  background(0);
  displayGrid(grid);
}

function displayGrid(grid) {
  let cellW = width / grid[0].length;
  let cellH = height / grid.length;

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === 0) {
        img = xImg;
      }
      else if (grid[y][x] === 1) {
        img = oImg;
      }
      image(img, x*cellW + 50, y*cellH+ 50, cellW/2, cellH/2);
    }
  }
}


function mousePressed() {
  state = "game";
  let cellW = width / grid[0].length;
  let cellH = height / grid.length;

  let x = Math.floor(mouseX/cellW);
  let y = Math.floor(mouseY/cellH);

  if (grid[y][x] === 1) {
    grid[y][x] = 0;
  }
  else if (grid[y][x] === 0) {
    grid[y][x] = 1;
  }
}