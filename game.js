let orangeCat;
let pinkBowl;
let yellowBowl;
let greenBowl;
let orangeBowl;
let speechBubble;

let bowls = [];
let COLUMNS = 10;
let ROWS = 2;

let state = "resultLost";

let wallColor;
//angleMode(DEGREES);
x = 700;
y = 400;

// Create bowls and store them in a 2D array
let bowlWidth = 60.5;
let bowlHeight = 39;
let margin = 10;

function preload() {
  angryPerson = loadImage("angryPerson.png");
  orangeCat = loadImage("orangeCat.png");
  pinkBowl = loadImage("pinkBowl.png");
  yellowBowl = loadImage("yellowBowl.png");
  greenBowl = loadImage("greenBowl.png");
  orangeBowl = loadImage("orangeBowl.png");
  speechBubble = loadImage("speechBubble.png");
  reverseSpeechBubble = loadImage("reverseSpeechBubble.png");
  hypnoEyes = loadImage("hypnoEyes.png");
  hypnoPaws = loadImage("hypnoPaws.png");
}

function setup() {
  createCanvas(700, 400);
  frameRate(30);
  noStroke();
  wallColor = color(255, 213, 213);
}

class Bowl {
  constructor(x, y, width, height, img) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.img = img;
    this.hit = false; // Track if the bowl has been hit
  }

  // ChatGPT, screenshots are available
  // Only draw if the bowl has not been hit
  draw() {
    if (!this.hit) {
      image(this.img, this.x, this.y, this.width, this.height);
    }
  }
}

class Paddle {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = 8;
  }

  move() {
    if (keyIsDown(37)) {
      // Left arrow key
      this.x = max(this.x - this.speed, 0);
    } else if (keyIsDown(39)) {
      // Right arrow key
      this.x = min(this.x + this.speed, width - this.width);
    }
  }

  draw() {
    fill(100);
    rect(this.x, this.y, this.width, this.height, 10);
  }
}

let paddle = new Paddle(x - 400, y - 15, 150, 15);

class Ball {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = 10;
    this.speedX = 4;
    this.speedY = 3;
  }

  move() {
    this.x += this.speedX;
    this.y += this.speedY;

    // Side walls
    if (this.x > width - this.r || this.x < this.r) {
      this.speedX = -this.speedX;
    }

    // Ceiling
    if (this.y < this.r) {
      this.speedY = -this.speedY;
    }

    // Paddle collision
    if (
      this.y > paddle.y - this.r &&
      this.x > paddle.x &&
      this.x < paddle.x + paddle.width
    ) {
      this.speedY = -this.speedY;
    }

    // Ball out of bounds
    if (this.y > height) {
      state = "resultLost";
    }
  }

  draw() {
    fill(152, 204, 255);
    ellipse(this.x, this.y, this.r * 1.5);
  }

  reset() {
    this.x = 350;
    this.y = 180;
    this.r = 20;
    this.speedX = 4;
    this.speedY = 3;
  }
}

let ball = new Ball(x - 350, y - 520, 20);

class CatEye {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.angle = 0; // Initial angle of rotation (start from 0)
    this.speed = 10; // Initial speed of rotation
  }

  move() {
    // Increment the angle to rotate the eyes
    this.angle += 1 * this.speed; // Rotate 1 degree per frame
    if (this.angle >= 360) {
      this.angle = 0; // Reset angle after a full rotation
    }
  }

  draw() {
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    image(
      hypnoEyes,
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height
    ); // Draw first eye centered
    pop();
  }
}

// Position for the eyes
let catEye1 = new CatEye(x - 145, y - 220, 50, 50);
let catEye2 = new CatEye(x - 70, y - 220, 50, 50);
let catEye3 = new CatEye(x - 52, y - 72, 15, 15);
let catEye4 = new CatEye(x - 32, y - 72, 15, 15);

class SpeechBubble {
  constructor(img, x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  draw() {
    image(speechBubble, this.x, this.y, this.width, this.height);
  }
}

let speechBubbleStart = new SpeechBubble(
  speechBubble,
  x - 540,
  y - 330,
  300,
  160
);
let speechBubbleWin = new SpeechBubble(
  speechBubble,
  x - 560,
  y - 330,
  300,
  160
);
let speechBubbleLost = new SpeechBubble(
  speechBubble,
  x - 550,
  y - 330,
  250,
  160
);

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

  speechBubbleStart.draw();

  image(hypnoPaws, x - 650, y - 185, 250, 100);

  image(orangeCat, x - 300, y - 340, 400, 400);

  catEye1.move(); // Update the position and angle of rotation
  catEye1.draw(); // Draw the eyes at the updated position and rotation
  catEye2.move(); // Update the position and angle of rotation
  catEye2.draw(); // Draw the eyes at the updated position and rotation

  // Game instructions
  fill(0, 0, 0);
  textSize(14.5);
  textAlign(CENTER);
  textFont("Arial");
  let gameInstructions =
    "You are under my control now! You will help me to crash all the bowls. Move the paddle with the right and left arrow keys. If you fail, my human will be maaaaad...at you!";
  text(gameInstructions, x - 495, y - 311, 205, 300);

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
  wallColor = color(255, 102, 102);
  backgroundScreen();

  // Speech bubble
  image(orangeCat, x - 130, y - 50, 50, 50);
  image(angryPerson, x - 400, y - 340, 400, 400);
  image(reverseSpeechBubble, x - 80, y - 70, 50, 35);

  speechBubbleLost.draw();

  // Angry person talking
  fill(0, 0, 0);
  textSize(15);
  textAlign(CENTER);
  textFont("Arial");
  let lostText =
    "WHAT ARE YOU DOING!!! How dare you blame my kitten for this, this is all your fault!";
  text(lostText, x - 525, y - 295, 205, 300);

  // Kitten laughing
  fill(0, 0, 0);
  textSize(10);
  textAlign(CENTER);
  textFont("Arial");
  let catText = "HAHA!";
  text(catText, x - 65, y - 60, 20, 30);

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
}

function winScreen() {
  backgroundScreen();

  // Cat and speech bubble
  image(orangeCat, x - 300, y - 340, 400, 400);
  speechBubbleWin.draw();

  // Cat talk
  fill(0, 0, 0);
  textSize(15);
  textAlign(CENTER);
  textFont("Arial");
  let wonText =
    "MEOW! You did good! I'm proud of you but I guess my human isn't. But she may not notice that all the bowls are crashed - she got more! ";
  text(wonText, x - 520, y - 300, 220, 300);

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
}

function gameScreen() {
  backgroundScreen();

  image(orangeCat, x - 90, y - 100, 100, 100);

  catEye3.move();
  catEye3.draw();
  catEye4.move();
  catEye4.draw();

  paddle.move();
  paddle.draw();

  ball.move();
  ball.draw();

  //ChatGPT, we have screenshots of the conversation
  let allBowlsHit = true;

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLUMNS; col++) {
      let bowl = bowls[row][col];
      bowl.draw();

      // Check for collision
      if (
        !bowl.hit &&
        dist(
          ball.x,
          ball.y,
          bowl.x + bowl.width / 2,
          bowl.y + bowl.height / 2
        ) <
          ball.r + bowl.width / 2
      ) {
        bowl.hit = true; // Mark bowl as hit
        ball.speedY = -ball.speedY; // Bounce the ball
      }

      // Check if all bowls are hit
      if (!bowl.hit) {
        allBowlsHit = false;
      }
    }
  }
  // Check win condition
  if (allBowlsHit) {
    state = "resultWin";
  }
}

function reset() {
  ball.reset();
  paddle.x = 300;
  paddle.y = 385;

  //ChatGPT, did not save the link because I wasn't logged in

  // Loop through rows and columns to create bowls
  for (let row = 0; row < ROWS; row++) {
    bowls[row] = []; // Initialize the row in the 2D array
    for (let col = 0; col < COLUMNS; col++) {
      let x = col * (bowlWidth + margin) + 1; // Horizontal spacing
      let y = row * (bowlHeight + margin) + 10; // Vertical spacing

      // Alternate between different bowl colors
      if (col % 4 === 0) bowlImage = pinkBowl;
      else if (col % 4 === 1) bowlImage = greenBowl;
      else if (col % 4 === 2) bowlImage = yellowBowl;
      else bowlImage = orangeBowl;

      bowls[row][col] = new Bowl(x, y, bowlWidth, bowlHeight, bowlImage);
      //bowls[row][col].draw();
    }
  }
}

function draw() {
  // Conditions for showing screens - linked to mouseClicked below
  if (state === "start") {
    startScreen();
    reset();
    wallColor = color(255, 213, 213);
  } else if (state === "game") {
    gameScreen();
    //wallColor = color(255, 213, 213);
  } else if (state === "resultLost") {
    lostScreen();
  } else if (state === "resultWin") {
    winScreen();
  }
}

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
    state === "resultWin" &&
    mouseX >= 155 &&
    mouseX <= 350 &&
    mouseY >= 300 &&
    mouseY <= 350
  ) {
    state = "start";
  } else if (
    state === "resultLost" &&
    mouseX >= 155 &&
    mouseX <= 350 &&
    mouseY >= 300 &&
    mouseY <= 350
  ) {
    state = "start";
  }
}
