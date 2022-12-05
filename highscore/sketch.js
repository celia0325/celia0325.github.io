// Highscore

let score = 0;
let highscore = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  if (getItem("highscore") !== null) {
    highscore = getItem("highscore");
  }
  else {
    storeItem("highscore", 0);
  }
}

function draw() {
  background(0);

  textSize(200);
  fill("white");
  text(score, width/1.95, height/2);
  textSize(20);
  fill("violet");
  text("Highscore: " + highscore, width/2, height/8);
}

function mousePressed() {
  score++;

  if (score > getItem("highscore")) {
    storeItem("highscore", score);
    highscore = score;
  }
}
