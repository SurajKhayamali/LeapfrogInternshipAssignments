const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const game = new Game(canvas.width, canvas.height);

function animate() {
  game.draw(ctx);
  game.handleUserInput();
  game.run();

  requestAnimationFrame(animate);
}

animate();
