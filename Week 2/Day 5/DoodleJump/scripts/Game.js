class Game {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.timer = 0;
    this.score = 0;
    this.isGameOver = false;

    this.groundY = this.height - GROUND_HEIGHT - CHARACTER_HEIGHT;
    this.platformGap = this.groundY / PLATFORM_COUNT;
    this.lastGeneratedPlatformY = this.groundY;

    this.platforms = [];

    this.image = new Image();
    this.image.src = "./images/doodlejumpbg.png";

    this.control = new Control();

    this.init();
  }

  /**
   * Initialize the game
   */
  init() {
    // creating a ground platform
    const ground = new Platform(0, this.groundY, this.width, GROUND_HEIGHT);

    this.platforms.push(ground);

    // Generate initial platforms
    for (let count = 0; count < PLATFORM_COUNT; count++) {
      this.generatePlatform();
    }

    // creating a player
    this.player = new Character(
      this.width / 2,
      this.groundY - CHARACTER_HEIGHT,
      CHARACTER_WIDTH,
      CHARACTER_HEIGHT
    );
  }

  /**
   * Get the gap between platforms
   */
  getPlatformGap() {
    return (
      MAX_JUMP_HEIGHT +
      CHARACTER_HEIGHT +
      PLATFORM_HEIGHT -
      getRandomNumber(0, PLATFORM_GAP_VARIATION)
    );
  }

  /**
   * Generate a new platform and add it to the platforms array
   * The platform is generated at a random x position
   * and at the top of the screen unless an offset is provided
   */
  generatePlatform() {
    const x = getRandomNumber(CHARACTER_WIDTH, this.width - PLATFORM_WIDTH);

    this.lastGeneratedPlatformY -= this.getPlatformGap();

    const platform = new Platform(
      x,
      this.lastGeneratedPlatformY,
      PLATFORM_WIDTH,
      PLATFORM_HEIGHT
    );

    this.platforms.push(platform);
  }

  /**
   * Remove a platform that is out of the screen
   *
   * @param {number} platformId
   */
  removePlatform(platformId) {
    this.platforms = this.platforms.filter(
      (platform) => platform.id !== platformId
    );

    // Update the score based on the platforms that are removed
    this.score++;
  }

  /**
   * Draw the game
   *
   * @param {CanvasRenderingContext2D} ctx
   */
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
  }

  /**
   * Draw the background
   *
   * @param {CanvasRenderingContext2D} ctx
   */
  drawBackground(ctx) {
    ctx.drawImage(this.image, 0, 0, this.width, this.height);
  }

  /**
   * Draw the score
   *
   * @param {CanvasRenderingContext2D} ctx
   */
  drawScore(ctx) {
    ctx.fillStyle = SCORE_TEXT_COLOR;
    ctx.font = SCORE_TEXT_FONT;
    ctx.fillText(`${SCORE_TEXT} ${this.score} `, SCORE_TEXT_X, SCORE_TEXT_Y);
  }

  /**
   * Draw the stats for easibility in debugging
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {string} stats
   */
  drawStatsForDebug(ctx, stats) {
    ctx.fillStyle = SCORE_TEXT_COLOR;
    ctx.font = SCORE_TEXT_FONT;
    ctx.fillText(stats, SCORE_TEXT_X, SCORE_TEXT_Y + 100);
  }

  /**
   * Draw the game over screen
   *
   * @param {CanvasRenderingContext2D} ctx
   */
  drawGameOver(ctx) {
    ctx.fillStyle = GAME_OVER_TEXT_COLOR;
    ctx.font = GAME_OVER_TEXT_FONT;
    ctx.fillText(GAME_OVER_TEXT, GAME_OVER_TEXT_X, GAME_OVER_TEXT_Y);
  }

  /**
   * Draw the restart button
   *
   * @param {CanvasRenderingContext2D} ctx
   */
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

    // Add event listener to restart the game when the user clicks on the button
    canvas.addEventListener("click", this.handleRestartButtonClicked, false);
  }

  /**
   * Handle the restart button click event
   *
   * @param {MouseEvent} event
   */
  handleRestartButtonClicked(event) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = (event.clientX - rect.left) * scaleX;
    const mouseY = (event.clientY - rect.top) * scaleY;
    if (
      mouseX > RESTART_BUTTON_X &&
      mouseX < RESTART_BUTTON_X + RESTART_BUTTON_WIDTH &&
      mouseY > RESTART_BUTTON_Y &&
      mouseY < RESTART_BUTTON_Y + RESTART_BUTTON_HEIGHT
    ) {
      window.location.reload();
    }
  }

  /**
   * Handle the user input
   * This method is called when the user presses a key
   * and the game is not over
   */
  handleUserInput() {
    if (this.isGameOver) return;

    if (this.control.left || this.control.right) {
      this.control.left
        ? this.player.moveLeft(this.control.factor)
        : this.player.moveRight(this.control.factor);
    } else {
      this.player.stop();
    }

    if (this.control.jump) {
      this.player.jump();
    }

    // Move the player and check if it is colliding with a wall
    this.player.move();
    this.player.handleCollisionWithWall(this.width);

    // Check if the player is colliding with a platform
    const platform = getCollidedPlatform(this.player, this.platforms);

    // If the player is colliding with a platform, make it stand on the platform
    this.player.handleCollisionWithPlatform(platform);
  }

  /**
   * Run the game
   * This method is called in every frame
   * and it is responsible for updating the game state
   * and drawing the game
   */
  run() {
    if (this.isGameOver || this.control.pause) return;

    // Check if the game is over
    this.checkGameOver();

    // Draw the game
    game.draw(ctx);

    // make the platforms fall
    for (const platform of this.platforms) {
      platform.fall();

      if (platform.y > this.height) {
        this.removePlatform(platform.id);
      }
    }

    // Update the game state based on the user input
    game.handleUserInput();

    // Generate a new platform if needed
    this.handleNewBlockGeneration();
  }

  /**
   * Check if the game is over
   * The game is over when the player falls off the screen
   */
  checkGameOver() {
    if (this.player.y + this.player.height > this.height) {
      this.isGameOver = true;
    }
  }

  /**
   * Generate a new platform if needed
   * This method is called in every frame
   * and it is responsible for generating a new platform
   * in a certain interval
   */
  handleNewBlockGeneration() {
    this.timer++;
    if (this.timer % PLATFORM_GENERATION_INTERVAL === 0) {
      this.generatePlatform();
      this.timer = 0;
    }
  }
}
