const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const CANVAS_HEIGHT = canvas.height;
const CANVAS_WIDTH = canvas.width;

let timer = 0;
let isGameOver = false;
let score = 0;

const groundY = CANVAS_HEIGHT - GROUND_HEIGHT - CHARACTER_HEIGHT;
const platformGap = groundY / PLATFORM_COUNT;

const platforms = [];
// creating a ground platform
const ground = new Platform(0, groundY, CANVAS_WIDTH, GROUND_HEIGHT);

platforms.push(ground);

// creating a player
const player = new Character(200, groundY, CHARACTER_WIDTH, CHARACTER_HEIGHT);

// Generate random gap between platforms
function getPlatformGap() {
  return platformGap + getRandomNumber(0, PLATFORM_GAP_VARIATION);
}

// Generate initial platform
function generateInitialPlatform(count) {
  const x = getRandomNumber(CHARACTER_WIDTH, CANVAS_WIDTH - PLATFORM_WIDTH);
  const y = groundY - count * getPlatformGap();

  const platform = new Platform(x, y, PLATFORM_WIDTH, PLATFORM_HEIGHT);
  platforms.push(platform);
}

// Generate new platform
function generatePlatform() {
  // remove first platform
  platforms.shift();
  score++;

  const x = getRandomNumber(CHARACTER_WIDTH, CANVAS_WIDTH - PLATFORM_WIDTH);
  const y = -(getPlatformGap() + PLATFORM_HEIGHT);

  const platform = new Platform(x, y, PLATFORM_WIDTH, PLATFORM_HEIGHT);
  platforms.push(platform);
}

for (let count = 1; count <= PLATFORM_COUNT; count++) {
  generateInitialPlatform(count);
}

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  if (isGameOver) {
    ctx.font = "30px Arial";
    ctx.fillText("Game Over", 100, 100);
    ctx.fillText(`Score: ${score}`, 100, 150);

    // Display clickable restart button
    ctx.fillStyle = "red";
    ctx.fillRect(100, 200, 100, 50);
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Restart", 120, 230);

    canvas.addEventListener("click", (event) => {
      const x = event.offsetX;
      const y = event.offsetY;
      if (x > 100 && x < 200 && y > 200 && y < 250) {
        window.location.reload();
      }
    });
    return;
  }

  player.draw(ctx);
  platforms.forEach((platform) => {
    platform.draw(ctx);
    platform.moveDown();
  });

  if (activeActions[ACTIONS.LEFT] || activeActions[ACTIONS.RIGHT]) {
    player.vx += activeActions[ACTIONS.LEFT] ? -SPEED : SPEED;
  } else {
    player.vx = 0;
  }

  player.x += player.vx;

  if (activeActions[ACTIONS.JUMP] && player.isGrounded) {
    player.isGrounded = false;
    player.vy = -JUMP_HEIGHT;
  }

  if (player.x + player.width < 0) {
    player.x = CANVAS_WIDTH - player.width;
  } else if (player.x > CANVAS_WIDTH) {
    player.x = 0;
  }

  if (!player.isGrounded) {
    player.y += player.vy;
    player.vy += GRAVITY;
  }

  if (player.y + player.height > CANVAS_HEIGHT) {
    isGameOver = true;
  }

  const platform = getCollidedPlatform(player, platforms);
  if (platform) {
    player.y = platform.y - player.height;
    player.isGrounded = true;
  } else {
    player.isGrounded = false;
  }

  timer++;

  if (timer % PLATFORM_DISAPPEARING_SPEED === 0) {
    generatePlatform();
    timer = 0;
  }

  requestAnimationFrame(animate);
}

animate();
