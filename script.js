let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

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

// Function to make the computer move
function computerMove(board) {
    let bestScore = -Infinity;
    let bestMove = { row: -1, col: -1 };

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === '') {
                board[i][j] = 'O';
                let score = minimax(board, 0, false, -Infinity, Infinity);
                board[i][j] = '';
                if (score > bestScore) {
                    bestScore = score;
                    bestMove.row = i;
                    bestMove.col = j;
                }
            }
        }
    }

    return bestMove;
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
    alert(outcome);

   // let endGamePrompt = document.getElementById('roundModal');
    document.querySelector(".modal").classList.add("show");
    document.querySelector(".modal").style.display = "block";
    document.body.style.backgroundColor = "gray";

    let yesRound = document.getElementById('yesRound');
    let noRound = document.getElementById('noRound');

    //endGamePrompt.show();
    

    yesRound.addEventListener('click', function(){
        document.body.style.backgroundColor = "white";
        document.querySelector(".modal").classList.remove("show");
        document.querySelector(".modal").style.display = "none";
        resetGame();
    });

    noRound.addEventListener('click', function(){
        document.body.style.backgroundColor = "white";
        document.querySelector(".modal").classList.remove("show")
        document.querySelector(".modal").style.display = "none";
        alert('Goodbye!');
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
        return -10 + depth; // Human player wins
    } else if (checkWin(board, 'O')) {
        return 10 - depth; // Computer player wins
    } else if (boardFull(board)) {
        return 0; // Draw
    }

    if (isMaximizingPlayer) {
        let bestScore = -Infinity;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === '') {
                    board[i][j] = 'O';
                    let score = minimax(board, depth + 1, false, alpha, beta);
                    board[i][j] = '';
                    bestScore = Math.max(score, bestScore);
                    alpha = Math.max(alpha, score);
                    if (beta <= alpha) {
                        break;
                    }
                }
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === '') {
                    board[i][j] = 'X';
                    let score = minimax(board, depth + 1, true, alpha, beta);
                    board[i][j] = '';
                    bestScore = Math.min(score, bestScore);
                    beta = Math.min(beta, score);
                    if (beta <= alpha) {
                        break;
                    }
                }
            }
        }
        return bestScore;
    }
}
