const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Calculate canvas scale ratio based on CSS dimensions
const rect = canvas.getBoundingClientRect();
const scaleX = canvas.width / rect.width;
const scaleY = canvas.height / rect.height;

const game = new Game(canvas.width, canvas.height);

function animate() {
  game.draw(ctx);
  game.handleUserInput();
  game.run();

  requestAnimationFrame(animate);
}

animate();
