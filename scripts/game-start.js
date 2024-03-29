import { DisplayOn } from "./app.js";
import { DisplayOff } from "./app.js";
let dialogueBox = document.getElementById("main-text");
let userScoreTally = document.getElementById("user-score-tally");
let rivalScoreTally = document.getElementById("rival-score-tally");
let userTurnText = document.getElementById("user-turn");
let rockBtn = document.getElementById("rock-btn");
let paperBtn = document.getElementById("paper-btn");
let scissorsBtn = document.getElementById("scissors-btn");
let lizardBtn = document.getElementById("lizard-btn");
let spockBtn = document.getElementById("spock-btn");
let replayBtn = document.getElementById("replay-btn");
let oneVsOne = document.getElementById("oneVsOne");
let oneVsCpu = document.getElementById("oneVsCpu");
let elipses;

function GameStart(gameCountGoal, duelMode) {
  let userScore = 0;
  let rivalScore = 0;
  let userInput;
  let rivalInput;
  DisplayOn(rockBtn, paperBtn, scissorsBtn, lizardBtn, spockBtn);
  Player1Turn();
  DisplayOn(userScoreTally, rivalScoreTally, userTurnText);
  CounterUpdate();

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

  function ButtonColor(colorAdd, colorRemove) {
    rockBtn.classList.add(colorAdd);
    paperBtn.classList.add(colorAdd);
    scissorsBtn.classList.add(colorAdd);
    lizardBtn.classList.add(colorAdd);
    spockBtn.classList.add(colorAdd);
    rockBtn.classList.remove(colorRemove);
    paperBtn.classList.remove(colorRemove);
    scissorsBtn.classList.remove(colorRemove);
    lizardBtn.classList.remove(colorRemove);
    spockBtn.classList.remove(colorRemove);
  }

  function ButtonColor(colorAdd, colorRemove) {
    rockBtn.classList.add(colorAdd);
    paperBtn.classList.add(colorAdd);
    scissorsBtn.classList.add(colorAdd);
    lizardBtn.classList.add(colorAdd);
    spockBtn.classList.add(colorAdd);
    rockBtn.classList.remove(colorRemove);
    paperBtn.classList.remove(colorRemove);
    scissorsBtn.classList.remove(colorRemove);
    lizardBtn.classList.remove(colorRemove);
    spockBtn.classList.remove(colorRemove);
  }

  function Player1Turn() {
    userTurnText.textContent = "Player 1's Turn";
    ButtonColor("is-primary", "is-error");
    // if (duelMode) {
    //   ButtonColor("is-primary", "is-error");
    // } else {
    //   ButtonColor("is-primary", "is-disabled");
    // }
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
    // rockBtn.addEventListener("click", ChoiceButtons(true, "Rock", Player2Turn));
    // paperBtn.addEventListener("click", function (e) {
    //   ChoiceButtons(true, "Paper", Player2Turn);
    // });
    // scissorsBtn.addEventListener("click", function (e) {
    //   ChoiceButtons(true, "Scissors", Player2Turn);
    // });
    // lizardBtn.addEventListener("click", function (e) {
    //   ChoiceButtons(true, "Lizard", Player2Turn);
    // });
    // spockBtn.addEventListener("click", function (e) {
    //   ChoiceButtons(true, "Spock", Player2Turn);
    // });
  }

  // Attempted to add and remove event listeners depending on turn
  async function Player2Turn() {
    // rockBtn.removeEventListener("click", ChoiceButtons(true, "Rock", Player2Turn));
    // paperBtn.removeEventListener("click", function (e) {
    //   ChoiceButtons(true, "Paper", Player2Turn);
    // });
    // scissorsBtn.removeEventListener("click", function (e) {
    //   ChoiceButtons(true, "Scissors", Player2Turn);
    // });
    // lizardBtn.removeEventListener("click", function (e) {
    //   ChoiceButtons(true, "Lizard", Player2Turn);
    // });
    // spockBtn.removeEventListener("click", function (e) {
    //   ChoiceButtons(true, "Spock", Player2Turn);
    // });
    if (duelMode) {
      userTurnText.textContent = "Player 2's Turn";
      ButtonColor("is-error", "is-primary");
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
      // rockBtn.addEventListener("click", function (e) {
      //   ChoiceButtons(false, "Rock", GameJudge);
      // });
      // paperBtn.addEventListener("click", function (e) {
      //   ChoiceButtons(false, "Paper", GameJudge);
      // });
      // scissorsBtn.addEventListener("click", function (e) {
      //   ChoiceButtons(false, "Scissors", GameJudge);
      // });
      // lizardBtn.addEventListener("click", function (e) {
      //   ChoiceButtons(false, "Lizard", GameJudge);
      // });
      // spockBtn.addEventListener("click", function (e) {
      //   ChoiceButtons(false, "Spock", GameJudge);
      // });
    } else {
      // Attempted to make player wait for computer to make choice
      // userTurnText.textContent = "Computer's Turn";
      // ButtonColor("is-disabled", "is-primary");
      // await delay(3000);
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
    // Dialogue announcing who beat who
    dialogueBox.textContent = userInput;
    if (userInput !== rivalInput) {
      switch (userInput) {
        case "Rock":
          switch (rivalInput) {
            case "Paper":
              dialogueBox.textContent += " gets covered by";
              rivalScore++;
              break;
            case "Scissors":
              dialogueBox.textContent += " smashes";
              userScore++;
              break;
            case "Lizard":
              dialogueBox.textContent += " crushes";
              userScore++;
              break;
            case "Spock":
              dialogueBox.textContent += " gets vaporized by";
              rivalScore++;
              break;
          }
          break;

        case "Paper":
          switch (rivalInput) {
            case "Rock":
              dialogueBox.textContent += " covers";
              userScore++;
              break;
            case "Scissors":
              dialogueBox.textContent += " gets cut by";
              rivalScore++;
              break;
            case "Lizard":
              dialogueBox.textContent += " gets eaten by ";
              rivalScore++;
              break;
            case "Spock":
              dialogueBox.textContent += " disproves";
              userScore++;
              break;
          }
          break;

        case "Scissors":
          switch (rivalInput) {
            case "Rock":
              dialogueBox.textContent += " gets smashed by";
              rivalScore++;
              break;
            case "Paper":
              dialogueBox.textContent += " cuts";
              userScore++;
              break;
            case "Lizard":
              dialogueBox.textContent += " decapitates";
              userScore++;
              break;
            case "Spock":
              dialogueBox.textContent += " gets smashed by";
              rivalScore++;
              break;
          }
          break;

        case "Lizard":
          switch (rivalInput) {
            case "Rock":
              dialogueBox.textContent += " gets crushed by";
              rivalScore++;
              break;
            case "Paper":
              dialogueBox.textContent += " eats";
              userScore++;
              break;
            case "Scissors":
              dialogueBox.textContent += " gets decapitated by";
              rivalScore++;
              break;
            case "Spock":
              dialogueBox.textContent += " poisons";
              userScore++;
              break;
          }
          break;

        case "Spock":
          switch (rivalInput) {
            case "Rock":
              dialogueBox.textContent += " vaporizes";
              userScore++;
              break;
            case "Paper":
              dialogueBox.textContent += " gets disproved by";
              rivalScore++;
              break;
            case "Scissors":
              dialogueBox.textContent += " smashes";
              userScore++;
              break;
            case "Lizard":
              dialogueBox.textContent += " gets poisoned by";
              rivalScore++;
              break;
          }
          break;
      }
      dialogueBox.textContent += ` ${rivalInput}!`;
    } else {
      dialogueBox.textContent += ` and ${rivalInput} cancelled each other out, it's a tie!`;
    }
    // default:

    if (userScore >= gameCountGoal || rivalScore >= gameCountGoal) {
      // Runs after the game is finished
      CounterUpdate();
      DisplayOff(rockBtn, paperBtn, scissorsBtn, lizardBtn, spockBtn);
      if (userScore > rivalScore) {
        dialogueBox.textContent += " Player 1 Wins!";
      } else {
        dialogueBox.textContent += " Player 2 Wins!";
      }
      // Runs after winner is declared
      DisplayOn(replayBtn);
      userTurnText.textContent = "GAME OVER";
      replayBtn.onclick = function () {
        userScore = 0;
        rivalScore = 0;
        DisplayOn(oneVsOne, oneVsCpu);
        DisplayOff(replayBtn);
        dialogueBox.textContent = "Choose your game mode";
        CounterUpdate();
      };
    } else {
      CounterUpdate();
      Player1Turn();
      userInput = "";
      rivalInput = "";
    }
  }

  function CounterUpdate() {
    userScoreTally.textContent = `Score: ${userScore}`;
    rivalScoreTally.textContent = `Score: ${rivalScore}`;
  }

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  // Declares delay variable, intended for use with async functions
  // Credit to Etienne Martin on Stack Overflow https://stackoverflow.com/a/47480429
}
export { GameStart };
