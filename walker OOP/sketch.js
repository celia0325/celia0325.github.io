// Project Title

class Walker {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 5;
    this.color = "purple";
    this.radius = 2;
  }

  display() {
    stroke(this.color);
    fill(this.color);
    circle(this.x, this.y, this.radius*2);
  }

  move () {
    let choice = random(100);

    if (choice < 25) {
      this.y -= this.speed;
    }
    else if (choice < 50) {
      this.y += this.speed;
    }
    else if (choice < 75) {
      this.x += this.speed;
    }
    else {
      this.x -= this.speed;
    }
  }
}

let walkers = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  spawnWalker();
}

function draw() {
  for (let i = 0; i < walkers.length; i++) {
    walkers[i].display();
    walkers[i].move();
  }
}

function spawnWalker() {
  let cheeseburger = new Walker(random(width), random(height));
  let someColor = color(random(255), random(255), random(255), random(255));
  cheeseburger.color = someColor;
  walkers.push(cheeseburger);
}

function keyPressed () {
  spawnWalker();
}
