// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


// randomized grid demo

let rows = 3;
let cols = 3;
let grid;

let cellWidth;
let cellHeight;
let cnv;
let newWidth;

let img;
let xImg;
let oImg;
let boxImg;
let gridImg;

let turn = "o"; // 0 = start, 1 = x, 2 = o

function preload() {
  xImg = loadImage("xImage.png");
  oImg = loadImage("oImage.png");
  boxImg = loadImage("blackBox.png");
  gridImg = loadImage("grid.png");
}

function setup() {
  newWidth = windowHeight*0.85;
  cnv = createCanvas(newWidth, windowHeight);
  centerCanvas();
  cellWidth = width/cols;
  cellHeight = height/rows;
  grid = create2dArray(cols, rows);
}

function centerCanvas() {
  let w = (windowWidth - width) / 2;
  let h = windowHeight/100;
  cnv.position(w, h);
}

// updates canvas if window is resized
function windowResized() {
  centerCanvas();
  resizeCanvas(newWidth, windowHeight);
}
function draw() {
  background("black");
  image(gridImg, 0,0,width, height);
  displayGrid(grid);
}

function displayGrid(grid) {
  let centreW = cellWidth/2;
  let centreH = cellHeight/2;
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (grid[y][x] === 0) {
        img = boxImg;
      }
      else if (grid[y][x] === 1) {
        img = xImg;
      }
      else if (grid[y][x] === 2) {
        img = oImg;
      }
      image(img, x*cellWidth + centreW/2, y*cellHeight + centreH/2, centreW, centreH);
    }
  }
}

function create2dArray(cols, rows) {
  let emptyArray = [];
  for (let y = 0; y < rows; y ++) {
    emptyArray.push([]);
    for (let x = 0; x < cols; x ++) {
      emptyArray[y].push(0);
    }
  }
  return emptyArray;
}

function mousePressed() {
  let x = Math.floor(mouseX / cellWidth);
  let y = Math.floor(mouseY / cellHeight);

  if (grid[y][x] === 0 && turn === "x") {
    grid[y][x] = 1;
    turn = "o";
  }
  else if (grid[y][x] === 0 && turn === "o") {
    grid[y][x] = 2;
    turn = "x";
  }
 
}