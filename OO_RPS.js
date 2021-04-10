/* eslint-disable max-len */
/* eslint-disable max-lines-per-function */
const readline = require('readline-sync');
const VALID_CHOICES = ['rock', 'paper', 'scissors', 'lizard', 'Spock'];
const CHOICE_ALIAS = { r: 'rock', p: 'paper', s: 'scissors', l: 'lizard', S: 'Spock' };
const WIN_LIMIT = 3;
const WINNING_COMBOS = {
  rock: ['scissors', 'lizard'],
  paper: ['rock', 'Spock'],
  scissors: ['paper', 'lizard'],
  lizard: ['paper', 'Spock'],
  Spock: ['rock', 'scissors']
};

class Computer {
  constructor() {
    this.move = null;
  }

  choose() {
    let randomIndex = Math.floor(Math.random() * VALID_CHOICES.length);
    this.move = VALID_CHOICES[randomIndex];
  }
}

class Human {
  constructor() {
    this.move = null;
  }
  choose() {
    let choice;

    while (true) {
      console.log(`Please choose by entering first letter - ${VALID_CHOICES.join(', ')}:`);
      choice = readline.question();
      if (Object.keys(CHOICE_ALIAS).includes(choice)) break;
      console.log('Sorry, invalid choice.');
    }
    this.move = CHOICE_ALIAS[choice];
    console.clear();
  }
}

class RPSGame {
  constructor() {
    this.human = new Human();
    this.computer = new Computer();
    this.score = { human: 0, computer: 0 };
  }

  displayWinner() {
    let gameWinner;
    console.log(`You chose: ${this.human.move}`);
    console.log(`The computer chose: ${this.computer.move}`);

    if (WINNING_COMBOS[this.human.move].includes(this.computer.move)) {
      console.log('You win!');
      gameWinner = 'Human';
      this.score.human++;

    } else if (WINNING_COMBOS[this.computer.move].includes(this.human.move)) {
      console.log('Computer wins!');
      gameWinner = 'Computer';
      this.score.computer++;

    } else {
      console.log("It's a tie");
    }
    console.log(`Score is: Human - ${this.score.human} : Computer - ${this.score.computer}`);

    if (this.matchOver()) {
      console.log(`Match winner is ${gameWinner}`);
    } else {
      console.log(`Win ${WIN_LIMIT} to win the match!`);
    }
  }

  displayWelcomeMessage() {
    console.log(`Welcome to ${VALID_CHOICES.join(', ')}!`);
  }

  displayGoodbyeMessage() {
    console.log(`Thanks for playing ${VALID_CHOICES.join(', ')}. Goodbye!`);
  }

  playAgain() {
    console.log('Would you like to play again? (y/n)');
    let answer = readline.question();
    return answer.toLowerCase()[0] === 'y';
  }
  matchOver() {
    return (this.score.human > 2) || this.score.computer > 2;
  }

  resetScore() {
    this.score.human = 0;
    this.score.computer = 0;
    console.clear();
  }

  play() {
    this.displayWelcomeMessage();
    while (true) {
      this.human.choose();
      this.computer.choose();
      this.displayWinner();
      if (!this.matchOver()) continue;
      if (!this.playAgain()) break;
      this.resetScore();
    }
    this.displayGoodbyeMessage();
  }
}

let game = new RPSGame();
game.play();

// function createPlayer() {
//   return {
//     move: null,
//   };
// }

// function createComputer() {
//   let playerObject = createPlayer();

//   let computerObject = {
//     choose() {
//       let randomIndex = Math.floor(Math.random() * VALID_CHOICES.length);
//       this.move = VALID_CHOICES[randomIndex];
//     },
//   };

//   return Object.assign(playerObject, computerObject);
// }

// function createHuman() {
//   let playerObject = createPlayer();

//   let humanObject = {
//     choose() {
//       let choice;

//       while (true) {
//         console.log(`Please choose by entering first letter - ${VALID_CHOICES.join(', ')}:`);
//         choice = readline.question();
//         if (Object.keys(CHOICE_ALIAS).includes(choice)) break;
//         console.log('Sorry, invalid choice.');
//       }

//       this.move = CHOICE_ALIAS[choice];
//     },
//   };

//   return Object.assign(playerObject, humanObject);
// }

// const RPSGame = {
//   human: createHuman(),
//   computer: createComputer(),
//   score: { human: 0, computer: 0 },

//   displayWinner() {
//     let humanMove = this.human.move;
//     let computerMove = this.computer.move;

//     console.log(`You chose: ${this.human.move}`);
//     console.log(`The computer chose: ${this.computer.move}`);

//     if (WINNING_COMBOS[humanMove].includes(computerMove)) {
//       console.log('You win!');
//       this.score.human++;

//     } else if (WINNING_COMBOS[computerMove].includes(humanMove)) {
//       console.log('Computer wins!');
//       this.score.computer++;

//     } else {
//       console.log("It's a tie");
//     }
//     console.log(`Score is: Human - ${this.score.human} : Computer - ${this.score.computer}`);
//     console.log(`Win ${WIN_LIMIT} to win the match!`);
//   },

//   displayWelcomeMessage() {
//     console.log(`Welcome to ${VALID_CHOICES.join(', ')}!`);
//   },

//   displayGoodbyeMessage() {
//     console.log(`Thanks for playing ${VALID_CHOICES.join(', ')}. Goodbye!`);
//   },

//   playAgain() {
//     console.log('Would you like to play again? (y/n)');
//     let answer = readline.question();
//     return answer.toLowerCase()[0] === 'y';
//   },
//   matchOver() {
//     return (this.score.human > 2) || this.score.computer > 2;
//   },

//   play() {
//     this.displayWelcomeMessage();
//     while (true) {
//       this.human.choose();
//       this.computer.choose();
//       this.displayWinner();
//       if (!this.matchOver()) continue;
//       if (!this.playAgain()) break;
//     }

//     this.displayGoodbyeMessage();
//   },
// };

// RPSGame.play();
