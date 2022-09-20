// Chessboard
// Celia Newell
// September 19
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let i = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background("pink");
  chessboard();
}

function chessboard() {
  let sqW = width/8;
  let sqH = height/8;
  if (sqW > sqH) {
    sqW = sqH;
  }
  else {
    sqH = sqW;
  }

  let isWhite = true;
  let isBlack = false;
  for (let y = 0; y < 8; y++) {
    for (let x= 0; x < 8; x++) {
      if (isWhite) {
        fill("white");
      }
      else {
        fill("black");
      }
      rect(x * sqW, y * sqH, sqW , sqH);
      isWhite = !isWhite;
    }
    isWhite = !isWhite;
  }
}

function windowResized() {
  setup();
}
