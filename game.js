let orangeCat;
let pinkBowl;
let yellowBowl;
let greenBowl;
let orangeBowl;
let speachBubble;

// Paddle var/const
const paddleMove = 5;
let paddleX = 300;
let paddleY = 385;

// Ball variables
let ballX = 350;
let ballY = 180;
let r = 20;
let speedX = 5;
let speedY = 2;

let bowls = [];
let COLUMNS = 10;
let ROWS = 2;

// To make game begin at startScreen
let state = "start";

// Load pre-made images into code
function preload() {
  angryPerson = loadImage("angryPerson.png");
  orangeCat = loadImage("orangeCat.png");
  pinkBowl = loadImage("pinkBowl.png");
  yellowBowl = loadImage("yellowBowl.png");
  greenBowl = loadImage("greenBowl.png");
  orangeBowl = loadImage("orangeBowl.png");
  speachBubble = loadImage("speachBubble.png");
}

function setup() {
  createCanvas(700, 400);
  noStroke();

  x = 700;
  y = 400;

  // Create bowls and store them in a 2D array
  let bowlWidth = 60.5; // Width of each bowl
  let bowlHeight = 39; // Height of each bowl
  let margin = 10; // Space between bowls

  // Loop through rows and columns to create bowls
  for (let row = 0; row < ROWS; row++) {
    bowls[row] = []; // Initialize the row in the 2D array
    for (let col = 0; col < COLUMNS; col++) {
      let x = col * (bowlWidth + margin) + 1; // Horizontal spacing
      let y = row * (bowlHeight + margin) + 10; // Vertical spacing

      let bowlImage;
      // Alternate between different bowl colors
      if (col % 4 === 0) bowlImage = pinkBowl;
      else if (col % 4 === 1) bowlImage = greenBowl;
      else if (col % 4 === 2) bowlImage = yellowBowl;
      else bowlImage = orangeBowl;

      bowls[row][col] = new Bowl(x, y, bowlWidth, bowlHeight, bowlImage);
    }
  }

  wallColor = color(255, 213, 213);
}

let wallColor;

class Bowl {
  constructor(x, y, width, height, img) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.img = img;
  }

  draw() {
    image(this.img, this.x, this.y, this.width, this.height);
  }
}

function backgroundScreen() {
  // Floor brown
  fill(246, 198, 150);
  rect(x - 700, y - 10, 700, 10);
  rect(x - 700, y - 25, 700, 10);
  rect(x - 700, y - 40, 700, 10);
  rect(x - 700, y - 55, 700, 10);
  rect(x - 700, y - 70, 700, 10);
  rect(x - 700, y - 85, 700, 10);
  rect(x - 700, y - 100, 700, 10);

  // Floor light brown
  fill(246, 206, 167);
  rect(x - 700, y - 15, 700, 5);
  rect(x - 700, y - 30, 700, 5);
  rect(x - 700, y - 45, 700, 5);
  rect(x - 700, y - 60, 700, 5);
  rect(x - 700, y - 75, 700, 5);
  rect(x - 700, y - 90, 700, 5);

  // Wallpaper
  fill(wallColor);
  rect(x - 700, y - 400, 700, 300);

  // Board floor
  fill(250, 210, 170);
  rect(x - 700, y - 120, 700, 20);
  fill(255, 255, 255);
  rect(x - 700, y - 120, 700, 4);
  fill(240, 177, 104);
  rect(x - 700, y - 100, 700, 2);
}

function startScreen() {
  backgroundScreen();

  // Cat and speach bubble
  image(orangeCat, x - 300, y - 340, 400, 400);
  image(speachBubble, x - 520, y - 340, 250, 180);

  // Hypnotizing eyes

  // Game instructions
  fill(0, 0, 0);
  textSize(14.5);
  textAlign(CENTER);
  textFont("Arial");
  let gameInstructions =
    "You are under my control now! You will help me to crash all the bowls. Move the paddle with the right and left arrow keys. If you fail, my human will be maaaaad...at you!";
  text(gameInstructions, x - 495, y - 311, 205, 300);

  // Game name
  fill(0, 0, 0);
  textSize(40);
  textFont("Arial");
  text("HypnoPaws", x - 550, y - 170, 0);

  // Buttons
  push();
  strokeWeight(2);
  stroke(0, 0, 0);
  fill(204, 255, 204);

  rect(x - 450, y - 100, 200, 50, 20);
  pop();

  // Button "play game"
  fill(0, 0, 0);
  textSize(20);
  textFont("Arial");
  text("Play game", x - 350, y - 70);
}

function lostScreen() {
  backgroundScreen();

  // Cat and speach bubble
  image(orangeCat, x - 130, y - 50, 50, 50);
  image(angryPerson, x - 400, y - 340, 400, 400);
  image(speachBubble, x - 550, y - 340, 250, 180);

  // Game instructions
  fill(0, 0, 0);
  textSize(15);
  textAlign(CENTER);
  textFont("Arial");
  let lostText =
    "WHAT ARE YOU GOING!!! How dare you blame my kitten for this, this is all your fault!";
  text(lostText, x - 525, y - 295, 205, 300);

  // Buttons
  push();
  strokeWeight(2);
  stroke(0, 0, 0);
  fill(204, 255, 204);

  rect(x - 550, y - 100, 200, 50, 20);
  pop();

  // Button "Try again"
  fill(0, 0, 0);
  textSize(20);
  textFont("Arial");
  text("Try again", x - 450, y - 70);

  //if you lose, the color of the wallpaper will change
  if (state === "resultLost") {
    wallColor = color(255, 102, 102);
  }
}

function ball() {
  fill(152, 204, 255);
  ellipse(ballX, ballY, r * 1.5, r * 1.5);
}

function paddle() {
  fill(100);
  rect(paddleX, paddleY, 150, 15, 10);
}

function gameScreen() {
  backgroundScreen();

  // Cat and speech bubble
  image(orangeCat, x - 90, y - 100, 100, 100);
  image(speachBubble, x - 180, y - 100, 100, 50);

  // Draw bowls
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLUMNS; col++) {
      bowls[row][col].draw(); // Draw each bowl
    }
  }

  paddle();
  ball();

  // Condition for loose screen shown
  if (ballY > 400) {
    state = "resultLost";
  }
}

// Checks if ball hit the bowl and gives a value to be used in another function to make the bowl disappear
function detectBowl() {
  if (ballY < bowlY - r && ballX > bowlX && ballX < bowlX + "width of bowl") {
    //"command here to give us a value that can be used in another command to make the bricks disappear"
  }
}

// To reset ball and paddle to start position after each game
function reset() {
  ballX = 350;
  ballY = 180;
  r = 20;
  paddleX = 300;
  paddleY = 385;
  speedX = 5;
  speedY = 2;
}

function draw() {
  // Paddle movement inspired by Garrit's emoji example https://pixelkind.github.io/foundationsofprogramming/programming/12-02-exercise
  if (keyIsDown(37)) {
    paddleX = paddleX - paddleMove;
  } else if (keyIsDown(39)) {
    paddleX = paddleX + paddleMove;
  }
  // Ball movement inspired by https://editor.p5js.org/icm/sketches/BJKWv5Tn
  ballX += speedX;
  ballY += speedY;
  //Side walls blockade
  if (ballX > 700 - r || ballX < 0 + r) {
    speedX = -speedX;
  }
  // Ceiling blockade (for now until we finish bowls)
  if (ballY < 0 + r) {
    speedY = -speedY;
  }
  // Paddle blockade at floor side
  if (ballY > paddleY - r && ballX > paddleX && ballX < paddleX + 150) {
    speedY = -speedY;
  }

  // Conditions for showing screens - linked to mouseClicked below
  if (state === "start") {
    startScreen();
    wallColor = color(255, 213, 213);
  } else if (state === "game") {
    gameScreen();
    wallColor = color(255, 213, 213);
  } else if (state === "resultLost") {
    lostScreen();
    reset();
  } else if (state === "resultWin") {
    winScreen();
    reset();
  }
}

// Switch between screens when buttons are clicked/
function mouseClicked() {
  if (
    state === "start" &&
    mouseX >= 250 &&
    mouseX <= 450 &&
    mouseY >= 300 &&
    mouseY <= 350
  ) {
    state = "game";
  } else if (
    (state === "resultWin" &&
      mouseX >= 300 &&
      mouseX <= 400 &&
      mouseY >= 210 &&
      mouseY <= 260) ||
    (state === "resultLost" &&
      mouseX >= 155 &&
      mouseX <= 350 &&
      mouseY >= 300 &&
      mouseY <= 350)
  ) {
    state = "start";
  }
}

//to do list

//Idea of the game
//The cat need help from you to destroy all the bowls. The cat will cheer you on
//while you play. If you win, the cat will thank you but if you lose - the cat will
//disapear and the angry human will show up will blame everything on you.
// * - a thought is that we can add eyes on the cat so it looks like it is hypnotized
//     and trying to control the behaviour of the human!

//start screen
//- make the button interactive (move a bit to the left?)
//- write instructions in the speach bubble
//- decide name
//- make the button interactive

//game screen
//- the the bowls interactive
//- make the paddle stop at x (0 & 700)
//- make ball stop at y = 400
//- when the ball hits a bowl - speach bubble will appear with random text

//win screen
//- create a "play again" button and make it interactive
//- change the text in the speach bubble
//- maybe add some fireworks?

//lose screen
//- create a "play again" button and make it interactive
//- change the text in the speach bubble
//- change the cat to a human?

//Game states
//fix mouseClicked (start --> game)(game --> win)(game --> lose)
