import { DisplayOn } from "./app.js";
import { DisplayOff } from "./app.js";
let dialogueBox = document.getElementById("main-text");

function GameStart(gameCountGoal, duelMode) {
  let userInputField = document.getElementById("userInputField");
  let rivalInputField = document.getElementById("rivalInputField");
  let userScore = 0;
  let rivalScore = 0;
  let tie;
  let userValid = false;
  let rivalValid = false;
  let userInput;
  let rivalInput;
  DisplayOn(userInputField);
  dialogueBox.textContent =
    "Choose between Rock, Paper, Scissors, Lizard, or Spock";

  userInputField.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      userInput = userInputField.value.toLowerCase();
      if (!userValid) {
        userInputField.value = "";
        if (
          userInput === "rock" ||
          userInput === "paper" ||
          userInput === "scissors" ||
          userInput === "lizard" ||
          userInput === "spock"
        ) {
          // userInputField.placeholder = "Submitted";
          userValid = true;
          DisplayOff(userInputField);
          if (duelMode) {
            Player2Turn(userInput);
          } else {
            ComputerTurn(userInput);
          }
          // GameJudge(userInput, rivalInput);
          // if (rivalValid) {
          //   GameJudge(userInput, rivalInput);
          // } else {
          //   console.log("Awaiting Rival's Choice");
          // }
        } else {
          dialogueBox.textContent = "Invalid Input";
        }
      }
    }
  });

  function Player2Turn(userInput) {
    DisplayOn(rivalInputField);
    rivalInputField.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        if (!rivalValid) {
          rivalInput = rivalInputField.value.toLowerCase();
          rivalInputField.value = "";
          if (
            rivalInput === "rock" ||
            rivalInput === "paper" ||
            rivalInput === "scissors" ||
            rivalInput === "lizard" ||
            rivalInput === "spock"
          ) {
            rivalInputField.placeholder = "Submitted";
            rivalValid = true;
            if (userValid) {
              GameJudge(userInput, rivalInput);
            } else {
              console.log("Awaiting User's Choice");
            }
          } else {
            console.log("Invalid Input");
          }
        }
      }
    });
  }

  function ComputerTurn(userInput) {
    dialogueBox.textContent = "Whoops... we don't have a computer yet";
  }

  function GameJudge(userInputPar, rivalInputPar) {
    switch (userInputPar) {
      case "rock":
        if (rivalInputPar === "rock") {
          tie = true;
        } else if (rivalInputPar === "scissors" || rivalInputPar === "lizard") {
          userScore++;
        } else if (rivalInputPar === "paper" || rivalInputPar === "spock") {
          rivalScore++;
        }
        break;
      case "paper":
        if (rivalInputPar === "paper") {
          tie = true;
        } else if (rivalInputPar === "rock" || rivalInputPar === "spock") {
          userScore++;
        } else if (rivalInputPar === "scissors" || rivalInputPar === "lizard") {
          rivalScore++;
        }
        break;
      case "scissors":
        if (rivalInputPar === "scissors") {
          tie = true;
        } else if (rivalInputPar === "paper" || rivalInputPar === "lizard") {
          userScore++;
        } else if (rivalInputPar === "rock" || rivalInputPar === "spock") {
          rivalScore++;
        }
        break;
      case "lizard":
        if (rivalInputPar === "lizard") {
          tie = true;
        } else if (rivalInputPar === "paper" || rivalInputPar === "spock") {
          userScore++;
        } else if (rivalInputPar === "rock" || rivalInputPar === "scissors") {
          rivalScore++;
        }
        break;
      case "spock":
        if (rivalInputPar === "spock") {
          tie = true;
        } else if (rivalInputPar === "rock" || rivalInputPar === "scissors") {
          userScore++;
        } else if (rivalInputPar === "paper" || rivalInputPar === "lizard") {
          rivalScore++;
        }
        break;
      default:
        console.log("Invalid Input");
    }
    console.log(
      `Player 1 chose ${userInputPar}, Player 2 chose ${rivalInputPar}`
    );
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
    userInputField.placeholder = "";
    rivalInputField.placeholder = "";
    userValid = false;
    rivalValid = false;
    DisplayOn(userInputField);
  }
}
export { GameStart };
