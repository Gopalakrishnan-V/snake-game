import { RENDER_INTERVAL, GAME_OVER } from "./constants.js";
import Snake from "./Snake.js";
import Food from "./Food.js";

class Game {
  constructor() {
    this.lastRenderTime = 0;
    this.isGameOver = false;

    this.gameBoard = document.getElementById("game-board");
    window.requestAnimationFrame(this.main);
  }

  main = (currentTime) => {
    if (this.isGameOver) {
      if (confirm(GAME_OVER)) {
        window.location = "/";
      }
      return;
    }

    window.requestAnimationFrame(this.main);
    const timeDiff = currentTime - this.lastRenderTime;
    if (timeDiff < RENDER_INTERVAL) {
      return;
    }

    this.lastRenderTime = currentTime;

    this.update();
    this.draw();
  };

  checkDeath = () => {
    const isIntersected = Snake.onSnakeIntersection();
    if (isIntersected) {
      this.isGameOver = true;
    }
  };

  update = () => {
    Snake.update();
    this.checkDeath();
    Food.update();
  };

  draw = () => {
    this.gameBoard.innerHTML = "";
    Snake.draw(this.gameBoard);
    Food.draw(this.gameBoard);
  };
}

export default new Game();
