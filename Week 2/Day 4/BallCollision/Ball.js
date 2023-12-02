class Ball {
  constructor(x, y, r, xSpeed, ySpeed) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.diameter = r * 2;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.mass = r * r * Math.PI; // Mass is proportional to the area of the circle

    this.element = document.createElement("div");
    this.element.classList.add("ball");

    setStyles(this.element, {
      width: `${this.diameter}px`,
      height: `${this.diameter}px`,
      backgroundColor: getRandomColor(),
    });
  }

  /**
   * Returns the html element
   * @returns {HTMLDivElement}
   */
  getElement() {
    return this.element;
  }

  /**
   * Returns x position of ball
   *
   * @returns {number}
   */
  getX = () => this.x;

  /**
   * Returns y position of ball
   *
   * @returns {number}
   */
  getY = () => this.y;

  /**
   * Returns r radius of ball
   *
   * @returns {number}
   */
  getR = () => this.r;

  /**
   * Set x position of ball
   *
   * @param {number} x
   */
  setX = (x) => (this.x = x);

  /**
   * Set y position of ball
   *
   * @param {number} y
   */
  setY = (y) => (this.y = y);

  /**
   * Set r radius of ball
   *
   * @param {number} r
   */
  setR = (r) => (this.r = r);

  /**
   * Move the ball towards a direction
   */
  move = () => {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  };

  /**
   * Draw the ball on the screen
   */
  draw() {
    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;
  }

  /**
   * Check if the ball collides with the wall
   *
   * @param {number} boundaryLeft
   * @param {number} boundaryTop
   * @param {number} boundaryWidth
   * @param {number} boundaryHeight
   */
  checkWallCollision = (
    boundaryLeft,
    boundaryTop,
    boundaryWidth,
    boundaryHeight
  ) => {
    if (this.x < boundaryLeft) {
      this.xSpeed = Math.abs(this.xSpeed);
    } else if (this.x > boundaryWidth - this.r) {
      this.xSpeed = -Math.abs(this.xSpeed);
    }

    if (this.y < boundaryTop) {
      this.ySpeed = Math.abs(this.ySpeed);
    } else if (this.y > boundaryHeight - this.r) {
      this.ySpeed = -Math.abs(this.ySpeed);
    }
  };

  /**
   * Check if the ball collides with another ball and adjust their positions and velocities
   *
   * @param {Ball} ball
   */
  checkBallCollision = (ball) => {
    const dx = ball.x - this.x;
    const dy = ball.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < this.r + ball.r) {
      // Calculate the overlap distance
      const overlap = this.r + ball.r - distance;

      // Calculate the unit vector
      const normalX = dx / distance;
      const normalY = dy / distance;

      // Separate the balls by adjusting their positions
      this.x -= overlap * normalX * 0.5;
      this.y -= overlap * normalY * 0.5;
      ball.x += overlap * normalX * 0.5;
      ball.y += overlap * normalY * 0.5;

      // Calculate relative velocities
      const relativeVelocityX = ball.xSpeed - this.xSpeed;
      const relativeVelocityY = ball.ySpeed - this.ySpeed;
      const dotProduct =
        relativeVelocityX * normalX + relativeVelocityY * normalY;

      // Calculate impulse (change in momentum)
      const impulse = (2 * dotProduct) / (1 / this.mass + 1 / ball.mass);

      // Update velocities based on masses
      this.xSpeed += (impulse / this.mass) * normalX;
      this.ySpeed += (impulse / this.mass) * normalY;
      ball.xSpeed -= (impulse / ball.mass) * normalX;
      ball.ySpeed -= (impulse / ball.mass) * normalY;
    }
  };
}
