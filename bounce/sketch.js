// Project Title


class Ball {
  constructor(x, y) {
    this.x = x; 
    this.y = y;
    this.radius = Math.floor(random(10, 50));
    this.dx = random(-5, 5),
    this.dy = random(-5, 5),
    this.theColor = color(random(20, 250), random(20, 250), random(20, 250), random(20, 250));
  } 

  move() {
    this.x += this.dx;
    this.y += this.dy;

    if (this.x + this.radius > width ||
      this.x - this.radius < 0) {
      this.dx *= -1;
      this.theColor = color(random(20, 250), random(20, 250), random(20, 250), random(20, 250));
    }

    //top-bottom edges
    if (this.y + this.radius > height || this.y - this.radius < 0) {
      this.dy *= -1;
      this.theColor = color(random(20, 250), random(20, 250), random(20, 250), random(20, 250));
    }
  }

  display() {
    fill(this.theColor);
    noStroke();
    circle(this.x, this.y, this.radius*2);
  }

  collision(other) {
    let distanceBetween = dist(this.x, this.y, other.x, other.y);
    let radiiSum = this.radius + other.radius;
    let new_color = color(random(220), random(220), random(220), random(220));
    let new2 = color(random(220), random(220), random(220), random(220));
    if (distanceBetween < radiiSum) {
      let tempDx = this.dx;
      let tempDy = this.dy;
      this.dx = other.dx;
      this.dy = other.dy;
      other.dx = tempDx;
      other.dy = tempDy;
      this.theColor = new_color;
      other.theColor = new2;
    }
  }
}

let theCircles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  let thisBall = new Ball(100, 100);
  theCircles.push(thisBall);
}

function draw() {
  background(0);

  for (let i = 0; i < theCircles.length; i ++) {
    theCircles[i].move();
    for (let j = 0; j < theCircles.length; j++) {
      if (j !== i){
        theCircles[i].collision(theCircles[j]);
      }
    }
    theCircles[i].display();
  }

  
}

function mousePressed() {
    let thisBall = new Ball(mouseX, mouseY);
    theCircles.push(thisBall);
}

function keyPressed() {
  if (keyCode === 32) {
    for (let i = 0; i < theCircles.length; i++) {
      console.log(theCircles[i].radius)
    }
  }
}