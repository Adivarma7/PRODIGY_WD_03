// script.js
const board = document.getElementById("board");
const status = document.getElementById("status");
const turnIndicator = document.getElementById("turnIndicator");
const restartButton = document.getElementById("restart");
const choosePlayerButton = document.getElementById("choosePlayer");
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

function checkWinner() {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            statusMessage.textContent = `${gameState[a]} wins!`;
            gameActive = false;
            return true;
        }
    }
    if (!gameState.includes("")) {
        statusMessage.textContent = "It's a draw!";
        gameActive = false;
        return true;
    }
    return false;
}

function handleClick(event) {
    if (!gameActive) return;
    const index = event.target.dataset.index;
    if (gameState[index] === "") {
        gameState[index] = currentPlayer;
        event.target.textContent = currentPlayer;
        event.target.classList.add("taken");
        if (!checkWinner()) {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            turnIndicator.textContent = `Player ${currentPlayer}'s turn`;
        }
    }
}

document.querySelectorAll("td").forEach(cell => {
    cell.addEventListener("click", handleClick);
});

choosePlayerButton.addEventListener("click", () => {
    currentPlayer = Math.random() < 0.5 ? "X" : "O";
    gameState = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    document.querySelectorAll("td").forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("taken");
    });
    turnIndicator.textContent = `Player ${currentPlayer} goes first`;
    statusMessage.textContent = "";
});

restartButton.addEventListener("click", () => {
    choosePlayerButton.style.display = "block";
    gameState = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    document.querySelectorAll("td").forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("taken");
    });
    turnIndicator.textContent = "";
    statusMessage.textContent = "";
});
