// grid demo

let grid = 
[[1,0,1,1,1,0,1,1], [1,0,1,0,1,0,1,1], [0,1,0,0,1,0,1,1], [0,1,0,0,1,0,1,1], 
];

let state = "start";

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  displayGrid(grid);
}

function displayGrid(grid) {
  let cellW = width / grid[0].length;
  let cellH = height / grid.length;

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (state === "start") {
        fill("black");
      }
      if (state === "game") {
        if (grid[y][x] === 0) {
          fill("violet");
        }
        else if (grid[y][x] === 1) {
          fill("magenta");
        }
      }
      rect(x*cellW, y*cellH, cellW, cellH);
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