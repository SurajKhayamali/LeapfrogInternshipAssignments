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

// Initialization
const quadtree = new Quadtree({
  x: 0,
  y: 0,
  width: VIEWPORT_WIDTH,
  height: VIEWPORT_HEIGHT,
});

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

  // Insert objects into Quadtree when created
  quadtree.insert(ball);
}

// Render balls in viewport
function render() {
  // Clear the Quadtree to prepare for reinsertion of updated objects
  quadtree.clear();

  // Reinsert the updated objects into the Quadtree
  for (const ball of ballsArray) {
    ball.move(); // Update ball positions
    ball.draw(); // Render ball in viewport
    ball.checkWallCollision(
      getViewPortStartX(ball.r),
      getViewPortStartY(ball.r),
      VIEWPORT_WIDTH,
      VIEWPORT_HEIGHT
    ); // Check for wall collision

    quadtree.insert(ball); // Reinsert the updated ball into the Quadtree
  }

  // Perform Collision Detection using the updated Quadtree
  for (const ball of ballsArray) {
    // Retrieve potential collisions based on spatial partitioning technique
    const nearbyBalls = quadtree.retrieve(ball);

    // Perform collision checks only between nearbyBalls
    for (const otherBall of nearbyBalls) {
      if (ball !== otherBall) {
        ball.checkBallCollision(otherBall);
      }
    }
  }

  requestAnimationFrame(render);
}

requestAnimationFrame(render);
