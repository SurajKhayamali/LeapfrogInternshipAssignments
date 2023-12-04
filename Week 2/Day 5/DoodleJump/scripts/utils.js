/**
 * Return a random number between a range
 *
 * @param {number} min
 * @param {number} max
 * @returns number
 */
function getRandomNumber(min, max) {
  return min + Math.floor(Math.random() * (max - min));
}

/**
 * Return a random number between a range other than a specified number, by default 0
 *
 * @param {number} min
 * @param {number} max
 * @param {number} number
 * @returns {number} randomNumber
 */
function getRandomNumberOtherThan(min, max, number = 0) {
  let randomNumber = getRandomNumber(min, max);
  while (randomNumber === number) {
    randomNumber = getRandomNumber(min, max);
  }
  return randomNumber;
}

/**
 * Detect collision between a character and a platform
 *
 * @param {Character} character
 * @param {Platform} platform
 * @returns {boolean} isCollided
 */
function detectCollision(character, platform) {
  return (
    character.x < platform.x + platform.width &&
    character.x + character.width > platform.x &&
    character.y < platform.y + platform.height &&
    character.y + character.height > platform.y &&
    character.vy > 0 && // Only check collision when falling
    !character.isGrounded
  );
}

/**
 * Return the platform that the character is collided with
 *
 * @param {Character} character
 * @param {Platform[]} platforms
 * @returns {Platform} collidedPlatform
 */
function getCollidedPlatform(character, platforms) {
  for (const platform of platforms) {
    if (detectCollision(character, platform)) {
      return platform;
    }
  }

  return null;
}

/**
 * Return if the device is a mobile device
 * @returns {boolean} isMobileDevice
 */
function isMobileDevice() {
  return navigator.userAgentData.mobile;
}

/**
 * Return the maximum jump height of the character
 * @param {number} jump
 * @param {number} gravity
 * @returns {number} jumpHeight
 */
function getMaxJumpHeight(jump, gravity) {
  let jumpHeight = 0;

  while (jump > 0) {
    jumpHeight += jump;
    jump -= gravity;
    gravity += gravity;
  }

  return jumpHeight;
}
