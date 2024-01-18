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
  let rivalInput = "Paper";
  DisplayOn(rockBtn, paperBtn, scissorsBtn, lizardBtn, spockBtn);
  Player1Turn();
  DisplayOn(userScoreTally, rivalScoreTally);
  userScoreTally.textContent = `P1: ${userScore}`;
  rivalScoreTally.textContent = `P2: ${rivalScore}`;
  dialogueBox.textContent =
    "Choose between Rock, Paper, Scissors, Lizard, or Spock";

  function ChoiceButtons(player1Turn, input, Method) {
    if (player1Turn) {
      userInput = input;
    } else {
      rivalInput = input;
    }
    Method();
  }

  function Player1Turn() {
    rockBtn.onclick = function () {
      ChoiceButtons(true, "Rock", Player2Turn);
    };
    paperBtn.onclick = function () {
      ChoiceButtons(true, "Paper", Player2Turn);
    };
    scissorsBtn.onclick = function () {
      ChoiceButtons(true, "Scissors", Player2Turn);
    };
    lizardBtn.onclick = function () {
      ChoiceButtons(true, "Lizard", Player2Turn);
    };
    spockBtn.onclick = function () {
      ChoiceButtons(true, "Spock", Player2Turn);
    };
  }

  function Player2Turn() {
    if (duelMode) {
      rockBtn.onclick = function () {
        ChoiceButtons(false, "Rock", GameJudge);
      };
      paperBtn.onclick = function () {
        ChoiceButtons(false, "Paper", GameJudge);
      };
      scissorsBtn.onclick = function () {
        ChoiceButtons(false, "Scissors", GameJudge);
      };
      lizardBtn.onclick = function () {
        ChoiceButtons(false, "Lizard", GameJudge);
      };
      spockBtn.onclick = function () {
        ChoiceButtons(false, "Spock", GameJudge);
      };
    } else {
      ComputerTurn();
    }
  }

  async function ComputerTurn() {
    const promise = await fetch("https://rpslsapi.azurewebsites.net/RPSLS");
    const data = await promise.text();
    rivalInput = data;
    GameJudge();
  }

  function GameJudge() {
    switch (userInput) {
      case "Rock":
        if (rivalInput === "Rock") {
          tie = true;
        } else if (rivalInput === "Scissors" || rivalInput === "Lizard") {
          userScore++;
        } else if (rivalInput === "Paper" || rivalInput === "Spock") {
          rivalScore++;
        }
        break;
      case "Paper":
        if (rivalInput === "Paper") {
          tie = true;
        } else if (rivalInput === "Rock" || rivalInput === "Spock") {
          userScore++;
        } else if (rivalInput === "Scissors" || rivalInput === "Lizard") {
          rivalScore++;
        }
        break;
      case "Scissors":
        if (rivalInput === "Scissors") {
          tie = true;
        } else if (rivalInput === "Paper" || rivalInput === "Lizard") {
          userScore++;
        } else if (rivalInput === "Rock" || rivalInput === "Spock") {
          rivalScore++;
        }
        break;
      case "Lizard":
        if (rivalInput === "Lizard") {
          tie = true;
        } else if (rivalInput === "Paper" || rivalInput === "Spock") {
          userScore++;
        } else if (rivalInput === "Rock" || rivalInput === "Scissors") {
          rivalScore++;
        }
        break;
      case "Spock":
        if (rivalInput === "Spock") {
          tie = true;
        } else if (rivalInput === "Rock" || rivalInput === "Scissors") {
          userScore++;
        } else if (rivalInput === "Paper" || rivalInput === "Lizard") {
          rivalScore++;
        }
        break;
    }
    dialogueBox.textContent = `Player 1 chose ${userInput}, Player 2 chose ${rivalInput}... `;
    if (tie === true) {
      dialogueBox.textContent += "You tied, try again";
      tie = false;
    } else if (userScore >= gameCountGoal || rivalScore >= gameCountGoal) {
      // Runs after the game is finished
      userScoreTally.textContent = `P1: ${userScore}`;
      rivalScoreTally.textContent = `P2: ${rivalScore}`;
      DisplayOff(rockBtn, paperBtn, scissorsBtn, lizardBtn, spockBtn);
      if (userScore > rivalScore) {
        dialogueBox.textContent += "Player 1 Wins!";
      } else {
        dialogueBox.textContent += "Player 2 Wins!";
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
