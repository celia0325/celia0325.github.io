// Shooter Game
// Celia Newell
// September 19
//
// Extra for Experts:
// created arrays, used array functions and array for loops


let bullets = [];
let enemies = [];

let enemySize = 20;

let playerImage;
let alienImage;
let laserImage;
let explosionImage;
let strtImage;

let cnv;

let score = 0;
let lives = 3;
let i = 500;

let playerSize = 50;
let playerSpeed = 7;
let x = playerSize;
let y = height - playerSize;

// starting page
let state = "start";
let startX = 300;
let startY = 400;
let startW = 300;
let startH = 150;

function setup() {
  cnv = createCanvas(600, windowHeight);
  centerCanvas();
  imageMode(CENTER);
  createEnemies();
}

function preload() {
  alienImage = loadImage("ufo.png");
  playerImage = loadImage("player.png");
  laserImage = loadImage("laser.png");
  explosionImage = loadImage("explosion.png");
  strtImage = loadImage("start.png");
}

function centerCanvas() {
  let w = (windowWidth - width) / 2;
  let h = windowHeight/100 - 10;
  cnv.position(w, h);
}

function windowResized() {
  centerCanvas();
  resizeCanvas(600, windowHeight);
}

function draw() {
  if (state === "start") {
    startScreen();
  }
  if (state === "game") {
    image(playerImage);
  }
    background(10, 10, 50);
    rectMode(CENTER);
    
    // draws player
    image(playerImage, x, height - playerSize, playerSize, 100);

    // controls player movement
    handleKeys();
    
    // draws bullet
    for (let bullet of bullets) {
      bullet.y -= 5;
      image(laserImage, bullet.x, bullet.y, 10, 20);
    }

    // draw enemies
    for (let enemy of enemies) {
      enemy.y += 3;
      image(alienImage, enemy.x, enemy.y, 110, 90, enemySize);
      
      // if 3 enemies pass player; player loses
      if (enemy.y > height) {
        enemies.splice(enemies.indexOf(enemy), 1);
        lives -= 1;
        if (lives === 0) {
          textSize(30);
          text("Oh No! The aliens invaded!", width/5, height/2);
          noLoop();
        }
      }

      // makes enemies and bullet disappear after they've collided 
      for (let enemy of enemies) {
        for(let bullet of bullets) {
          if (dist(enemy.x, enemy.y, bullet.x, bullet.y) < 30) {
            enemies.splice(enemies.indexOf(enemy), 1);
            bullets.splice(bullets.indexOf(bullet), 1);
            image(explosionImage, enemy.x,enemy.y, 110,90);

            spawnEnemies();
            // adds to score
            score += 10;    
          }
        }
      }
      
      // score and number of lives on screen
      textSize(20);
      fill(255);
      text("Score:", 15, 35);
      text(score, 80, 35);
      text("Lives:", width - 85, 35);
      text(lives, width-20, 35);
    }
  }
}

function mousePressed() {
  if (state === "start" && mouseInsideRect(startX, startY*2, 400, 550)) {
    state = "game";
  }
}
function handleKeys() {
  // player moves to the right when right arrow is down
  if (keyIsDown(39)&& x < width - playerSize/2) { 
    x += playerSpeed;
  }
  // player moves to the left when left arrow is down
  if (keyIsDown(37)&& x > 0 + playerSize/2) { 
    x -= playerSpeed;
  }
}

function startScreen() {
  if (mouseInsideRect(startX, startY*2, 400, 550)) {
    startW = 400;
    startH = 200;
  }
  else {
    startW = 300;
    startH = 150;
  }
  image(strtImage, startX, startY, startW, startH);
}


function mouseInsideRect(left, right, top, bottom) {
  return mouseX >= left && mouseX <= right && mouseY >= top && mouseY <= bottom;
}

function createEnemies() {
  for(let spawns = 0; spawns < 5; spawns += 1) {
    spawnEnemies();
  }
}

function spawnEnemies() {
  // creates and places enemies
  let enemy = {
    x: random(enemySize, width - enemySize),
    y: random(-1.1*height, 0),
  };
  enemies.push(enemy);
}
