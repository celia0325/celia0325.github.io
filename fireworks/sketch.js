// fireworks

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dx = random(-5, 5);
    this.dy = random(-5, 5);
    this. di = 5;
    this.r = random(255);
    this.g = random(255);
    this.b = random(255);
    this.alpha = 255;
    this.color = color(this.r, this.g, this.b, this.alpha);
  }

  update() {
    this.x += this.dx;
    this.y += this.dy;
    this.alpha --;
    this.color = color(this.r, this.g, this.b, this.alpha);
  }

  display() {
    fill(this.color);
    stroke(this.color);
    circle(this.x, this.y, this.di);
  }

  isDead() {
    return this.alpha <= 0;
  }
}

let fireworks = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  for (let i = 0; i < fireworks.length; i++) {
    fireworks[i].update();
    if (fireworks[i].isDead()) {
      fireworks.splice(i, 1);
    }
    else {
      fireworks[i].display();
    }
  }
}

function mousePressed() {
  for (let i = 0; i < 100; i++){
    let thisParticle =  new Particle(mouseX, mouseY);
    fireworks.push(thisParticle);
  }
}
