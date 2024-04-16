let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

// Global variable to store the current difficulty level
let difficultyLevel = 'hard'; // Default difficulty is 'hard'

// Event listener for the 'Easy' button
document.getElementById('easy').addEventListener('click', function() {
    difficultyLevel = 'easy';
    resetGame();
});

// Event listener for the 'Medium' button
document.getElementById('medium').addEventListener('click', function() {
    difficultyLevel = 'medium';
    resetGame();
});

// Event listener for the 'Hard' button
document.getElementById('hard').addEventListener('click', function() {
    difficultyLevel = 'hard';
    resetGame();
});

// Function to make the computer move based on the difficulty level
function computerMove(board) {
    if (difficultyLevel === 'easy') {
        return randomMove(board);
    } else if (difficultyLevel === 'medium') {
        return mediumMove(board);
    } else {
        return minimax(board, 0, false, -Infinity, Infinity).move;
    }
}


// Function to make a random move (for easy level)
function randomMove(board) {
    let emptyCells = [];
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === '') {
                emptyCells.push({ row: i, col: j });
            }
        }
    }
    return emptyCells[Math.floor(Math.random() * emptyCells.length)];
}

// Function to make a medium level move
function mediumMove(board) {
    // Priority: Win, Block, Random
    let move = checkWinningMove(board, 'O');
    if (move) return move;

    move = checkWinningMove(board, 'X');
    if (move) return move;

    return randomMove(board);
}

// Check if a winning move is available
function checkWinningMove(board, player) {
    // Check rows and columns
    for (let i = 0; i < 3; i++) {
        if ((board[i][0] === player && board[i][1] === player && board[i][2] === '') ||
            (board[i][0] === player && board[i][2] === player && board[i][1] === '') ||
            (board[i][1] === player && board[i][2] === player && board[i][0] === '')) {
            return { row: i, col: board[i].indexOf('') };
        }
        if ((board[0][i] === player && board[1][i] === player && board[2][i] === '') ||
            (board[0][i] === player && board[2][i] === player && board[1][i] === '') ||
            (board[1][i] === player && board[2][i] === player && board[0][i] === '')) {
            return { row: board.map(col => col[i]).indexOf(''), col: i };
        }
    }
    // Check diagonals
    if ((board[0][0] === player && board[1][1] === player && board[2][2] === '') ||
        (board[0][0] === player && board[2][2] === player && board[1][1] === '') ||
        (board[1][1] === player && board[2][2] === player && board[0][0] === '')) {
        return { row: board[0][0] === '' ? 0 : board[1][1] === '' ? 1 : 2, col: board[0][0] === '' ? 0 : board[1][1] === '' ? 1 : 2 };
    }
    if ((board[0][2] === player && board[1][1] === player && board[2][0] === '') ||
        (board[0][2] === player && board[2][0] === player && board[1][1] === '') ||
        (board[1][1] === player && board[2][0] === player && board[0][2] === '')) {
        return { row: board[0][2] === '' ? 0 : board[1][1] === '' ? 1 : 2, col: board[0][2] === '' ? 2 : board[1][1] === '' ? 1 : 0 };
    }
    return null;
}

// Reset game function remains unchanged

// Event listeners for difficulty buttons remain unchanged

// Your existing game logic and minimax algorithm functions

// Function to check if a player has won
function checkWin(board, player) {
    // Check rows and columns
    for (let i = 0; i < 3; i++) {
        if ((board[i][0] === player && board[i][1] === player && board[i][2] === player) ||
            (board[0][i] === player && board[1][i] === player && board[2][i] === player)) {
            return true;
        }
    }
    // Check diagonals
    if ((board[0][0] === player && board[1][1] === player && board[2][2] === player) ||
        (board[0][2] === player && board[1][1] === player && board[2][0] === player)) {
        return true;
    }
    return false;
}

// Function to check if the board is full
function boardFull(board) {
    for (let row of board) {
        for (let cell of row) {
            if (cell === '') return false;
        }
    }
    return true;
}

// Function to reset the game
function resetGame() {
    // Reset the game board
    board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];

    // Clear the board display
    let cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.innerText = '');

    // Reset any other variables or game state as needed
}

// Function to handle the end of the game (win, tie, or loss)
function endGame(outcome) {
    // Display the outcome message (win, tie, or loss)
    roundModalLabel.insertAdjacentHTML('beforeend', outcome);
    document.querySelector(".modal").classList.add("show");
    document.querySelector(".modal").style.display = "block";
    document.body.style.backgroundColor = "gray";

    let yesRound = document.getElementById('yesRound');
    let noRound = document.getElementById('noRound');

    yesRound.addEventListener('click', function(){
        document.body.style.backgroundColor = "white";
        document.querySelector(".modal").classList.remove("show");
        document.querySelector(".modal").style.display = "none";
        roundModalLabel.innerHTML = '';
        resetGame();
    });

    noRound.addEventListener('click', function(){
        document.body.style.backgroundColor = "white";
        document.querySelector(".modal").classList.remove("show")
        document.querySelector(".modal").style.display = "none";
    });
}

// Function to make a move
function makeMove(row, col) {
    // Check if the cell is empty and the game is not over
    if (board[row][col] === '' && !checkWin(board, 'X') && !checkWin(board, 'O') && !boardFull(board)) {
        board[row][col] = 'X';
        document.getElementById('cell' + (row * 3 + col + 1)).innerText = 'X';
        if (checkWin(board, 'X')) {
            endGame('You win!');
        } else if (boardFull(board)) {
           
            endGame("It's a draw!");
        } else {
            let move = computerMove(board);
            console.log("Move returned by computerMove:", move);
            board[move.row][move.col] = 'O';
            document.getElementById('cell' + (move.row * 3 + move.col + 1)).innerText = 'O';
            if (checkWin(board, 'O')) {
                endGame('Computer wins!');
            } else if (boardFull(board)) {
                endGame("It's a draw!");
            }
        }
    }
}

// Function for the computer's move using MiniMax algorithm with alpha-beta pruning
function minimax(board, depth, isMaximizingPlayer, alpha, beta) {
    if (checkWin(board, 'X')) {
        return { score: -10 + depth }; // Human player wins
    } else if (checkWin(board, 'O')) {
        return { score: 10 - depth }; // Computer player wins
    } else if (boardFull(board)) {
        return { score: 0 }; // Draw
    }

    if (isMaximizingPlayer) {
        let bestScore = -Infinity;
        let bestMove = null;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === '') {
                    board[i][j] = 'O';
                    let { score } = minimax(board, depth + 1, false, alpha, beta);
                    board[i][j] = '';
                    if (score > bestScore) {
                        bestScore = score;
                        bestMove = { row: i, col: j };
                    }
                    alpha = Math.max(alpha, score);
                    if (beta <= alpha) {
                        break;
                    }
                }
            }
        }
        return { score: bestScore, move: bestMove };
    } else {
        let bestScore = Infinity;
        let bestMove = null;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === '') {
                    board[i][j] = 'X';
                    let { score } = minimax(board, depth + 1, true, alpha, beta);
                    board[i][j] = '';
                    if (score < bestScore) {
                        bestScore = score;
                        bestMove = { row: i, col: j };
                    }
                    beta = Math.min(beta, score);
                    if (beta <= alpha) {
                        break;
                    }
                }
            }
        }
        return { score: bestScore, move: bestMove };
    }
}
