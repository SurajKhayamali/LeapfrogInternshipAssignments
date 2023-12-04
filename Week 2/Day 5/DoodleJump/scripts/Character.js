class Character {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.vx = 0;
    this.vy = 0;

    this.isGrounded = false;

    this.image = new Image();
    this.image.src = "./images/doodler-right.png";
  }

  /**
   * Draw the character on the canvas
   *
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  /**
   * Move the character to the left
   */
  moveLeft() {
    this.vx -= SPEED * scaleX;
    this.image.src = "./images/doodler-left.png";
  }

  /**
   * Move the character to the right
   */
  moveRight() {
    this.vx += SPEED * scaleX;
    this.image.src = "./images/doodler-right.png";
  }

  /**
   * Stop the character
   * This method is called when no key is pressed
   * and the character should stop moving
   * (e.g. when the user releases the left or right arrow key)
   */
  stop() {
    this.vx = 0;
  }

  /**
   * Make the character jump
   */
  jump() {
    if (!this.isGrounded) return;

    this.isGrounded = false;
    this.vy = -JUMP_HEIGHT;
  }

  /**
   * Move the character based on its velocity and gravity values
   */
  move(factor = 1) {
    this.x += this.vx * factor * scaleX;

    // Apply the vertical movement and gravity only if the character is not grounded
    if (!this.isGrounded) {
      this.y += this.vy * scaleY;
      this.vy += GRAVITY * scaleY;
    } else {
      this.vy = PLATFORM_FALLING_SPEED; // Reset vy to platform galling speed when grounded
    }
  }

  /**
   * Handle collision with the canvas walls
   * In case of collision, move the character to the other side of the canvas
   * (e.g. if the character collides with the left wall, move it to the right)
   *
   * @param {number} canvasWidth
   */
  handleCollisionWithWall(canvasWidth) {
    if (this.x + this.width < 0) {
      this.x = canvasWidth - this.width;
    } else if (this.x > canvasWidth) {
      this.x = 0;
    }
  }

  /**
   * Handle collision with a platform, in case of collision move the character on top of the platform
   *
   * @param {Platform | null} platform
   */
  handleCollisionWithPlatform(platform) {
    if (platform) {
      this.y = platform.y - this.height;
      this.isGrounded = true;
    } else {
      this.isGrounded = false;
    }
  }
}
