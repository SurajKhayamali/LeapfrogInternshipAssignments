const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// let x1 = 0;
// let x2 = 0;
// let speed = 5;

// const STARTING_X = 200;
// const STARTING_Y = 200;

const CHARACTER_HEIGHT = 50;

const platforms = [];

const ground = new Platform(0, canvas.height - 10, canvas.width, 10);
const platform = new Platform(200, 300, 200, 10);
platforms.push(ground, platform);
const player = new Character(
  canvas.width / 2,
  canvas.height - CHARACTER_HEIGHT,
  CHARACTER_HEIGHT,
  50
);

function generatePlatform() {
  const x = getRandomNumber(0, canvas.width - 100);
  const y = getRandomNumber(0, canvas.height - 100);

  const platform = new Platform(x, y, 100, 10);
  platforms.push(platform);
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //   ctx.fillStyle = "#49c";
  ground.draw(ctx);
  platform.draw(ctx);
  player.draw(ctx);

  //   if (keys.w) player.y -= SPEED;
  //   if (keys.s) player.y += SPEED;
  //   if (keys.a) player.x -= SPEED;
  //   if (keys.d) player.x += SPEED;

  //   console.log(keys);
  if (activeActions[ACTIONS.LEFT] || activeActions[ACTIONS.RIGHT]) {
    player.vx += activeActions[ACTIONS.LEFT] ? -SPEED : SPEED;
  } else {
    player.vx = 0;
  }
  //   if (activeActions[ACTIONS.UP] || activeActions[ACTIONS.DOWN]) {
  //     player.vy += activeActions[ACTIONS.UP] ? -SPEED : SPEED;
  //   } else {
  //     player.vy = 0;
  //   }

  console.log(player.isGrounded);

  if (activeActions[ACTIONS.JUMP] && player.isGrounded) {
    player.isGrounded = false;
    player.vy = -JUMP_SPEED;
  }

  if (!player.isGrounded) {
    player.vy += GRAVITY;
  }

  player.y += player.vy;
  player.x += player.vx;

  // if (player.y + player.height > canvas.height) {
  // }

  if (player.y + player.height > canvas.height) {
    player.y = canvas.height - player.height;
    // player.vy = 0;
  }

  platforms.forEach((platform) => {
    if (collisionDetection(player, platform)) {
      player.y = platform.y - player.height;
      player.vy = 0;
      player.isGrounded = true;
    }
  });

  //   ctx.moveTo(100, 100);
  //   ctx.lineTo(canvas.width, canvas.height);
  //   ctx.strokeStyle = "#292";

  //   ctx.fillStyle = "#000";
  //   ctx.fillRect(x1, 100, 100, 100);
  //   x1 += speed;

  //   ctx.fillStyle = "#49c";
  //   ctx.fillRect(x2, 300, 100, 100);
  //   x2 += speed;

  //   ctx.fillStyle = "#a22";
  //   ctx.arc(400, 400, 50, 0, Math.PI * 2);
  //   ctx.fill();

  requestAnimationFrame(animate);
}

animate();
