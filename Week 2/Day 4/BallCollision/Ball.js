class Ball {
  constructor(x, y, r, xSpeed, ySpeed) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.diameter = r * 2;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;

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
    } else if (this.x > boundaryWidth - this.diameter) {
      this.xSpeed = -Math.abs(this.xSpeed);
    }

    if (this.y < boundaryTop) {
      this.ySpeed = Math.abs(this.ySpeed);
    } else if (this.y > boundaryHeight - this.diameter) {
      this.ySpeed = -Math.abs(this.ySpeed);
    }
  };

  /**
   * Check if the ball collides with another ball
   *
   * @param {Ball} ball
   */
  checkBallCollision = (ball) => {
    if (
      ball.x <= this.x + this.diameter &&
      ball.x + ball.diameter >= this.x &&
      ball.y <= this.y + this.diameter &&
      ball.y + ball.diameter >= this.y
    ) {
      if (Math.abs(this.x - ball.x) > Math.abs(this.y - ball.y)) {
        ball.xSpeed *= -1;
      } else {
        ball.ySpeed *= -1;
      }
    }
  };
}
