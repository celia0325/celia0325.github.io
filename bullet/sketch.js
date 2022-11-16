// Project Title

class Bullet {
  constructor() {
    this.x = width/6 + 50;
    this.y = height/3 + 50;
    this.dx = 5;
    this.theColor = "purple";
  }

  move() {
    this.x += this.dx;
  }

  display() {
    fill(this.theColor);
    rect(this.x, this.y, 2, 10);
  }

  onScreen() {
    for (let i = 0; i < bullets.length; i++) {
      return this.x[i] >= 700;
    }
  }
}


let bullets = [];

function setup() {
  createCanvas(700, 500);
}

function draw() {
  background(0);
  displayShooter();

  for (let i = 0; i < bullets.length; i++) {
    bullets[i].move();
    if (bullets[i].isDead()) {
      bullets.splice(i, 1);
    }
    else {
      bullets[i].display();
    }
  }

}

function mousePressed() {
  let aBullet = new Bullet;
  Bullet.push(aBullet);
}

function displayShooter() {
  fill("green");
  rect(width/6, height/3, 100, 200);
}
