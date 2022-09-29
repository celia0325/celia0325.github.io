// Shooter Game
// Celia Newell
// September 19
//
// Extra for Experts:
// created arrays, used array functions and array for loops


let bullets = [];
let enemies = [];
let enemySize = 20;
let score = 0;
let lives = 3;

let circleSize = 50;
let circleSpeed = 7;
let x = circleSize;
let y = height - circleSize;

function setup() {
  createCanvas(600, windowHeight);
  createEnemies();
}

function draw() {
  background(0);
  rectMode(CENTER);
  
  // draws player
  drawCircle();

  // controls player movement
  handleKeys();
  
  // draws bullet
  for (let bullet of bullets) {
    bullet.y -= 5;
    fill("red");
    circle(bullet.x, bullet.y, circleSize/5);
  }

  // draw enemies
  for (let enemy of enemies) {
    enemy.y += 2;
    fill("white");
    rect(enemy.x, enemy.y, enemySize);
    
    // if 3 enemies pass player; player loses
    if (enemy.y > height) {
      enemies.splice(enemies.indexOf(enemy), 1);
      lives -= 1;
      if (lives === 0) {
        textSize(40);
        text("You Lose!", width/3, height/2);
        noLoop();
      }
    }
  }

  // makes enemies and bullet disappear after they've collided 
  for (let enemy of enemies) {
    for(let bullet of bullets) {
      if (dist(enemy.x, enemy.y, bullet.x, bullet.y) < 20) {
        enemies.splice(enemies.indexOf(enemy), 1);
        bullets.splice(bullets.indexOf(bullet), 1);
        spawnEnemies();
        // adds to score
        score += 1;    
      }
    }
  }

  // score and number of lives on screen
  textSize(20);
  text("Score:", 15, 35);
  text(score, 80, 35);
  text("Lives:", 515, 35);
  text(lives, 580, 35);
}


function drawCircle() {
  //creates player
  fill("violet");
  noStroke();
  circle(x, height - circleSize, circleSize);
}

function createEnemies() {
  // repeats creation of enemies
  for(let i = 0; i < 5; i += 1) {
    spawnEnemies();
  }
}

function spawnEnemies() {
  // creates and places enemies
  let enemy = {
    x: random(enemySize, width - enemySize),
    y: random(-2*height, 0),
  };
  enemies.push(enemy);
}

function handleKeys() {
  // player moves to the right when right arrow is down
  if (keyIsDown(39)&& x < width - circleSize/2) { 
    x += circleSpeed;
  }
  // player moves to the left when left arrow is down
  if (keyIsDown(37)&& x > 0 + circleSize/2) { 
    x -= circleSpeed;
  }
}

function keyTyped() {
  // lets player shoot
  if (key === "a") { 
    let bullet = {
      x : x+1,
      y : height - 1.5*circleSize
    };
    bullets.push(bullet);
  }
}