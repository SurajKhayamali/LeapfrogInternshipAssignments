class Ball {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.xSpeed = getRandomNumber(-5, 5);
    this.ySpeed = getRandomNumber(-5, 5);

    this.element = document.createElement("div");
    this.element.classList.add("ball");
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
    if (this.x < boundaryLeft || this.x + BALL_WIDTH > boundaryWidth) {
      this.xSpeed *= -1;
    }

    if (this.y < boundaryTop || this.y + BALL_WIDTH > boundaryHeight) {
      this.ySpeed *= -1;
    }
  };

  /**
   * Check if the ball collides with another ball
   *
   * @param {this} ball
   */
  checkBallCollision = (ball) => {
    const dist = calculateDistance(this.x, this.y, ball.x, ball.y);

    const sumOfRadii = this.r + ball.r;

    if (dist < sumOfRadii) {
      // console.log("collision");
      this.xSpeed *= -1;
      this.ySpeed *= -1;
      ball.xSpeed *= -1;
      ball.ySpeed *= -1;
    }
  };
}
