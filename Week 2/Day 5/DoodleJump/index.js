const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const platforms = [];

const ground = new Platform(
  0,
  canvas.height - GROUND_HEIGHT,
  canvas.width,
  GROUND_HEIGHT
);
const platform1 = new Platform(400, 300, PLATFORM_WIDTH, PLATFORM_HEIGHT);
const platform2 = new Platform(100, 200, PLATFORM_WIDTH, PLATFORM_HEIGHT);

platforms.push(ground, platform1, platform2);

const player = new Character(200, 0, CHARACTER_WIDTH, CHARACTER_HEIGHT);

let timer = 0;

function generatePlatform() {
  const x = getRandomNumber(CHARACTER_WIDTH, canvas.width);
  const y = getRandomNumber(CHARACTER_WIDTH, canvas.height);

  const platform = new Platform(x, y, PLATFORM_WIDTH, PLATFORM_HEIGHT);
  platforms.push(platform);
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  player.draw(ctx);
  platforms.forEach((platform) => platform.draw(ctx));

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
    player.x = canvas.width - player.width;
  } else if (player.x > canvas.width) {
    player.x = 0;
  }

  if (!player.isGrounded) {
    player.y += player.vy;
    player.vy += GRAVITY;
  }

  if (player.y + player.height > canvas.height) {
    player.y = canvas.height - player.height;
    player.isGrounded = true;
  }

  platforms.forEach((platform) => {
    if (collisionDetection(player, platform)) {
      player.y = platform.y - player.height;
      player.isGrounded = true;
    }
  });

  requestAnimationFrame(animate);
}

animate();
