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

const ballsArray = [];

// Create balls, store in an array and render in viewport
for (let i = 0; i < BALL_COUNT; i++) {
  const x = getRandomNumber(0, VIEWPORT_WIDTH - BALL_WIDTH);
  const y = getRandomNumber(0, VIEWPORT_HEIGHT - BALL_WIDTH);
  const r = getRandomNumber(Math.min(5, BALL_RADIUS), BALL_RADIUS);
  const ball = new Ball(x, y, r);
  ballsArray.push(ball);
  viewport.appendChild(ball.getElement());
}

// Render balls in viewport
function render() {
  for (const ball of ballsArray) {
    ball.move();
    ball.draw();

    ball.checkWallCollision(0, 0, VIEWPORT_WIDTH, VIEWPORT_HEIGHT);

    for (const otherBall of ballsArray) {
      if (ball === otherBall) continue;
      ball.checkBallCollision(otherBall);
    }
  }
  requestAnimationFrame(render);
}

requestAnimationFrame(render);
