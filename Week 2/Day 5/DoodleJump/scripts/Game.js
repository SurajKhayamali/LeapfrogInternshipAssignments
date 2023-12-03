class Game {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.timer = 0;
    this.score = 0;
    this.isGameOver = false;

    this.groundY = this.height - GROUND_HEIGHT - CHARACTER_HEIGHT;
    this.platformGap = this.groundY / PLATFORM_COUNT;

    this.platforms = [];

    this.image = new Image();
    this.image.src = "./images/doodlejumpbg.png";

    this.init();
  }

  init() {
    // creating a ground platform
    const ground = new Platform(0, this.groundY, this.width, GROUND_HEIGHT);

    this.platforms.push(ground);

    // Generate initial platforms
    for (let count = 1; count <= PLATFORM_COUNT; count++) {
      this.generateInitialPlatform(count);
    }

    // creating a player
    this.player = new Character(
      this.width / 2,
      this.groundY - CHARACTER_HEIGHT,
      CHARACTER_WIDTH,
      CHARACTER_HEIGHT
    );
  }

  // Generate random gap between platforms
  getPlatformGap() {
    return this.platformGap + getRandomNumber(0, PLATFORM_GAP_VARIATION);
  }

  // Generate initial platform
  generateInitialPlatform(count) {
    const x = getRandomNumber(CHARACTER_WIDTH, this.width - PLATFORM_WIDTH);
    const y = this.groundY - count * this.getPlatformGap();

    const platform = new Platform(x, y, PLATFORM_WIDTH, PLATFORM_HEIGHT);
    this.platforms.push(platform);
  }

  // Generate new platform
  generatePlatform() {
    // remove first platform
    this.platforms.shift();

    // Update the score based on the platforms that the player has passed
    this.score++;

    const x = getRandomNumber(CHARACTER_WIDTH, this.width - PLATFORM_WIDTH);
    const y = -(this.getPlatformGap() + PLATFORM_HEIGHT);

    const platform = new Platform(x, y, PLATFORM_WIDTH, PLATFORM_HEIGHT);
    this.platforms.push(platform);
  }

  drawBackground(ctx) {
    ctx.drawImage(this.image, 0, 0, this.width, this.height);
  }

  draw(ctx) {
    ctx.clearRect(0, 0, this.width, this.height);

    // Draw the background
    this.drawBackground(ctx);
    this.drawScore(ctx);

    // In case the game is over, draw the game over screen
    if (this.isGameOver) {
      this.drawGameOver(ctx);
      this.drawRestartButton(ctx);
      return;
    }

    // Draw the platforms
    for (const platform of this.platforms) {
      platform.draw(ctx);
    }

    // Draw the player
    this.player.draw(ctx);

    // Draw the score
    // ctx.fillStyle = SCORE_COLOR;
    // ctx.font = SCORE_FONT;
    // ctx.fillText(`Score: ${this.score}`, SCORE_X, SCORE_Y);

    // // Draw the game over screen
    // if (this.isGameOver) {
    //   ctx.fillStyle = GAME_OVER_COLOR;
    //   ctx.font = GAME_OVER_FONT;
    //   ctx.fillText(GAME_OVER_TEXT, GAME_OVER_X, GAME_OVER_Y);
    // }
  }

  checkGameOver() {
    if (this.player.y + this.player.height > this.height) {
      this.isGameOver = true;
    }
  }

  drawGameOver(ctx) {
    ctx.fillStyle = GAME_OVER_TEXT_COLOR;
    ctx.font = GAME_OVER_TEXT_FONT;
    ctx.fillText(GAME_OVER_TEXT, GAME_OVER_TEXT_X, GAME_OVER_TEXT_Y);
  }

  drawScore(ctx) {
    ctx.fillStyle = SCORE_TEXT_COLOR;
    ctx.font = SCORE_TEXT_FONT;
    ctx.fillText(`${SCORE_TEXT} ${this.score}`, SCORE_TEXT_X, SCORE_TEXT_Y);
  }

  drawRestartButton(ctx) {
    ctx.fillStyle = RESTART_BUTTON_COLOR;
    ctx.fillRect(
      RESTART_BUTTON_X,
      RESTART_BUTTON_Y,
      RESTART_BUTTON_WIDTH,
      RESTART_BUTTON_HEIGHT
    );
    ctx.fillStyle = RESTART_BUTTON_TEXT_COLOR;
    ctx.font = RESTART_BUTTON_TEXT_FONT;
    ctx.fillText(
      RESTART_BUTTON_TEXT,
      RESTART_BUTTON_TEXT_X,
      RESTART_BUTTON_TEXT_Y
    );

    canvas.addEventListener("click", (event) => {
      const x = event.offsetX;
      const y = event.offsetY;
      if (
        x > RESTART_BUTTON_X &&
        x < RESTART_BUTTON_X + RESTART_BUTTON_WIDTH &&
        y > RESTART_BUTTON_Y &&
        y < RESTART_BUTTON_Y + RESTART_BUTTON_HEIGHT
      ) {
        window.location.reload();
      }
    });
  }

  handleUserInput() {
    if (activeActions[ACTIONS.LEFT] || activeActions[ACTIONS.RIGHT]) {
      activeActions[ACTIONS.LEFT]
        ? this.player.moveLeft()
        : this.player.moveRight();
    } else {
      this.player.stop();
    }

    if (activeActions[ACTIONS.JUMP]) {
      this.player.jump();
    }
  }

  run() {
    this.player.move();
    this.player.handleCollisionWithWall(this.width);

    // move the platforms
    for (const platform of this.platforms) {
      platform.fall();
    }

    const platform = getCollidedPlatform(this.player, this.platforms);

    this.player.handleCollisionWithPlatform(platform);

    this.timer++;

    if (this.timer % PLATFORM_GENERATION_INTERVAL === 0) {
      this.generatePlatform();
      this.timer = 0;
    }

    this.checkGameOver();

    // Update the score based on the player's vertical position
    // score = Math.max(score, Math.floor(CANVAS_HEIGHT - player.y));
  }
}
