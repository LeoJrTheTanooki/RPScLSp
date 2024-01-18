import { DisplayOn } from "./app.js";
import { DisplayOff } from "./app.js";
let dialogueBox = document.getElementById("main-text");

function GameStart(gameCountGoal, duelMode) {
  let userInputField = document.getElementById("userInputField");
  let rivalInputField = document.getElementById("rivalInputField");
  let rockBtn = document.getElementById("rock-btn");
  let paperBtn = document.getElementById("paper-btn");
  let scissorsBtn = document.getElementById("scissors-btn");
  let lizardBtn = document.getElementById("lizard-btn");
  let spockBtn = document.getElementById("spock-btn");
  let userScore = 0;
  let rivalScore = 0;
  let tie;
  let userValid = false;
  let rivalValid = false;
  let userInput;
  let rivalInput = "paper";
  // DisplayOn(userInputField);
  Player1Turn();
  dialogueBox.textContent =
    "Choose between Rock, Paper, Scissors, Lizard, or Spock";

  function ChoiceButtons(player1Turn, input, method) {
    if (player1Turn) {
      userInput = input;
    } else {
      rivalInput = input;
    }
    method();
    console.log(player1Turn, input, method);
  }

  function Player1Turn() {
    DisplayOn(rockBtn, paperBtn, scissorsBtn, lizardBtn, spockBtn);
    rockBtn.onclick = function () {
      ChoiceButtons(true, "rock", Player2Turn);
    };
    paperBtn.onclick = function () {
      ChoiceButtons(true, "paper", Player2Turn);
    };
    scissorsBtn.onclick = function () {
      ChoiceButtons(true, "scissors", Player2Turn);
    };
    lizardBtn.onclick = function () {
      ChoiceButtons(true, "lizard", Player2Turn);
    };
    spockBtn.onclick = function () {
      ChoiceButtons(true, "spock", Player2Turn);
    };
  }

  function Player2Turn() {
    rockBtn.onclick = function () {
      ChoiceButtons(false, "rock", GameJudge);
    };
    paperBtn.onclick = function () {
      ChoiceButtons(false, "paper", GameJudge);
    };
    scissorsBtn.onclick = function () {
      ChoiceButtons(false, "scissors", GameJudge);
    };
    lizardBtn.onclick = function () {
      ChoiceButtons(false, "lizard", GameJudge);
    };
    spockBtn.onclick = function () {
      ChoiceButtons(false, "spock", GameJudge);
    };
  }

  function ComputerTurn(userInput) {
    dialogueBox.textContent = "Whoops... we don't have a computer yet";
  }

  function GameJudge() {
    switch (userInput) {
      case "rock":
        if (rivalInput === "rock") {
          tie = true;
        } else if (rivalInput === "scissors" || rivalInput === "lizard") {
          userScore++;
        } else if (rivalInput === "paper" || rivalInput === "spock") {
          rivalScore++;
        }
        break;
      case "paper":
        if (rivalInput === "paper") {
          tie = true;
        } else if (rivalInput === "rock" || rivalInput === "spock") {
          userScore++;
        } else if (rivalInput === "scissors" || rivalInput === "lizard") {
          rivalScore++;
        }
        break;
      case "scissors":
        if (rivalInput === "scissors") {
          tie = true;
        } else if (rivalInput === "paper" || rivalInput === "lizard") {
          userScore++;
        } else if (rivalInput === "rock" || rivalInput === "spock") {
          rivalScore++;
        }
        break;
      case "lizard":
        if (rivalInput === "lizard") {
          tie = true;
        } else if (rivalInput === "paper" || rivalInput === "spock") {
          userScore++;
        } else if (rivalInput === "rock" || rivalInput === "scissors") {
          rivalScore++;
        }
        break;
      case "spock":
        if (rivalInput === "spock") {
          tie = true;
        } else if (rivalInput === "rock" || rivalInput === "scissors") {
          userScore++;
        } else if (rivalInput === "paper" || rivalInput === "lizard") {
          rivalScore++;
        }
        break;
      default:
        console.log("Invalid Input");
    }
    console.log(`Player 1 chose ${userInput}, Player 2 chose ${rivalInput}`);
    if (tie === true) {
      console.log("You tied, try again");
      tie = false;
    } else if (userScore >= gameCountGoal || rivalScore >= gameCountGoal) {
      console.log(`Player 1: ${userScore}\nPlayer 2: ${rivalScore}`);
      if (userScore > rivalScore) {
        console.log("Player 1 Wins!");
      } else {
        console.log("Player 2 Wins!");
      }
      userScore = 0;
      rivalScore = 0;
    } else {
      console.log(`Player 1: ${userScore}\nPlayer 2: ${rivalScore}`);
    }
    userInput = "";
    rivalInput = "";
    Player1Turn();
    // DisplayOn(userInputField);
  }
}
export { GameStart };
