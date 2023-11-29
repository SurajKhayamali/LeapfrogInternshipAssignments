// Synchronize these values with the ones used in css
// all these units are in pixels
const CHART_WIDTH = 800;
const CHART_HEIGHT = 400;
const POINT_DIAMETER = 20;

// Calculated values
const UPPER_LIMIT_X = CHART_WIDTH - POINT_DIAMETER;
const UPPER_LIMIT_Y = CHART_HEIGHT - POINT_DIAMETER;

const chart = document.getElementById("chart");

function setStyles(element, styles = {}) {
  Object.assign(element.style, styles);
}

function toPx(value) {
  return `${value}px`;
}

function getRandom(lower = 0, upper = 0) {
  return lower + Math.ceil(Math.random() * (upper - lower));
}

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.element = document.createElement("div");
    this.element.classList.add("point");
    setStyles(this.element, {
      left: toPx(x),
      top: toPx(y),
    });
    chart.appendChild(this.element);
  }
}

// const points = [
//   {
//     x: 10,
//     y: 20,
//   },
//   {
//     x: 40,
//     y: 40,
//   },
//   {
//     x: 60,
//     y: 20,
//   },
//   {
//     x: 80,
//     y: 40,
//   },
//   {
//     x: 100,
//     y: 80,
//   },
// ];
const points = [];

for (let i = 0; i < 100; i++) {
  points.push({
    x: getRandom(0, UPPER_LIMIT_X),
    y: getRandom(0, UPPER_LIMIT_Y),
  });
}

for (const point of points) {
  new Point(point.x, point.y);
}
