import { DisplayOn } from "./app.js";
import { DisplayOff } from "./app.js";
let dialogueBox = document.getElementById("main-text");
let userScoreTally = document.getElementById("user-score-tally");
let rivalScoreTally = document.getElementById("rival-score-tally");
let rockBtn = document.getElementById("rock-btn");
let paperBtn = document.getElementById("paper-btn");
let scissorsBtn = document.getElementById("scissors-btn");
let lizardBtn = document.getElementById("lizard-btn");
let spockBtn = document.getElementById("spock-btn");
let replayBtn = document.getElementById("replay-btn");
let oneVsOne = document.getElementById("oneVsOne");
let oneVsCpu = document.getElementById("oneVsCpu");

function GameStart(gameCountGoal, duelMode) {
  let userScore = 0;
  let rivalScore = 0;
  let tie;
  let userInput;
  let rivalInput = "paper";
  DisplayOn(rockBtn, paperBtn, scissorsBtn, lizardBtn, spockBtn);
  Player1Turn();
  DisplayOn(userScoreTally, rivalScoreTally);
  userScoreTally.textContent = `P1: ${userScore}`;
  rivalScoreTally.textContent = `P2: ${rivalScore}`;
  dialogueBox.textContent =
    "Choose between Rock, Paper, Scissors, Lizard, or Spock";

  function ChoiceButtons(player1Turn, input, method) {
    if (player1Turn) {
      userInput = input;
    } else {
      rivalInput = input;
    }
    method();
  }

  function Player1Turn() {
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
    }
    dialogueBox.textContent = `Player 1 chose ${userInput}, Player 2 chose ${rivalInput}`;
    if (tie === true) {
      dialogueBox.textContent = "You tied, try again";
      tie = false;
    } else if (userScore >= gameCountGoal || rivalScore >= gameCountGoal) {
      // Runs after the game is finished
      userScoreTally.textContent = `P1: ${userScore}`;
      rivalScoreTally.textContent = `P2: ${rivalScore}`;
      DisplayOff(rockBtn, paperBtn, scissorsBtn, lizardBtn, spockBtn);
      if (userScore > rivalScore) {
        dialogueBox.textContent = "Player 1 Wins!";
      } else {
        dialogueBox.textContent = "Player 2 Wins!";
      }
      // Runs after winner is declared
      DisplayOn(replayBtn);
      replayBtn.onclick = function () {
        userScore = 0;
        rivalScore = 0;
        DisplayOn(oneVsOne, oneVsCpu);
        DisplayOff(replayBtn, userScoreTally, rivalScoreTally);
        dialogueBox.textContent = "Choose your game mode";
      };
    } else {
      userScoreTally.textContent = `P1: ${userScore}`;
      rivalScoreTally.textContent = `P2: ${rivalScore}`;
    }
    Player1Turn();
  }
}
export { GameStart };
