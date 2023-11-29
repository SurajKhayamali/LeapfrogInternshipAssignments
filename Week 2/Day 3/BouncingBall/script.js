const container = document.getElementById("container");
const ball = document.getElementById("ball");

let speed = 5;

const coordinate = {
  x: 200,
  y: 0,
};

function draw() {
  ball.style.left = coordinate.x + "px";
  ball.style.top = coordinate.y + "px";
}

function update() {
  coordinate.y += speed;
}

function checkCollision() {
  // console.log("before", speed);
  if (coordinate.y > container.clientHeight - ball.clientHeight) {
    speed = -speed;
  } else if (coordinate.y < 0) {
    speed = -speed;
  }
  // console.log("after", speed);
}

function animate() {
  update();
  draw();
  checkCollision();
  requestAnimationFrame(animate);
}

animate();
