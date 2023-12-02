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

function collisionDetection(player, platform) {
  if (
    player.x < platform.x + platform.w &&
    player.x + player.w > platform.x &&
    player.y < platform.y + platform.h &&
    player.y + player.h > platform.y
  ) {
    // Collision detected!
    // this.color("green");

    console.log("Collision detected!");
    return true;
  } else {
    // No collision
    // this.color("blue");

    return false;
  }
}
