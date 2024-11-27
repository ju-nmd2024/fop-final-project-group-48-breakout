let orangeCat;
let pinkBowl;
let yellowBowl;
let greenBowl;
let orangeBowl;
let speachBubble;

function preload() {
  orangeCat = loadImage("orangeCat.png");
  pinkBowl = loadImage("pinkBowl.svg");
  yellowBowl = loadImage("yellowBowl.svg");
  greenBowl = loadImage("greenBowl.svg");
  orangeBowl = loadImage("orangeBowl.svg");
  speachBubble = loadImage("speachBubble.png");
}

function setup() {
  createCanvas(700, 400);
  noStroke();
}

x = 700;
y = 400;
//let state = "start";
const gridLength = 10;
const gridSize = 70;
let gameState = true;
let ballX = 350;
let ballY = 0;

function drawGrid() {
  push();
  stroke(166, 211, 216);
  noFill();
  for (let x = 0; x < gridLength; x++) {
    for (let y = 0; y < gridLength; y++) {
      rect(x * gridSize, y * gridSize, gridSize, gridSize);
    }
  }
  pop();
}

function backgroundScreen() {
  //floor brown
  fill(246, 198, 150);
  rect(x - 700, y - 10, 700, 10);
  rect(x - 700, y - 25, 700, 10);
  rect(x - 700, y - 40, 700, 10);
  rect(x - 700, y - 55, 700, 10);
  rect(x - 700, y - 70, 700, 10);
  rect(x - 700, y - 85, 700, 10);
  rect(x - 700, y - 100, 700, 10);

  //floor light brown
  fill(246, 206, 167);
  rect(x - 700, y - 15, 700, 5);
  rect(x - 700, y - 30, 700, 5);
  rect(x - 700, y - 45, 700, 5);
  rect(x - 700, y - 60, 700, 5);
  rect(x - 700, y - 75, 700, 5);
  rect(x - 700, y - 90, 700, 5);

  //wallpaper
  fill(255, 213, 213);
  rect(x - 700, y - 400, 700, 300);

  //board floor
  fill(250, 210, 170);
  rect(x - 700, y - 120, 700, 20);
  fill(255, 255, 255);
  rect(x - 700, y - 120, 700, 4);
  fill(240, 177, 104);
  rect(x - 700, y - 100, 700, 2);
}

class Bowl {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  draw() {
    image(
      this.x * gridSize,
      this.y * gridSize,
      this.width * gridSize,
      this.height * gridSize
    );
  }
}

//upper row
let pinkBowl1 = new Bowl(2, 1, 1, 1);
let greenBowl1 = new Bowl();
let yellowBowl1 = new Bowl();
let orangeBowl1 = new Bowl();
let pinkBowl2 = new Bowl(1, 1, 1, 1);
let greenBowl2 = new Bowl();
let yellowBowl2 = new Bowl();
let orangeBowl2 = new Bowl();
let pinkBowl3 = new Bowl(1, 1, 1, 1);
let greenBowl3 = new Bowl();

//lower row
let yellowBowl3 = new Bowl();
let orangeBowl3 = new Bowl();
let pinkBowl4 = new Bowl(1, 1, 1, 1);
let greenBowl4 = new Bowl();
let yellowBowl4 = new Bowl();
let orangeBowl4 = new Bowl();
let pinkBowl5 = new Bowl(1, 1, 1, 1);
let greenBowl5 = new Bowl();
let yellowBowl5 = new Bowl();
let orangeBowl5 = new Bowl();

function startScreen() {
  backgroundScreen();

  //cat and speach bubble
  image(orangeCat, x - 300, y - 340, 400, 400);
  image(speachBubble, x - 520, y - 340, 250, 180);

  //game name
  fill(0, 0, 0);
  textSize(40);
  textFont("Arial");
  text("Crazy Kitten", x - 660, y - 180, 0);

  //game instructions
  fill(0, 0, 0);
  textSize(10);
  textFont("Arial");
  text("Move the padle bla bla bla", x - 460, y - 300);

  //buttons
  push();
  strokeWeight(2);
  stroke(0, 0, 0);
  fill(0, 200, 0);

  rect(x - 450, y - 100, 200, 50, 20);
  pop();

  //button "play game"
  fill(0, 0, 0);
  textSize(20);
  textFont("Arial");
  text("Play game", x - 400, y - 70);
}

function ball() {
  fill(152, 204, 255);
  ellipse(x - 350, y - 100, 25);
}

function paddle() {
  fill(100);
  rect(x - 400, y - 15, 150, 15, 10);
}

function gameScreen() {
  backgroundScreen();
  drawGrid();

  image(orangeCat, x - 90, y - 100, 100, 100);
  image(speachBubble, x - 180, y - 100, 100, 50);
  image(pinkBowl, x - 710, y - 430, 100, 100);
  image(greenBowl, x - 650, y - 430, 100, 100);
  image(yellowBowl, x - 590, y - 430, 100, 100);
  image(orangeBowl, x - 520, y - 430, 100, 100);

  paddle();
  ball();
}

function draw() {
  gameScreen();
}
