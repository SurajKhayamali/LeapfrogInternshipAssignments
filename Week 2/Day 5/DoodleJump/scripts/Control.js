class Control {
  constructor() {
    this.left = false;
    this.right = false;
    this.up = false;
    this.down = false;
    this.jump = false;

    // Mobile only variables
    this.touchStartX = 0;

    if (isMobileDevice()) {
      // Add event listeners for touch events, mobile controls
      window.addEventListener(
        "touchstart",
        this.touchStartHandler.bind(this),
        false
      );
      window.addEventListener(
        "touchmove",
        this.handleTouchMoveHandler.bind(this),
        false
      );
      window.addEventListener(
        "touchend",
        this.touchEndHandler.bind(this),
        false
      );
      window.addEventListener(
        "deviceorientation",
        this.tiltHandler.bind(this),
        false
      );
    } else {
      // Add event listeners for keyboard events, desktop controls
      window.addEventListener("keydown", this.keyDownHandler.bind(this), false);
      window.addEventListener("keyup", this.keyUpHandler.bind(this), false);
    }
  }

  /**
   * Handle the key down event
   *
   * @param {KeyboardEvent} e
   */
  keyDownHandler(e) {
    switch (e.code) {
      case "ArrowLeft":
        this.left = true;
        break;
      case "ArrowRight":
        this.right = true;
        break;
      case "ArrowUp":
        this.up = true;
        break;
      case "ArrowDown":
        this.down = true;
        break;
      case "Space":
        this.jump = true;
        break;
      case "KeyA":
        this.left = true;
        break;
      case "KeyD":
        this.right = true;
        break;
      case "KeyW":
        this.up = true;
        break;
    }
  }

  /**
   * Handle the key up event
   *
   * @param {KeyboardEvent} e
   */
  keyUpHandler(e) {
    switch (e.code) {
      case "ArrowLeft":
        this.left = false;
        break;
      case "ArrowRight":
        this.right = false;
        break;
      case "ArrowUp":
        this.up = false;
        break;
      case "ArrowDown":
        this.down = false;
        break;
      case "Space":
        this.jump = false;
        break;
      case "KeyA":
        this.left = false;
        break;
      case "KeyD":
        this.right = false;
        break;
      case "KeyW":
        this.up = false;
        break;
    }
  }

  // Mobile controls
  /**
   * Handle the touch start event
   *
   * @param {TouchEvent} e
   */
  touchStartHandler(e) {
    // e.preventDefault();
    const touch = e.touches[0];
    this.touchStartX = touch.clientX;
    this.jump = true;
  }

  /**
   * Handle the touch move event
   * @param {TouchEvent} event
   */
  handleTouchMoveHandler(event) {
    const touchEndX = event.touches[0].clientX;
    const touchDiff = touchEndX - this.touchStartX;

    if (touchDiff > TOUCH_MOVE_THRESHOLD) {
      this.right = true;
      this.left = false;
    } else if (touchDiff < -TOUCH_MOVE_THRESHOLD) {
      this.left = true;
      this.right = false;
    } else {
      this.left = false;
      this.right = false;
    }
  }

  /**
   * Handle the touch end event
   *
   * @param {TouchEvent} e
   */
  touchEndHandler(e) {
    this.left = false;
    this.right = false;
    this.jump = false;
  }

  tiltHandler(event) {
    const gamma = event.gamma; // Get the device's tilt in the left-to-right direction

    if (gamma === null) return;

    if (gamma < 0) {
      this.left = true;
      this.right = false;
    } else {
      this.left = false;
      this.right = true;
    }
  }
}
