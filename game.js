function setup() {
  createCanvas(700, 400);
  noStroke();
}

x = 700;
y = 400;
//let state = "start";
let gameState = true;
let ballX = 350;
let ballY = 0;

function startScreen() {
  //stroke
  push();
  strokeWeight(15);
  stroke(0);
  line(x - 200, y - 350, x + 50, y + 250);
  pop();

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
}

function ball() {
  fill(255, 0, 0);
  ellipse(x, y, 25);
}

function preload() {
  img1 = loadImage("images/1998592.png");
}

function gameScreenOrangeCat() {
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
  fill(183, 250, 195);
  rect(x - 700, y - 400, 700, 300);

  //board floor
  fill(250, 210, 170);
  rect(x - 700, y - 120, 700, 20);
  fill(255, 255, 255);
  rect(x - 700, y - 120, 700, 5);
  fill(240, 177, 104);
  rect(x - 700, y - 100, 700, 2);

  //cat body
  fill(255, 153, 51);
  ellipse(x - 350, y - 50, 60, 60);
  ellipse(x - 350, y - 5, 70, 60);

  //cat tail and paws

  //cat ears
}

function gameScreenBlackCat() {}

function draw() {
  gameScreenOrangeCat();
  image(img1, 0, 0, 400, 200);
}
