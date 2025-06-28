const cells = document.querySelectorAll('.cell');
const resetButton = document.querySelector('.reset');
const boardElement = document.querySelector('.board');

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Add confetti library dynamically (no import needed)
function loadConfetti() {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js';
    document.head.appendChild(script);
}
loadConfetti();

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = Array.from(cells).indexOf(clickedCell);

    if (board[clickedCellIndex] !== '' || !gameActive) return;

    // Update UI and board state
    board[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    clickedCell.classList.add(currentPlayer.toLowerCase());

    checkGameStatus();
}

function checkGameStatus() {
    let roundWon = false;
    let winningCombo = [];

    // Check for win
    for (const condition of winningConditions) {
        const [a, b, c] = condition.map(i => board[i]);
        if (a === '' || a !== b || b !== c) continue;

        roundWon = true;
        winningCombo = condition;
        break;
    }

    if (roundWon) {
        // Highlight winning cells
        winningCombo.forEach(index => {
            cells[index].classList.add('winner');
        });

        // Confetti explosion
        if (window.confetti) {
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 }
            });
        }

        setTimeout(() => alert(`${currentPlayer} wins! 🎉`), 100);
        gameActive = false;
        return;
    }

    // Check for draw
    if (!board.includes('')) {
        setTimeout(() => alert("It's a draw! 🤝"), 100);
        gameActive = false;
        return;
    }

    // Switch player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function resetGame() {
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;

    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o', 'winner'); // Reset all classes
    });
}

// Event listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);