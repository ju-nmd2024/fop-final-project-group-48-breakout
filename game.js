let orangeCat;
let pinkBowl;
let yellowBowl;
let greenBowl;
let orangeBowl;
let speachBubble;

let bowls = [];
let COLUMNS = 10;
let ROWS = 2;

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
  reverseSpeachBubble = loadImage("reverseSpeachBubble.png");
  hypnoEyes = loadImage("hypnoEyes.png");
}

function setup() {
  createCanvas(700, 400);
  noStroke();

  x = 700;
  y = 400;

  catEyes = new CatEyes(350, 300); // Set initial position for the eyes

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

  // Initialize paddle and ball
  paddle = new Paddle();
  ball = new Ball();
}

let wallColor;
let paddle;
let ball;
angleMode(DEGREES);

class Bowl {
  constructor(x, y, width, height, img) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.img = img;
    this.hit = false; // Track if the bowl has been hit
  }

  draw() {
    if (!this.hit) {
      // Only draw if the bowl has not been hit
      image(this.img, this.x, this.y, this.width, this.height);
    }
  }
}

class Paddle {
  constructor() {
    this.x = 300;
    this.y = 385;
    this.width = 150;
    this.height = 15;
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

class Ball {
  constructor() {
    this.x = 350;
    this.y = 180;
    this.r = 20;
    this.speedX = random(3, 7); // Random horizontal speed (between 3 and 7)
    this.speedY = random(2, 5); // Random vertical speed (between 2 and 5)
  }

  move() {
    this.x += this.speedX;
    this.y += this.speedY;

    // Side walls
    if (this.x > width - this.r || this.x < this.r) {
      this.speedX = -this.speedX + random(-1, 1); // Add slight randomness to horizontal direction
    }

    // Ceiling
    if (this.y < this.r) {
      this.speedY = -this.speedY + random(-1, 1); // Add slight randomness to vertical direction
    }

    // Paddle collision
    if (
      this.y > paddle.y - this.r &&
      this.x > paddle.x &&
      this.x < paddle.x + paddle.width
    ) {
      this.speedY = -this.speedY + random(-1, 1); // Add slight randomness to vertical direction when bouncing off the paddle
    }

    // Ball out of bounds
    if (this.y > height) {
      state = "resultLost";
    }
  }

  draw() {
    fill(152, 204, 255);
    ellipse(this.x, this.y, this.r * 1.5, this.r * 1.5);
  }

  reset() {
    this.x = 350;
    this.y = 180;
    this.r = 20;
    this.speedX = random(3, 7); // Randomize horizontal speed when resetting the ball
    this.speedY = random(2, 5); // Randomize vertical speed when resetting the ball
  }
}

class CatEyes {
  constructor(x, y) {
    this.x = 700; // Receive x position for the eyes (use dynamic x position)
    this.y = 400; // Receive y position for the eyes (use dynamic y position)
    this.width = 50; // Define width for each eye image
    this.height = 50; // Define height for each eye image
    this.angle = 1; // Initial angle of rotation (start from 0)
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
    // Draw the first eye (left)
    push();
    translate(this.x - 140, this.y - 230); // Position of the first eye
    rotate(this.angle); // Apply rotation to the first eye
    image(
      hypnoEyes,
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height
    ); // Draw first eye centered
    pop();

    // Draw the second eye (right)
    push();
    translate(this.x - 75, this.y - 230); // Position of the second eye
    rotate(this.angle); // Apply the same rotation to the second eye
    image(
      hypnoEyes,
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height
    ); // Draw second eye centered
    pop();
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
  image(reverseSpeachBubble, x - 80, y - 70, 50, 35);

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

  //if you lose, the color of the wallpaper will change
  if (state === "resultLost") {
    wallColor = color(255, 102, 102);
  }
}

function winScreen() {
  backgroundScreen();

  // Cat and speach bubble
  image(orangeCat, x - 300, y - 340, 400, 400);
  image(speachBubble, x - 520, y - 340, 250, 180);

  // Game instructions
  fill(0, 0, 0);
  textSize(15);
  textAlign(CENTER);
  textFont("Arial");
  let wonText = "GOOD JOB!";
  text(wonText, x - 500, y - 295, 205, 300);

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

function checkBallCollisionWithBowl(ball, bowl) {
  // Check if the ball is colliding with the bowl
  if (
    ball.x > bowl.x &&
    ball.x < bowl.x + bowl.width &&
    ball.y - ball.r < bowl.y + bowl.height &&
    ball.y + ball.r > bowl.y
  ) {
    // Collision detected, return true
    return true;
  }
  return false;
}

function gameScreen() {
  backgroundScreen();

  // Cat and speech bubble
  image(orangeCat, x - 90, y - 100, 100, 100);
  image(speachBubble, x - 180, y - 100, 100, 50);

  let bowlsToRemove = []; // Array to collect bowls that need to be removed
  let bowlsRemaining = 0; // Count of remaining bowls

  // Draw bowls and check for collisions
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLUMNS; col++) {
      let bowl = bowls[row][col]; // Get the current bowl

      if (bowl) {
        // Make sure the bowl still exists (it could be removed)
        bowlsRemaining++; // Count remaining bowls
        bowls[row][col].draw(); // Draw each bowl

        // Check if the ball collides with the bowl
        if (checkBallCollisionWithBowl(ball, bowl)) {
          // If collision detected, mark this bowl for removal
          bowlsToRemove.push({ row, col });

          // Reverse the ball's Y-speed to make it bounce
          ball.speedY = -ball.speedY;
        }
      }
    }
  }

  // After checking all bowls, remove the ones marked for removal
  for (let i = 0; i < bowlsToRemove.length; i++) {
    let { row, col } = bowlsToRemove[i];
    bowls[row].splice(col, 1); // Remove bowl from the array
  }

  // Check if the player has won (all bowls are gone)
  if (bowlsRemaining === 0) {
    state = "resultWin"; // All bowls are gone, transition to win screen
    return; // Exit the game screen early to prevent further processing
  }

  // Continue with paddle and ball movement
  paddle.move();
  paddle.draw();
  ball.move();
  ball.draw();

  // Check if the ball falls out of bounds
  if (ball.y > height) {
    wallColor = color(255, 102, 102); // Set background to red
    state = "resultLost"; // Ball fell below the screen, you lost
  }
}

function reset() {
  ball.reset();
  paddle.x = 300;
  paddle.y = 385;

  // Reset bowls (unhit)
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLUMNS; col++) {
      bowls[row][col].hit = false; // Reset bowl hit state
    }
  }
}

function draw() {
  // Conditions for showing screens - linked to mouseClicked below
  if (state === "start") {
    startScreen();
    wallColor = color(255, 213, 213);
    catEyes.move(); // Update the position and angle of rotation
    catEyes.draw(); // Draw the eyes at the updated position and rotation
  } else if (state === "game") {
    gameScreen();
    catEyes.move(); // Update the position and angle of rotation
    catEyes.draw(); // Draw the eyes at the updated position and rotation
    wallColor = color(255, 213, 213);
  } else if (state === "resultLost") {
    lostScreen();
    reset();
  } else if (state === "resultWi") {
    winScreen();
    reset();
  }
}

// Switch between screens when buttons are clicked
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

//to do list

//Idea of the game
//The cat need help from you to destroy all the bowls. The cat will cheer you on
//while you play. If you win, the cat will thank you but if you lose - the cat will
//disapear and the angry human will show up will blame everything on you.
// * - a thought is that we can add eyes on the cat so it looks like it is hypnotized
//     and trying to control the behaviour of the human!

//start screen
//- decide and fix the game name
// - change the text?

//game screen
//- add hypnotizing eyes to the cat
//- when the ball hits a bowl - speach bubble will appear with a random text
//- fix the paddle so the ball doesn't get stuck on it (block the sides with x & y)

//win screen
//- change the text?
//- maybe add some fireworks?
