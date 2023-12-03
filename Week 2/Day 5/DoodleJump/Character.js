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

  draw(ctx) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}
