// Balls will be rendered in this dom element
let viewport;
try {
  viewport = document.getElementById("viewport");

  if (!viewport) throw new Error("Viewport not found");
} catch (e) {
  console.error(e);
  // viewport = document.body;
  viewport = document.createElement("div");
  viewport.id = "viewport";
  viewport.classList.add("viewport");
  document.body.appendChild(viewport);
}

const VIEWPORT_WIDTH = viewport.clientWidth;
const VIEWPORT_HEIGHT = viewport.clientHeight;
const VIEWPORT_START_X = viewport.offsetLeft + MAX_BALL_RADIUS;
const VIEWPORT_START_Y = viewport.offsetTop + MAX_BALL_RADIUS;
const VIEWPORT_USABLE_WIDTH = VIEWPORT_WIDTH - MAX_BALL_WIDTH;
const VIEWPORT_USABLE_HEIGHT = VIEWPORT_HEIGHT - MAX_BALL_WIDTH;

const ballsArray = [];

// Create balls, store in an array and render in viewport
for (let i = 0; i < BALL_COUNT; i++) {
  const x = getRandomNumber(VIEWPORT_START_X, VIEWPORT_USABLE_WIDTH);
  const y = getRandomNumber(VIEWPORT_START_Y, VIEWPORT_USABLE_HEIGHT);
  const r = getRandomNumber(
    Math.min(MIN_BALL_RADIUS, MAX_BALL_RADIUS),
    MAX_BALL_RADIUS
  );
  const xSpeed = getRandomNumberOtherThan(-BALL_SPEED, BALL_SPEED);
  const ySpeed = getRandomNumberOtherThan(-BALL_SPEED, BALL_SPEED);
  const ball = new Ball(x, y, r, xSpeed, ySpeed);

  ballsArray.push(ball);
  viewport.appendChild(ball.getElement());
}

// const ball = new Ball(0, 0, 20, 0, 0);

// ballsArray.push(ball);
// viewport.appendChild(ball.getElement());

// Render balls in viewport
function render() {
  for (const ball of ballsArray) {
    ball.move();
    ball.draw();
    ball.checkWallCollision(
      VIEWPORT_START_X,
      VIEWPORT_START_X,
      VIEWPORT_WIDTH,
      VIEWPORT_HEIGHT
    );

    for (const otherBall of ballsArray) {
      if (ball === otherBall) continue;

      ball.checkBallCollision(otherBall);
    }
  }

  requestAnimationFrame(render);
}

requestAnimationFrame(render);
