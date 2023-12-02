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

function getViewPortStartX(radius) {
  return radius;
}
function getViewPortStartY(radius) {
  return radius;
}
function getViewPortUsableWidth(radius) {
  return VIEWPORT_WIDTH - radius;
}
function getViewPortUsableHeight(radius) {
  return VIEWPORT_HEIGHT - radius;
}

const ballsArray = [];

// Create balls, store in an array and render in viewport
for (let i = 0; i < BALL_COUNT; i++) {
  const r = getRandomNumber(
    Math.min(MIN_BALL_RADIUS, MAX_BALL_RADIUS),
    MAX_BALL_RADIUS
  );
  const x = getRandomNumber(getViewPortStartX(r), getViewPortUsableWidth(r));
  const y = getRandomNumber(getViewPortStartY(r), getViewPortUsableHeight(r));
  const xSpeed = getRandomNumberOtherThan(-BALL_SPEED, BALL_SPEED);
  const ySpeed = getRandomNumberOtherThan(-BALL_SPEED, BALL_SPEED);
  const ball = new Ball(x, y, r, xSpeed, ySpeed);

  ballsArray.push(ball);
  viewport.appendChild(ball.getElement());
}

// Render balls in viewport
function render() {
  for (let i = 0; i < ballsArray.length; i++) {
    const ball = ballsArray[i];
    ball.move();
    ball.draw();
    ball.checkWallCollision(
      getViewPortStartX(ball.r),
      getViewPortStartY(ball.r),
      VIEWPORT_WIDTH,
      VIEWPORT_HEIGHT
    );

    for (let j = i + 1; j < ballsArray.length; j++) {
      const otherBall = ballsArray[j];
      ball.checkBallCollision(otherBall);
    }
  }

  requestAnimationFrame(render);
}

requestAnimationFrame(render);
