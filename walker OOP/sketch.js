// Project Title

class Walker {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 10;
    this.color = "purple";
    this.radius = 5;
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

let cheeseburger;
let hamburger;
let fry;
let rootbeer;

function setup() {
  createCanvas(windowWidth, windowHeight);
  cheeseburger = new Walker(width/2, height/2 );
  hamburger = new Walker(200, 300);
  hamburger.color = "violet";
  fry = new Walker(width-100, height-100);
  fry.color = "green";
  rootbeer = new Walker (100, height-100);
  rootbeer.color = "brown";
}

function draw() {
  cheeseburger.display();
  hamburger.display();
  fry.display();
  rootbeer.display();

  cheeseburger.move();
  hamburger.move();
  fry.move();
  rootbeer.move();
}
