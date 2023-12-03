class Platform {
  constructor(x, y, width, height) {
    this.id = Platform.id++;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.image = new Image();
    this.image.src = "./images/platform.png";
  }

  static id = 0;

  /**
   * Draw the platform
   *
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  /**
   * Make the platform fall
   */
  fall() {
    this.y += PLATFORM_FALLING_SPEED * scaleY;
  }
}
