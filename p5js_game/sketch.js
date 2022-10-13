// Alien Invasion
// Celia Newell
// September 19
//
// Extra for Experts:
// created arrays, used array functions and arrays in for loops

// starting page
let state = "start";
let strtBlueImg;
let strtImg;
let img;

let l = 300;
let r = 300;
let t = 200;
let b = 100;

// game play
let bullets = [];
let enemies = [];

let enemySize = 20;

let playerImage;
let alienImage;
let laserImage;
let explosionImage;

let cnv;

let score = 0;
let lives = 3;

let playerSize = 50;
let playerSpeed = 7;
let x = playerSize;

function preload() {
  strtBlueImg = loadImage("startblue.png");
  strtImg = loadImage("start.png");

  alienImage = loadImage("ufo.png");
  playerImage = loadImage("player.png");
  laserImage = loadImage("laser.png");
  explosionImage = loadImage("explosion.png");
}

function setup() {
  cnv = createCanvas(600, windowHeight);
  centerCanvas();
  imageMode(CENTER);
  createEnemies();
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
  background(10, 10, 50);
  if (state === "start") {
    startScreen();
  }
  if (state === "game") {
    gamePlay();
    
  }
}


function startScreen() {
  // instructions & title page
  textFont("monospace");
  fill(color(0,255,100));
  textSize(40);
  text("Alien Invasion", width/4, height/5)
  fill("white");
  textSize(20);
  text("Use the arrow keys to move from left to right!", width/10.5, height/1.3);
  text("Use space keys to shoot the aliens!", width/5.5, height/1.4);
  
  if (mouseInButton(l, l+r, t, b+r)) {
    // start button becomes blue when hovered over
    img = strtBlueImg;
  }
  else {
    img = strtImg;
  }
  image(img, l, r, t, b);
}

function mousePressed() {
  if (state === "start" && mouseInButton(l, l+r, t, b+r)) {
    state = "game";
  } 
}

// says if inside start button
function mouseInButton(left, right, top, bottom) {
  return mouseX >= left - l/3 && mouseX <= right - r/1.5 && mouseY >= top + t/6 && mouseY <= bottom - b/2;
}

function gamePlay() {
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
    
  // doesn't spawn enemies until player is moved
  if(x !== playerSize ){
    // draw enemies
    for (let enemy of enemies) {
      // enemy speed depends on height (slower when shorter screen and faster when taller)
      enemy.y += height/225;
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
    }

      // makes enemies and bullets disappear after they've collided 
    for (let enemy of enemies) {
      for(let bullet of bullets) {
          if (dist(enemy.x, enemy.y, bullet.x, bullet.y) < 30) {
            enemies.splice(enemies.indexOf(enemy), 1);
            bullets.splice(bullets.indexOf(bullet), 1);
            
            // creates an explosion in place of enemy
            image(explosionImage, enemy.x,enemy.y, 110,90);
            spawnEnemies();
            
            // adds 10 to score
            score += 10;    
        }
      }
    }
  }
      
  // shows score and number of lives on screen
  textSize(20);
  fill(255);
  text("Score:", 15, 35);
  text(score, 80, 35);
  text("Lives:", width - 85, 35);
  text(lives, width-20, 35);
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

function keyTyped() {
  // lets player shoot when space is pressed
  if (key === " ") { 
    let bullet = {
      x : x+1,
      y : height - 1.5*playerSize
    }
    bullets.push(bullet);
  }
}

// spawns enemies in groups of 3
function createEnemies() {
  for(let spawns = 0; spawns < 3; spawns += 1) {
    spawnEnemies();
  }
}

// places enemies above screen
function spawnEnemies() {
  // creates and places enemies
  let enemy = {
    x: random(enemySize, width - enemySize),
    y: random(-1.1*height, 0),
  };
  enemies.push(enemy);
}