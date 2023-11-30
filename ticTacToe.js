const readline = require('readline'); // import readline module, which is part of the Node.js standard library
const { stdin: input, stdout: output } = require('node:process'); 

const rl = readline.createInterface({ input, output }); // Create readline Interface 

// rl.question('What do you think of Node.js? ', (answer) => {
//   // TODO: Log the answer in a database
// //   console.log(`Thank you for your valuable feedback: ${answer}`);
//   rl.close();
// }
// );

// rl.on('line', (input) => {
//     console.log(`Received: ${input}`);
//     rl.close(); 
// }); 


//  Print the Board 
// input: board array 
const printBoard = (board) => { 
     console.clear();
    for (let row of board) {
        console.log(row.join(' | ')); 
        console.log('-'.repeat(10));
    }
}; 

//  > check for a winner :  by examining the rows, columns and diagonals of the board 
const checkWinner = (board, player) => { 
    for (let i = 0; i < 3; i++) {
        if (board[i].every(cell => cell === player) || board.every(cell => cell === player)) return true; 
    }
    if (board[0][0] === player && board[1][1] === player && board[2][2] === player || board[0][2] === player && board[1][1] === player && board[2][0] === player) return true;
    return false; 
}; 

// isBoardFull, check to see if player has won
const isBoardFull = (board) => { 
    return board.every(row => row.every(cell => cell !== ' ')); 
}; 

const ticTacToe = () => {
    const board = [
  [' ', ' ', ' '],
  [' ', ' ', ' '],
  [' ', ' ', ' ']
    ];
let currentPlayer = 'X';
    

// player enters a move :  checks if the move is valid, update the board, and checks for a winner or a draw.
const makeMove = (move) => { 
    const [row, col] = move.split(' ').map(Number); 

    if (board[row][col] === ' ') {
        board[row][col] = currentPlayer; 

        // check if winner has wone if so log out winner and close rl.
        if (checkWinner(board, currentPlayer)) {
            printBoard(board); 
            console.log(`Player ${currentPlayer} wins!`);
            rl.close();
            
        } else if (isBoardFull(board)) {
            printBoard(board); 
            console.log('Its a draw'); 
            rl.close(); 
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            playerTurn(); 
        }
    } else {
        console.log('Invalid move. Try Again.'); 
        playerTurn(); 
    }
};
    
    
// initate a players turn by printint the current state of the board and prompt the current player to enter a move using rl.question
const playerTurn = () => {
  printBoard(board); 
  rl.question(`Player ${currentPlayer}, enter your move (row col): `, makeMove);
}

  playerTurn();
}

ticTacToe();  
