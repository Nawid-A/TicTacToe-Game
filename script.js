function TicTacToe() {
    let board = new Array(3).fill(null).map(() => new Array(3).fill(0));
    let winner = 0;
    let count = 0;
    let player = true; // true for Player 1, false for Player 2

    document.querySelectorAll('.cell').forEach(cell => {
        cell.addEventListener('click', function() {
            const row = parseInt(cell.getAttribute('data-row')) - 1; // Adjust index since data attributes are 1-based
            const col = parseInt(cell.getAttribute('data-col')) - 1;

            if (board[row][col] !== 0 || winner !== 0) {
                console.log("Spot selected is already taken or game has ended, try another one or restart the game.");
                return;
            }

            board[row][col] = player ? 1 : 2;
            cell.textContent = player ? 'X' : 'O'; // Visual update for the cell
            count++;
            winCheck(row, col, player ? 1 : 2);
            player = !player;

            if (count === 9 && winner === 0) {
                let text= document.getElementById('winner');
                text.innerHTML="Tie game!";
            } else if (winner !== 0) {
                let text= document.getElementById('winner');
                text.innerHTML= `Player ${winner === 1 ? 1 : 2} wins!`;
            }
        });
    });

    function winCheck(row, col, playerMark) {
        // Checking rows, columns, and diagonals for a win
        let checkRow = true, checkCol = true;
        let checkDiag1 = true, checkDiag2 = true;

        for (let i = 0; i < 3; i++) {
            if (board[row][i] !== playerMark) checkRow = false;
            if (board[i][col] !== playerMark) checkCol = false;
            if (board[i][i] !== playerMark) checkDiag1 = false;
            if (board[i][2-i] !== playerMark) checkDiag2 = false;
        }

        if (checkRow || checkCol || (row === col && checkDiag1) || (row + col === 2 && checkDiag2)) {
            winner = playerMark;
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const game = TicTacToe(); // Start the game when the DOM is fully loaded
});
 