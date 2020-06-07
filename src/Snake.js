import Input from "./Input.js";
import { SNAKE_EXPANSION_RATE } from "./constants.js";
import GameHelper from "./GameHelper.js";

class Snake {
  constructor() {
    this.body = [{ x: 11, y: 11 }];
  }

  update = () => {
    const inputDirection = Input.getInputDirection();
    if (inputDirection.x === 0 && inputDirection.y === 0) {
      return;
    }

    const bodyLength = this.body.length;
    for (let i = bodyLength - 1; i > 0; i--) {
      this.body[i] = { ...this.body[i - 1] };
    }

    this.body[0].x += inputDirection.x;
    this.body[0].y += inputDirection.y;
    this.body[0] = GameHelper.getAppropriateBoardPosition(this.body[0]);
  };

  onSnake = (pos, ignoreHead = false) => {
    return this.body.some((segment, index) => {
      if (index === 0 && ignoreHead) {
        return false;
      }
      return this.arePositionsSame(pos, segment);
    });
  };

  onSnakeIntersection = () => {
    const snakeHead = this.body[0];
    return this.onSnake(snakeHead, true);
  };

  arePositionsSame = (pos1, pos2) => {
    return pos1.x === pos2.x && pos1.y === pos2.y;
  };

  expandSnake = () => {
    for (let i = 1; i <= SNAKE_EXPANSION_RATE; i++) {
      const snakeLength = this.body.length;
      const lastElement = this.body[snakeLength - 1];
      this.body.push(lastElement);
    }
  };

  draw = (gameBoard) => {
    for (let segment of this.body) {
      const { x, y } = segment;
      const snakeElement = document.createElement("div");
      snakeElement.style.gridRowStart = y;
      snakeElement.style.gridColumnStart = x;
      snakeElement.classList.add("snake");
      gameBoard.appendChild(snakeElement);
    }
  };
}

export default new Snake();
