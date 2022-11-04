// guess the sequence
// Celia
// nov 1
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let ROWS = 6;
let COLS = 6;
let grid;

let submit = ROWS-1;

let cellWidth;
let cellHeight;
let cnv;
let newWidth;

let colorIn = ["black", "green", "blue", "red", "orange", "pink"]; 
let sequence = [];
let num;
let finds;

function setup() {
  newWidth = windowHeight*0.85;
  cnv = createCanvas(newWidth, windowHeight);
  centerCanvas();
  cellWidth = width/COLS;
  cellHeight = height/ROWS;
  grid = create2dArray(COLS, ROWS);
  finds = create2dArray(COLS, ROWS)
  createSequence();
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

function createSequence() {
  for (let n = 0; n < colorIn.length; n++) {
    sequence.push(n);
  }
  for (let i = colorIn.length - 1; i > 0; i--) {
    // Generate random number
    let j = Math.floor(Math.random() * colorIn.length);
                         
    let temp = sequence[i];
    sequence[i] = sequence[j];
    sequence[j] = temp;
    
    //makes sure no circles are left black
    if (sequence.includes(0)) {
      num = sequence.lastIndexOf(0);
      sequence[num] = sequence[i];
    }
  }
}

function displaySequence() {
  let centreW = cellWidth/4;
  let centreH = cellHeight/4;
  
  for (let x = 0; x < COLS; x++) {
    fill("grey");
    strokeWeight(4);
    rect(x*cellWidth, 0, cellWidth, cellHeight);

    for (let filled = 0; filled < colorIn.length; filled++) {
      if (sequence[x] === filled) {
        fill(colorIn[filled]);
      }
      circle(x*cellWidth + centreW*2, centreH*2, centreW);  
    }
  }
}


function displayGrid(grid) {
  let centreW = cellWidth/4;
  let centreH = cellHeight/4;
  
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      fill("grey");
      strokeWeight(4);
      rect(x*cellWidth, y*cellHeight, cellWidth, cellHeight);

      for (let filled = 0; filled < colorIn.length; filled++) {
        if (grid[y][x] === filled) {
          fill(colorIn[filled]);
        }
        if (grid[y][x] === 6) {
          grid[y][x] = 0;
        }
      }
      circle(x*cellWidth + centreW*2, y*cellHeight + centreH*2, centreW);
     
    }
  }
  if (submit < ROWS-1) {
    displayGuess();
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

function displayGuess() {
  for (let x = 0; x < COLS; x++) {
    for (let y = 1; y < ROWS; y++) {
      strokeWeight(4);
      fill(colorIn[finds[(ROWS-1)+y][x]]);
      rect(x*cellWidth, (submit+y)*cellHeight+cellHeight*0.66, cellWidth, cellHeight*0.33);
    }
  }
}

function mousePressed() {
  let x = Math.floor(mouseX / cellWidth);
  let y = Math.floor(mouseY / cellHeight);

  // checks what number is at [x][y] and adds 1 so the colors shift
  for (let colorFind = 0; colorFind < colorIn.length; colorFind++) {
    if (grid[submit][x] === colorFind) {
      grid[submit][x] = colorFind+1;
      colorFind++;
    }
  }
}

function keyTyped() {
  if (key === " ") {
    submit --;
    for (let u = 0; u < colorIn.length; u++) {
      if (grid[submit+1][u] === sequence[u]){
        finds[submit+1][u] = (sequence[u]);
      }
      else {
        finds[submit+1][u] = 0;
      }
    }
  }
}