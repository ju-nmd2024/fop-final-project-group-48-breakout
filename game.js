function setup() {
  createCanvas(800, 600);
  noStroke();
}

x = 350;
y = 250;
let state = "start";
let gameState = true;
let ballX = 350;
let ballY = 0;

function background() {
  push();
  strokeWeight(15);
  stroke(0);
  line(x - 200, y - 350, x + 50, y + 250);
  pop();
}

function startScreen() {
  background();

  //game name
  fill(0, 0, 0);
  textSize(40);
  textFont("Arial");
  text("Crazy Kitten", x - 280, y - 100, 0);

  //game instructions
  fill(0, 0, 0);
  textSize(10);
  textFont("Arial");
  text("Instructions", x - 280, y + 50);

  //buttons
  push();
  strokeWeight(2);
  stroke(0, 0, 0);
  fill(0, 200, 0);

  rect(x + 40, y - 80, 200, 50, 20);
  pop();

  //button "play game"
  fill(0, 0, 0);
  textSize(20);
  textFont("Arial");
  text("Play game", x + 100, y - 50);

  function ball() {
    fill(255, 0, 0);
    ellipse(x, y, 25);
  }

  //bouncing ball
  ball(ballX - 170, ballY);

  if (gameState === true) {
    ballY = ballY + 4;

    if (ballY > 650) ballY = -100;
  }
}

function gameScreenOrangeCat() {}

function gameScreenBlackCat() {}

function draw() {
  background(255, 140, 0);

  if (state === "start") {
    startScreen();
  } else if (state === "game") {
    gameScreen();
  } else if (state === "lost") {
    deadScreen();
  } else if (state === "win") {
    wonScreen();
  }
}
