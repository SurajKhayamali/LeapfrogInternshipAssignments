/**
 * Returns a random number between min (inclusive) and max (exclusive). Defaults between 0 and 1-
 *
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
function getRandom(min = 0, max = 1) {
  return min + Math.floor(Math.random() * (max - min + 1));
}
