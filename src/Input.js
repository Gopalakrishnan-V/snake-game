import * as s from "./swipeEvents.js";
import { Keys } from "./constants.js";

class Input {
  constructor() {
    this.inputDirection = { x: 0, y: 0 };
    this.lastKey = null;
    window.addEventListener("keydown", this._handleKeyPress);
    this.init();
  }

  init = () => {
    document.addEventListener("swiped-left", () =>
      this._handleKeyPress({ key: Keys.LEFT })
    );
    document.addEventListener("swiped-right", () =>
      this._handleKeyPress({ key: Keys.RIGHT })
    );
    document.addEventListener("swiped-up", () =>
      this._handleKeyPress({ key: Keys.UP })
    );
    document.addEventListener("swiped-down", () =>
      this._handleKeyPress({ key: Keys.DOWN })
    );
  };

  _canUpdateDirection = (key) => {
    if (!this.lastKey) {
      return true;
    }

    const isKeyHorizontal = [Keys.LEFT, Keys.RIGHT].includes(key);
    const isLastKeyHorizontal = [Keys.LEFT, Keys.RIGHT].includes(this.lastKey);
    return isKeyHorizontal != isLastKeyHorizontal;
  };

  _handleKeyPress = (e) => {
    const { key } = e;
    if (!this._canUpdateDirection(key)) {
      return;
    }
    this.lastKey = key;

    switch (key) {
      case Keys.UP: {
        this.inputDirection = { x: 0, y: -1 };
        break;
      }
      case Keys.DOWN: {
        this.inputDirection = { x: 0, y: 1 };
        break;
      }
      case Keys.LEFT: {
        this.inputDirection = { x: -1, y: 0 };
        break;
      }
      case Keys.RIGHT: {
        this.inputDirection = { x: 1, y: 0 };
        break;
      }
    }
  };

  getInputDirection = () => {
    return this.inputDirection;
  };
}

export default new Input();
