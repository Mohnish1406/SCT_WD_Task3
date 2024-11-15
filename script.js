
const board = Array(9).fill(null);
let currentPlayer = "X";
let isGameActive = true;


const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


const cells = document.querySelectorAll(".cell");
const restartButton = document.getElementById("restart");


function initializeGame() {
    cells.forEach((cell, index) => {
        cell.textContent = "";
        cell.addEventListener("click", () => handleCellClick(index));
    });
    board.fill(null);
    currentPlayer = "X";
    isGameActive = true;
}


function handleCellClick(index) {
    if (board[index] || !isGameActive) return;
    board[index] = currentPlayer;
    cells[index].textContent = currentPlayer;
    if (checkWinner()) {
        setTimeout(() => alert(`${currentPlayer} Wins!`), 100);
        isGameActive = false;
    } else if (board.every(cell => cell)) {
        setTimeout(() => alert("It's a Draw!"), 100);
        isGameActive = false;
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        if (currentPlayer === "O") {
            computerMove();
        }
    }
}


function computerMove() {
    const emptyCells = board.map((cell, idx) => (cell ? null : idx)).filter(idx => idx !== null);
    const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    setTimeout(() => handleCellClick(randomIndex), 500);
}


function checkWinner() {
    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}

// Restart game
restartButton.addEventListener("click", initializeGame);

// Initialize the game on load
initializeGame();
