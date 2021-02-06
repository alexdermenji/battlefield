const view = {
  displayMessage: function (msg) {
    const messageArea = document.querySelector(".messageArea");
    messageArea.innerHTML = msg;
  },
  displayHit: function (location) {
    const cell = document.getElementById(location);
    cell.setAttribute("class", "hit");
  },
  displayMiss: function (location) {
    const cell = document.getElementById(location);
    cell.setAttribute("class", "miss");
  },
};

const model = {
  boardSize: 7,
  numShips: 3,
  shipLength: 3,
  shipSunk: 0,
  ships: [
    {
      locations: ["06", "16", "26"],
      hits: ["", "", ""],
    },
    {
      locations: ["24", "34", "44"],
      hits: ["", "", ""],
    },
    {
      locations: ["10", "11", "12"],
      hits: ["", "", ""],
    },
  ],
  fire: function (guess) {
    for (let i = 0; i < this.numShips; i++) {
      let ship = this.ships[i];
      let index = ship.locations.indexOf(guess);
      if (index >= 0) {
        ship.hits[index] = "hit";
        view.displayHit(guess);
        view.displayMessage("Hit!");
        if (this.isSunk(ship)) {
          view.displayMessage("You sank my battleship!");
          this.shipsSunk++;
        }
        return true;
      }
    }
    view.displayMiss(guess);
    view.displayMessage("You missed!");
    return false;
  },
  isSunk: function (ship) {
    for (let i = 0; i < this.shipLength; i++) {
      if (ship.hits[i] !== "hit") {
        return false;
      }
    }
    return true;
  },
};

let controller = {
  guesses: 0,

  processGuess: function (guess) {
    let location = parseGuess(guess);
    if (location) {
      this.guesses++;
      let hit = model.fire(location);
      if (hit && model.shipSunk === model.numShips) {
        view.displayMessage(
          `You sunk all my battleships, in ${this.guesses} guesses`
        );
      }
    }
  },
};

function parseGuess(guess) {
  const alphabet = ["a", "b", "c", "d", "e", "f", "g"];
  if (guess === null || guess.length !== 2) {
    alert("oops, please enter a letter and a number on the board");
  } else {
    let firstChar = guess.charAt(0);
    let row = alphabet.indexOf(firstChar);
    var column = guess.charAt(1);

    if (isNaN(row) || isNaN(column)) {
      alert("Oops that isnt on the board");
    } else if (
      row < 0 ||
      row >= model.boardSize ||
      column < 0 ||
      column >= model.boardSize
    ) {
      alert("Oops, thats off the board!");
    } else {
      return row + column;
    }
    return null;
  }
}

function init() {
  let fireButton = document.getElementById("fireButton");
  fireButton.onclick = handleFireButton;
  let guessInput = document.getElementById("guessInput");
  guessInput.onkeypress = handleKeyPress;
}

function handleKeyPress(e) {
  let fireButton = document.getElementById("fireButton");
  if (e.keyCode === 13) {
    fireButton.click();
    return false;
  }
}

function handleFireButton() {
  let guessInput = document.getElementById("guessInput");
  let guess = guessInput.value;
  controller.processGuess(guess);
  guessInput.value = "";
}

window.onload = init;
