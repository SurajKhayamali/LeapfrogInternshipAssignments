/**
 * Return a random number between a range
 *
 * @param {number} min
 * @param {number} max
 * @returns number
 */
function getRandomNumber(min, max) {
  return min + Math.random() * (max - min);
}

/**
 * Return a random color
 *
 * @returns {string}
 */
function getRandomColor() {
  const colors = [
    "red",
    "green",
    "blue",
    "yellow",
    "pink",
    "purple",
    "orange",
    "brown",
    "gray",
    "black",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

/**
 * Returns distance between two points
 *
 * @param {number} x1 x position of first element
 * @param {number} y1 y position of first element
 * @param {number} x2 x position of another element
 * @param {number} y2 y position of another element
 * @returns {number}
 */
function calculateDistance(x1, y1, x2, y2) {
  const xDistance = x2 - x1;
  const yDistance = y2 - y1;

  return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

/**
 * Set styles to an element
 *
 * @param {HTMLElement} element
 * @param {} styles
 */
function setStyles(element, styles = {}) {
  Object.assign(element.style, styles);
}
