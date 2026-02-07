// the cell function
function Cell() {
    //initial value
    let cellValue = 0;

    // get the cell value
    const getCellValue = () => cellValue;

    // set the cell value to player value
    const setCellValue = (playerValue) => {
        cellValue = playerValue;
        // console.log("yes")
    }

    return { getCellValue, setCellValue, cellValue };
}

// // the gamebord function
function Gameboard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    // get the board
    const getBoard = () => board;

    // creating the board
    for (let i = 0; i < rows; i++) {
        board[i] = [];

        for (let j = 0; j < columns; j++) {
            board[i].push(Cell());
            // console.log(board[i][j]);
        }
    }

    // select the cell 
    const selectCell = (row, col, player) => {
        board[row][col].setCellValue(player.value);
    }

    // print the board
    const printBoard = () => {
        const boardCellValues = board.map((row) => row.map((cell) => cell.getCellValue()));
        console.table(boardCellValues);
    }

    return { getBoard, selectCell, printBoard };
}

// game controller
function GameController(
    playerOne = "jamlaoui",
    playerTwo = "amraoui"
) {
    const board = Gameboard();

    const players = [
        {
            name: playerOne,
            value: 1
        },
        {
            name: playerTwo,
            value: 2
        }
    ];

    let activePlayer = players[0];
    
    const getActivePlayer = () => activePlayer;

    const switchPlayerTurn = () => {
        if (activePlayer === players[1]) {
            activePlayer = players[0];
        } else {
            activePlayer = players[1];
        }
    }

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    }

    const playRound = (row, col) => {
        console.log(`${activePlayer.name} shoose a cell (row: ${row}, column: ${col})`);
        board.selectCell(row, col, getActivePlayer());

        switchPlayerTurn();
        printNewRound();
    }

    printNewRound();

    return { getActivePlayer, playRound }
}

const game = GameController();
// game.selectCell(0, 0, 10);
// console.table(game.getBoard()[0][0].getCellValue());
// game.printBoard();