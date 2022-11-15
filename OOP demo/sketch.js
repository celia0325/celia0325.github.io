// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

class Dog {
  constructor(name) {
    this.name = name;
    this.age = 0;
  }

  bark() {
    console.log("Woof! says " + this.name);
  }

}

let myDog = new Dog("Alonso");
let yourDog = new Dog("Dave");

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
}
