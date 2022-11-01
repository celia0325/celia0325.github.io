// guess the sequence
// Celia
// nov 1
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let ROWS = 8;
let COLS = 6;
let grid;

let cellWidth;
let cellHeight;
let cnv;
let newWidth;
let colorIn = ["black", "green", "blue", "red", "orange", "pink"]; 

function setup() {
  newWidth = windowHeight*0.85;
  cnv = createCanvas(newWidth, windowHeight);
  centerCanvas();
  cellWidth = width/COLS;
  cellHeight = height/ROWS;
  grid = create2dArray(COLS, ROWS);
}

function centerCanvas() {
  let w = (windowWidth - width) / 2;
  let h = windowHeight/100;
  cnv.position(w, h);
}

function draw() {
  background("grey");
  displayGrid(grid);
}

function displayGrid(grid) {
  let centreW = cellWidth/4;
  let centreH = cellHeight/4;
  
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      fill("grey");
      strokeWeight(4);
      rect(x*cellWidth, y*cellHeight, cellWidth, cellHeight);

      for (let f = 0; f < colorIn.length; f++) {
        if (grid[y][x] === f) {
          fill(colorIn[f]);
        }
      }
      circle(x*cellWidth + centreW*2, y*cellHeight + centreH*2, centreW);
    }
  }
}

function create2dArray(COLS, ROWS) {
  let emptyArray = [];
  for (let y = 0; y < ROWS; y ++) {
    emptyArray.push([]);
    for (let x = 0; x < COLS; x ++) {
      emptyArray[y].push(0);
    }
  }
  return emptyArray;
}

function mousePressed() {
  let x = Math.floor(mouseX / cellWidth);
  let y = Math.floor(mouseY / cellHeight);

  // checks what number is at [x][y] and adds 1 so the colors shift
  for (let colorFind = 0; colorFind < colorIn.length; colorFind++) {
    if (grid[y][x] === colorFind) {
      grid[y][x] = colorFind+1;
      colorFind++;
      
      if (colorFind > colorIn.length) {
        colorFind = 0;
      }
    }
  }
}