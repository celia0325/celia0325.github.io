// guess the sequence
// Celia
// nov 1
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let ROWS = 6;
let COLS = 4;
let grid;

let submit = ROWS-1;
let cnv;
let cellWidth;
let cellHeight;

let colorIn = ["black", "red", "orange", "yellow", "green", "blue", "purple", "pink", "white", "violet"]; 
let sequence = [];
let num;
let finds;

let guessHistory;
let guessCount = 1;

let doDisplay = true;
let notExactlyImg;

let backColr = "grey";

function preload() {
  notExactlyImg = loadImage("notexactly.png");
}

function setup() {
  width = windowHeight*0.65;
  cnv = createCanvas(width, windowHeight);
  centerCanvas();

  cellWidth = width/COLS;
  cellHeight = height/ROWS;
  
  grid = create2dArray(COLS, ROWS);
  finds = create2dArray(COLS, ROWS);
  guessHistory = create2dArray(COLS, ROWS);
  createSequence();
}

function centerCanvas() {
  let w = (windowWidth - width) / 2;
  let h = windowHeight/100;
  cnv.position(w, h);
}

function draw() {
  displayGrid(grid);
  displaySequence();
}

function createSequence() {
  for (let n = 1; n < colorIn.length; n++) {
    sequence.push(n);
  }
  for (let i = colorIn.length-2; i > 0; i--) {
    // Generate random number between 0 and whatever the last index of colour
    let j = Math.floor(Math.random() * (i+1));
    
                         
    let temp = sequence[i];
    sequence[i] = sequence[j];
    sequence[j] = temp;
  } 

  for (let a = 1; a < colorIn.length-COLS; a++) {
    sequence.pop();
  }

}

// ** color version displays after final answer
function displaySequence() {
  let centreW = cellWidth/4;
  let centreH = cellHeight/4;
  
  for (let x = 0; x < COLS; x++) {
    fill(backColr);
    strokeWeight(4);
    rect(x*cellWidth, 0, cellWidth, cellHeight);

    if (doDisplay === true) {
      for (let filled = 0; filled < colorIn.length; filled++) {
        if (sequence[x] === filled) {
          fill(colorIn[filled]);
        }
        circle(x*cellWidth + centreW*2, centreH*2, centreW);  
      }
    }
  }
}

function displayGrid(grid) {
  let trueMatch = 0;
  for (let matches = 0; matches < COLS; matches++) {

    // checks if all the grid dots are the same as the sequence
    if (submit < ROWS-1 && sequence[matches] === finds[submit+1][matches]) {
      trueMatch++;
      

      //makes sure every column has a colour match
      if (trueMatch === ROWS) {
        backColr = "green";
        displaySequence();
      }

      if (trueMatch !== COLS && submit === 0) {
        backColr = "red";
        displaySequence();
      }
    }
    // sets up the grid
    let centreW = cellWidth/4;
    let centreH = cellHeight/4;
    for (let y = 0; y < ROWS; y++) {
      for (let x = 0; x < COLS; x++) {
        fill(backColr);
        strokeWeight(4);
        rect(x*cellWidth, y*cellHeight, cellWidth, cellHeight);

        for (let filled = 0; filled < colorIn.length; filled++) {
          if (grid[y][x] === filled) {
            fill(colorIn[filled]);
          }
          if (grid[y][x] >= colorIn.length) {
            grid[y][x] = 0;
          }
        }
        circle(x*cellWidth + centreW*2, y*cellHeight + centreH*2, centreW);
      }
    }
  }
  // only happens if user has hit submit at least once
  if (submit < ROWS-1) {
    displayGuess();
  }
}

// creates 2d arrays to be filled by other variables
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

// shows which colours are in the right spots
function displayGuess() {
  for (let y = 1; y < ROWS+1; y++) {
    for (let x = 0; x < COLS; x++) {
      strokeWeight(4);
      
      fill(colorIn[finds[submit+1][x]]);
       rect(x*cellWidth,(submit+1)*cellHeight+cellHeight*0.66, cellWidth, cellHeight*0.33);


      if (sequence[x] === finds[submit+1][x]) {
        x = x;
      }

      else if (sequence.includes(finds[submit+1][x])) {
        image(notExactlyImg, x*cellWidth ,(1+submit)*cellHeight+cellHeight*0.66, cellWidth, cellHeight*0.33);
      }
    }
  }  
}

function mousePressed() {
  let x = Math.floor(mouseX / cellWidth);
  let y = Math.floor(mouseY / cellHeight);

  // checks what number is at [x][y] and adds 1 so the colors shift through the cycle
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

    //shows what colors are correct after submission
    for (let u = 0; u < COLS; u++) {

      if (grid[submit+1][u] === sequence[u]){
        finds[submit+1][u] = sequence[u];
      }
      else if (sequence.includes(grid[submit+1][u])){
        finds[submit+1][u] = grid[submit+1][u];
       
      }
      else {
        finds[submit+1][u] = 0;
      }
      
    }
  }
}