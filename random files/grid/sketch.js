// randomized grid demo

let rows = 3;
let cols = 3;
let grid;
let cellWidth;
let cellHeight;

let cellSize;

let ground;
let img;
let groundBlocks = []

function preload() {
  ground = loadImage("ground.png")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  cellWidth = width/cols;
  cellHeight = height/rows;
  grid = createRandom2dArray(cols, rows);
}

function draw() {
  background(220);
  displayGrid(grid);
  drawBlocks();
}

function displayGrid(grid) {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (grid[y][x] === 2) {
        drawBlocks();
      }
      else if (grid[y][x] === 1) {
        //fill("violet");
      }
      rect(x*cellWidth, y*cellHeight, cellWidth, cellHeight);
    }
  }
}

function create2dArray(cols, rows) {
  let emptyArray = [];
  for (let y = 0; y < rows; y ++) {
    emptyArray.push([]);
    for (let x=0; x<cols; x++) {
      emptyArray[y].push(0);
    }
  }
  return emptyArray;
}

function createRandom2dArray(cols, rows) {
  let emptyArray = [];
  for (let y = 0; y < rows; y++) {
    emptyArray.push([]);
    for (let x = 0; x < cols; x++) {
      if (random(100) < 50) {
        emptyArray[y].push(0);
      }
      else {
        emptyArray[y].push(1);
      }
    }
  }
  return emptyArray;
}

function mousePressed() {
  let x = Math.floor(mouseX / cellWidth);
  let y = Math.floor(mouseY / cellHeight);

  if (grid[y][x] === 1) {
    grid[y][x] = 0;
    makeBlock(grid[y][x], 1);
  }
  else if (grid[y][x] === 0) {
    grid[y][x] = 1;
  }
}

function makeBlock(xPlace, levY) {
    let block = {
      x : (xPlace*cellSize-cellSize/2)+ cellSize,
      y :  height-levY*cellSize+35,
      size : 40,
    }
    groundBlocks.push(block);
  }

function drawBlocks() { 
  for (let block of groundBlocks) {
    image(ground, block.x, block.y, 50, 50);
  }
}