let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

document.querySelector('.board').style.pointerEvents = 'none';
document.getElementById('difficultyAlert').innerHTML = 'Please Select a Difficulty';


 document.getElementById('toast').style.display = 'block'; // Show the backdrop

    document.getElementById('toastCancel').addEventListener('click', function() {
        document.getElementById('toast').style.display = 'none';
    });

    document.getElementById('toastClose').style.display = 'block'; // Show the backdrop

    document.getElementById('toastClose').addEventListener('click', function() {
        document.getElementById('toast').style.display = 'none';
    });




// Event listener for the 'Easy' button
document.getElementById('easy').addEventListener('click', function() {
    difficultyLevel = 'easy';
    resetGame();
    document.getElementById('difficultyAlert').innerHTML = '';
   document.querySelector('.board').style.pointerEvents = '';
});

// Event listener for the 'Medium' button
document.getElementById('medium').addEventListener('click', function() {
    difficultyLevel = 'medium';
    resetGame();
    document.getElementById('difficultyAlert').innerHTML = '';
    document.querySelector('.board').style.pointerEvents = '';
});

// Event listener for the 'Hard' button
document.getElementById('hard').addEventListener('click', function() {
    difficultyLevel = 'hard';
    resetGame();
    document.getElementById('difficultyAlert').innerHTML = '';
    document.querySelector('.board').style.pointerEvents = '';
});

// Function to make the computer move based on the difficulty level
function computerMove(board) {
    //let boardContainer = document.querySelector('.board');
   // document.querySelector('.board').style.pointerEvents = 'none';
    
    
    if (difficultyLevel === 'easy') {
        document.querySelector('.board').style.pointerEvents = '';
        return randomMove(board);
    } else if (difficultyLevel === 'medium') {
        document.querySelector('.board').style.pointerEvents = '';
        return mediumMove(board);
    } else {
        document.querySelector('.board').style.pointerEvents = '';
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
    console.log('easy');
    return emptyCells[Math.floor(Math.random() * emptyCells.length)];
}

// Function to make a medium level move
function mediumMove(board) {
    // Priority: Win, Block, Random
    let move = checkWinningMove(board, 'O');
    if (move) return move;

    move = checkWinningMove(board, 'X');
    if (move) return move;
    console.log('medium');
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

    document.querySelector('.board').style.pointerEvents = 'none';
document.getElementById('difficultyAlert').innerHTML = 'Please Select a Difficulty';

    // Reset any other variables or game state as needed
    //boardContainer.style.pointerEvents = 'none';
   // document.querySelector('.board').style.pointerEvents = 'none';
    computerMove(board);
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
        document.querySelector('.board').style.pointerEvents = 'none';
    });

    noRound.addEventListener('click', function(){
        document.body.style.backgroundColor = "white";
        document.querySelector(".modal").classList.remove("show")
        document.querySelector(".modal").style.display = "none";
    });
    //document.querySelector('.board').style.pointerEvents = 'none';
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
// Function for the computer's move using MiniMax algorithm with alpha-beta pruning
function minimax(board, depth, isMaximizingPlayer, alpha, beta) {
    // Check if the game is over or if the maximum depth has been reached
    if (checkWin(board, 'X')) {
        return { score: -10 + depth }; // Human player wins
    } else if (checkWin(board, 'O')) {
        return { score: 10 - depth }; // Computer player wins
    } else if (boardFull(board)) {
        return { score: 0 }; // Draw
    }

    // If it's the maximizing player's turn (computer), find the move with the highest score
    if (isMaximizingPlayer) {
        let bestScore = -Infinity;
        let bestMove = null;
        // Loop through all empty cells
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === '') {
                    // Try the current empty cell for the maximizing player (computer)
                    board[i][j] = 'O';
                    // Recursively call minimax with the updated board and depth
                    let { score } = minimax(board, depth + 1, false, alpha, beta);
                    // Undo the move
                    board[i][j] = '';
                    // Update the best score and move if the current score is higher
                    if (score > bestScore) {
                        bestScore = score;
                        bestMove = { row: i, col: j };
                    }
                    // Update alpha (the best value for the maximizing player)
                    alpha = Math.max(alpha, score);
                    // Perform alpha-beta pruning if beta is less than or equal to alpha
                    if (beta <= alpha) {
                        break; // Beta cut-off
                    }
                }
            }
        }
        return { score: bestScore, move: bestMove };
    } else {
        // If it's the minimizing player's turn (human), find the move with the lowest score
        let bestScore = Infinity;
        let bestMove = null;
        // Loop through all empty cells
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === '') {
                    // Try the current empty cell for the minimizing player (human)
                    board[i][j] = 'X';
                    // Recursively call minimax with the updated board and depth
                    let { score } = minimax(board, depth + 1, true, alpha, beta);
                    // Undo the move
                    board[i][j] = '';
                    // Update the best score and move if the current score is lower
                    if (score < bestScore) {
                        bestScore = score;
                        bestMove = { row: i, col: j };
                    }
                    // Update beta (the best value for the minimizing player)
                    beta = Math.min(beta, score);
                    // Perform alpha-beta pruning if beta is less than or equal to alpha
                    if (beta <= alpha) {
                        break; // Alpha cut-off
                    }
                }
            }
        }
        return { score: bestScore, move: bestMove };
    }
}
