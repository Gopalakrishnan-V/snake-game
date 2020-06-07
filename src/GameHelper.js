import { GRID_SIZE } from "./constants.js";

class GameHelper {
  constructor() {}

  getRandomPosition = () => {
    return {
      x: Math.floor(Math.random() * GRID_SIZE) + 1,
      y: Math.floor(Math.random() * GRID_SIZE) + 1,
    };
  };

  getAppropriateBoardPosition = (pos) => {
    return {
      x: this.getCorrectCoordinate(pos.x),
      y: this.getCorrectCoordinate(pos.y),
    };
  };

  getCorrectCoordinate = (coordinate) => {
    if (coordinate === 0) {
      return GRID_SIZE;
    } else if (coordinate === GRID_SIZE + 1) {
      return 1;
    } else {
      return coordinate;
    }
  };
}

export default new GameHelper();
