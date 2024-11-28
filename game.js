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
let ballY = 200;
let r = 20;
let speedX = 5;
let speedY = 2;

let bowls = [];
let COLUMNS = 10;
let ROWS = 3;

function preload() {
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
}

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
}

function draw() {
  startScreen();

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
  //Ceiling blockade (for now until we finish bowls)
  if (ballY < 0 + r) {
    speedY = -speedY;
  }
  //Paddle blockade at floor side
  if (ballY > paddleY - r && ballX > paddleX && ballX < paddleX + 150) {
    speedY = -speedY;
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
