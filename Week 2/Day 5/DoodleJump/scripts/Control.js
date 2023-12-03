class Control {
  constructor() {
    this.left = false;
    this.right = false;
    this.up = false;
    this.down = false;
    this.jump = false;

    // if mobile device, continously jump
    if (isMobileDevice()) {
      this.jump = true;

      // Add event listeners for touch events, mobile controls
      document.addEventListener(
        "touchstart",
        this.touchStartHandler.bind(this),
        false
      );
      document.addEventListener(
        "touchend",
        this.touchEndHandler.bind(this),
        false
      );
    } else {
      this.jump = false;

      // Add event listeners for keyboard events, desktop controls
      document.addEventListener(
        "keydown",
        this.keyDownHandler.bind(this),
        false
      );
      document.addEventListener("keyup", this.keyUpHandler.bind(this), false);
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
    if (touch.clientX < window.innerWidth / 2) {
      this.left = true;
    } else {
      this.right = true;
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
  }
}
