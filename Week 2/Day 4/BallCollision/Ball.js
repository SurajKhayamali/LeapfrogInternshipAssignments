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
    // TODO: in case of overlapping balls, move them away from each other, if needed hardly place them next to each other
    // const offsetX = this.x - ball.x;
    // const offsetY = this.y - ball.y;
    // const collidedInX = this.x + this.diameter >= ball.x && this.x <= ball.x;
    // const collidedInY = this.y + this.diameter >= ball.y && this.y <= ball.y;
    // if (collidedInX && collidedInY) {
    //   this.xSpeed *= -1;
    //   this.ySpeed *= -1;
    //   ball.xSpeed *= -1;
    //   ball.ySpeed *= -1;
    // } else if (collidedInX) {
    //   this.xSpeed *= -1;
    //   ball.xSpeed *= -1;
    // } else if (collidedInY) {
    //   this.ySpeed *= -1;
    //   ball.ySpeed *= -1;
    // }
    // const offsetX = this.x - ball.x;
    // const offsetY = this.y - ball.y;
    // if (offsetX < this.diameter && offsetY < this.diameter) {
    //   const distance = Math.sqrt(offsetX ** 2 + offsetY ** 2);
    //   if (distance < this.diameter) {
    //     this.xSpeed *= -1;
    //     this.ySpeed *= -1;
    //     ball.xSpeed *= -1;
    //     ball.ySpeed *= -1;
    //   }
    // } else if (offsetX < this.diameter) {
    //   const distance = Math.sqrt(offsetX ** 2);
    //   if (distance < this.diameter) {
    //     this.xSpeed *= -1;
    //     ball.xSpeed *= -1;
    //   }
    // } else if (offsetY < this.diameter) {
    //   const distance = Math.sqrt(offsetY ** 2);
    //   if (distance < this.diameter) {
    //     this.ySpeed *= -1;
    //     ball.ySpeed *= -1;
    //   }
    // }

    const distance = calculateDistance(this.x, this.y, ball.x, ball.y);
    if (distance < this.r + ball.r) {
      const offsetX = this.x - ball.x;
      const offsetY = this.y - ball.y;
      const angle = Math.atan2(offsetY, offsetX);
      const sin = Math.sin(angle);
      const cos = Math.cos(angle);

      const velocity1 = {
        x: this.xSpeed * cos + this.ySpeed * sin,
        y: this.ySpeed * cos - this.xSpeed * sin,
      };

      const velocity2 = {
        x: ball.xSpeed * cos + ball.ySpeed * sin,
        y: ball.ySpeed * cos - ball.xSpeed * sin,
      };

      const finalVelocity1 = {
        x:
          ((this.r - ball.r) * velocity1.x + 2 * ball.r * velocity2.x) /
          (this.r + ball.r),
        y: velocity1.y,
      };

      const finalVelocity2 = {
        x:
          ((ball.r - this.r) * velocity2.x + 2 * this.r * velocity1.x) /
          (this.r + ball.r),
        y: velocity2.y,
      };

      this.xSpeed = finalVelocity1.x * cos - finalVelocity1.y * sin;
      this.ySpeed = finalVelocity1.y * cos + finalVelocity1.x * sin;

      ball.xSpeed = finalVelocity2.x * cos - finalVelocity2.y * sin;
      ball.ySpeed = finalVelocity2.y * cos + finalVelocity2.x * sin;

      // this.move();
      // ball.move();
    }

    // if (
    //   ball.x <= this.x + this.diameter &&
    //   ball.x + ball.diameter >= this.x &&
    //   ball.y <= this.y + this.diameter &&
    //   ball.y + ball.diameter >= this.y
    // ) {
    //   if (Math.abs(this.x - ball.x) > Math.abs(this.y - ball.y)) {
    //     this.x =
    //       this.x < ball.x ? ball.x - this.diameter : ball.x + ball.diameter;
    //     ball.xSpeed *= -1;
    //   } else {
    //     this.y =
    //       this.y < ball.y ? ball.y - this.diameter : ball.y + ball.diameter;
    //     ball.ySpeed *= -1;
    //   }
    // }
  };
}
