// Mastermind
// Celia
// Nov 1
//
// Extra for Experts:
// The amount of functions depending on each other to work made trouble shooting difficult but the end design very clean

// starting page
let state = "start";
let strtImg;
let strtImg2;
let img;

let startX;
let startY;
let startSize;


// game play & setup
let ROWS = 6;
let COLS = 4;
let grid;

let submit = ROWS-1; // starts as 1 less than ROWS decreases with every guess
let cnv;
let cellWidth;
let cellHeight;

let colorIn = ["black", "red", "orange", "yellow", "green", "blue", "purple", "violet", "white", "pink"]; 
let sequence = [];
let guessTracker;
let backColor = "grey";

let notExactlyImg;

function preload() {
  strtImg = loadImage("startButton.png");
  strtImg2 = loadImage("startButton2.png");
  notExactlyImg = loadImage("notexactly.png");
}

function setup() {
  width = 400;
  cnv = createCanvas(width, windowHeight);
  centerCanvas();

  cellWidth = width/COLS;
  cellHeight = height/ROWS;
  
  grid = create2dArray(COLS, ROWS);
  guessTracker = create2dArray(COLS, ROWS);
  createSequence();
}

function centerCanvas() {
  let w = (windowWidth - width) / 2;
  let h = windowHeight/100;
  cnv.position(w, h);
}

function draw() {
  background(backColor);
  if (state === "start") {
    startScreen();
  }
  if (state === "game") {
    displayGrid();
  }
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

// displays only after all is correct or on the final answer
function displaySequence() {
  
  let centreW = cellWidth/4;
  let centreH = cellHeight/4;
  
  for (let x = 0; x < COLS; x++) {
    fill(backColor);
    rect(x*cellWidth, 0, cellWidth, cellHeight);

    for (let filled = 0; filled < colorIn.length; filled++) {
      if (sequence[x] === filled) {
        fill(colorIn[filled]);
      }
      circle(x*cellWidth + centreW*2, centreH*2, centreW);  
    }
  }
}

function displayGrid() {
    let trueMatch = 0;
    for (let matches = 0; matches < COLS; matches++) {

      // checks if all the grid dots are the same as the sequence
    if (submit < ROWS-1 && sequence[matches] === guessTracker[submit+1][matches]) {
      trueMatch++;
    } 
        //makes sure every column has a colour match
      if (trueMatch === COLS) {
          backColor = "green";
          displaySequence();
        }
        // turns red and displays sequence if player is out of guesses
        if (trueMatch !== COLS && submit === 0) {
          backColor = "red";
          displaySequence();
        }
      }
      // sets up the grid
      let centreW = cellWidth/4;
      let centreH = cellHeight/4;
      for (let y = 1; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
          
          fill(backColor);
          strokeWeight(4);
          rect(x*cellWidth, y*cellHeight, cellWidth, cellHeight);

          // adds empty(black) guess boxes and the bottom of each larger box
          if (ROWS-1 === submit){
            fill(colorIn[0])
            rect(x*cellWidth,(y)*cellHeight+cellHeight*0.77, cellWidth, cellHeight*0.33);
          }

          // goes through to fill each circle with the right colour
          for (let filled = 0; filled < colorIn.length; filled++) {
            if (grid[y][x] === filled) {
              fill(colorIn[filled]);
            }

            // fills with black after displaying the last color
            else if (grid[y][x] >= colorIn.length) {
              grid[y][x] = 0;
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
function create2dArray() {
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
  for (let i = 1; i < ROWS; i ++) {
    for (let y = 0; y < COLS; y++) {
      for (let x = 1; x < ROWS+1; x++) {
        fill(colorIn[guessTracker[ROWS-i][y]]);
        rect(y*cellWidth,(ROWS-i)*cellHeight+cellHeight*0.77, cellWidth, cellHeight*0.22);

        // if the color is in the sequence but not the right spot a slash will go through the rectangle
        if (sequence.includes(guessTracker[ROWS-i][y])) {
          image(notExactlyImg, y*cellWidth,(ROWS-i)*cellHeight+cellHeight*0.77, cellWidth, cellHeight*0.22);
        }

        //replaces image filled box with solid box if the color is in the right spot
        if (sequence[y] === guessTracker[ROWS-i][y]) {
          rect(y*cellWidth,(ROWS-i)*cellHeight+cellHeight*0.77, cellWidth, cellHeight*0.22);
        }
      }
    }
  }
}

function mousePressed() {
  // if start button is selected the game will start
  if (state === "start" && mouseInButton(startX, startY, startSize, startSize*0.5)) {
    state = "game";
  } 
  
  if (state === "game"){
    let x = Math.floor(mouseX / cellWidth);
    // checks what number is at [x][y] and adds 1 so the colors shift through the ColorIn cycle
    for (let colorFind = 0; colorFind < colorIn.length; colorFind++) {
      if (grid[submit][x] === colorFind) {
        grid[submit][x] = colorFind+1;
        colorFind++;
      }
    }
  }
}

// says if inside start button
function mouseInButton(left, right, top, bottom) {
  return mouseX >= left && mouseX <= right/1.45 && mouseY >= top*2.65 && mouseY <= bottom*6.4;
}

function keyTyped() {
  if (key === " ") {
    submit --;

    //shows what colors are correct after submission
    for (let u = 0; u < COLS; u++) {
      // if colour is included / in the right spot it places the same number in the guess tracker
      if (grid[submit+1][u] === sequence[u]){
        guessTracker[submit+1][u] = sequence[u];
      }
      else if (sequence.includes(grid[submit+1][u])){
        guessTracker[submit+1][u] = grid[submit+1][u];
      }
      // places 0 in guess tracker if guess is wrong; meaning it will fill black
      else {
        guessTracker[submit+1][u] = 0;
      }
    }
  }
}

function startScreen() {
  // instructions & title page
  textFont("monospace");
  fill("black");
  textSize(50);
  strokeWeight(4);
  text("Mastermind", width/2, height/5);

  textSize(25);
  text("How To Play", width/2, height/2.3);

  textSize(15);
  textAlign(CENTER);
  text("Start at the bottom row and click your mouse to have the circles cycle throught the 9 colours. NOTICE: In every sequence ther will be no repeating colours. Press START to begin!", 15, height/2, width-15);

  for (let n = 1; n < colorIn.length; n++) {
    fill(colorIn[n]);
    circle(5+40*n, height/3.5, cellWidth/4);
  }
    startX = width/3.1;
    startY = height/1.4;
    startSize = 150;

    if (mouseInButton(startX, startY, startSize,startSize*0.5)) {
      img = strtImg2;
    }
    else {
      img = strtImg;
    }
      
  image(img, startX, startY, startSize,startSize*0.5);
}