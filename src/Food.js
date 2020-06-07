import Snake from "./Snake.js";
import GameHelper from "./GameHelper.js";

class Food {
  constructor() {
    this.position = this.getRandomFoodPosition();
  }

  update = () => {
    if (Snake.onSnake(this.position)) {
      Snake.expandSnake();
      this.position = this.getRandomFoodPosition();
      return true;
    }
  };

  getRandomFoodPosition = () => {
    let randomFoodPosition = null;
    while (randomFoodPosition === null || Snake.onSnake(randomFoodPosition)) {
      randomFoodPosition = GameHelper.getRandomPosition();
    }
    return randomFoodPosition;
  };

  draw = (gameBoard) => {
    const { x, y } = this.position;
    const foodElement = document.createElement("div");
    foodElement.style.gridRowStart = y;
    foodElement.style.gridColumnStart = x;
    foodElement.classList.add("food");
    gameBoard.appendChild(foodElement);
  };
}

export default new Food();
