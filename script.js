let playerXName = ''; // Name of Player X
let playerOName = ''; // Name of Player O
let currentPlayer = 'X'; // Track current player
let gameActive = true; // Game status
const board = Array(9).fill(null); // Game board state
const messageElement = document.getElementById('message');
let totalGames = 0; // Total games to play
let xWins = 0; // Count of X wins
let oWins = 0; // Count of O wins
let currentGame = 0; // Track the current game number

// Winning combinations
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Start the game after player names are entered
function startGame() {
    playerXName = document.getElementById('playerX').value || 'Player X';
    playerOName = document.getElementById('playerO').value || 'Player O';
    totalGames = parseInt(document.getElementById('numGames').value);

    document.getElementById('playerInput').style.display = 'none'; // Hide input form
    document.getElementById('gameBoard').style.display = 'grid'; // Show game board
    document.getElementById('message').style.display = 'block'; // Show message
    document.getElementById('resetButton').style.display = 'block'; // Show reset button
    document.getElementById('nameButton').style.display = 'block'; // Show change names button

    messageElement.innerText = `${playerXName}'s Turn`; // Display Player X's turn
}

// Handle a player's move
function makeMove(index) {
    if (board[index] === null && gameActive) {
        board[index] = currentPlayer;
        document.getElementById(`cell${index}`).innerText = currentPlayer;
        document.getElementById(`cell${index}`).classList.add('selected');

        // Check if the current player wins or if it's a tie
        if (checkWinner()) {
            const winnerName = currentPlayer === 'X' ? playerXName : playerOName;
            messageElement.innerText = `${winnerName} Wins! 🎉`;
            messageElement.style.color = '#fffa65';
            gameActive = false;
            updateScores();
        } else if (board.every(cell => cell !== null)) {
            messageElement.innerText = "It's a tie!";
            messageElement.style.color = '#ff6b6b';
            gameActive = false;
            updateScores();
        } else {
            // Switch players and update the message
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            const nextPlayerName = currentPlayer === 'X' ? playerXName : playerOName;
            messageElement.innerText = `${nextPlayerName}'s Turn`;
            messageElement.style.color = '#fff';
        }
    }
}

// Check for a winner
function checkWinner() {
    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return board[a] === currentPlayer && board[a] === board[b] && board[a] === board[c];
    });
}

// Update scores based on the winner
function updateScores() {
    if (currentPlayer === 'X') {
        xWins++;
    } else {
        oWins++;
    }
    currentGame++;

    if (currentGame < totalGames) {
        resetGame();
    } else {
        announceFinalWinner();
    }
}

// Announce the final winner after all games
function announceFinalWinner() {
    let finalMessage = `Final Scores:\n${playerXName}: ${xWins} wins\n${playerOName}: ${oWins} wins\n`;
    if (xWins > oWins) {
        finalMessage += `${playerXName} is the overall winner! 🎉`;
    } else if (oWins > xWins) {
        finalMessage += `${playerOName} is the overall winner! 🎉`;
    } else {
        finalMessage += "It's a tie overall!";
    }
    messageElement.innerText = finalMessage;
    messageElement.style.color = '#fff';
    gameActive = false;

    // Show the "Change Names" button after displaying the final score
    document.getElementById('nameButton').style.display = 'block'; 
    document.getElementById('resetButton').style.display = 'none'; // Hide reset button
}

// Reset the game
function resetGame() {
    board.fill(null); // Reset the board state
    gameActive = true; // Reactivate the game
    currentPlayer = 'X'; // Reset to Player X

    // Clear the board in the UI
    for (let i = 0; i < 9; i++) {
        document.getElementById(`cell${i}`).innerText = '';
        document.getElementById(`cell${i}`).classList.remove('selected');
    }

    messageElement.innerText = `${playerXName}'s Turn`; // Start with Player X
}

// Restart the game and re-enter names
function restartNames() {
    document.getElementById('playerInput').style.display = 'block'; // Show input form
    document.getElementById('gameBoard').style.display = 'none'; // Hide game board
    document.getElementById('message').style.display = 'none'; // Hide message
    document.getElementById('resetButton').style.display = 'none'; // Hide reset button
    document.getElementById('nameButton').style.display = 'block'; // Keep change names button visible

    // Reset board state
    board.fill(null);
    gameActive = true;
    currentPlayer = 'X';
    totalGames = 0; // Reset total games
    xWins = 0; // Reset X wins
    oWins = 0; // Reset O wins
    currentGame = 0; // Reset current game number
}
