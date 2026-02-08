// the cell function
function Cell() {
    //initial value
    let cellValue = 0;

    // get the cell value
    const getCellValue = () => cellValue;

    // set the cell value to player value
    const setCellValue = (player) => {
        cellValue = player.value;
        // console.log("yes")
    }

    return { getCellValue, setCellValue };
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
        }
    }

    // select the cell 
    const selectCell = (row, col, player) => {
        board[row][col].setCellValue(player);
    }

    // print the board
    const printBoard = () => {
        const boardCellValues = board.map((row) => row.map((cell) => cell.getCellValue()));
        return boardCellValues;
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
        console.log(`${activePlayer.name} shoose a cell (row: ${row+1}, column: ${col+1})`);
        board.selectCell(row, col, getActivePlayer());

        switchPlayerTurn();
        printNewRound();
    }

    printNewRound();

    return { getActivePlayer, playRound, board }
}





// select turn's header & board div
const turnHeader = document.querySelector(".turn");
const boardSection = document.querySelector(".board");






// screen controller
function screenController() {
    const game = GameController();
    let activePlayer = game.getActivePlayer().name;
    let board = game.board.getBoard();

    //update screen method
    const updateScreen = () => {
        // show the active player 
        turnHeader.textContent = `${activePlayer}'s turn!`;

        boardSection.innerHTML = "";

        //render the cells
        let row = 1;
        board.forEach(element => {
            let column = 1;
            element.forEach(value => {
                boardSection.innerHTML += `
                    <button class="cell" data-row="${row}" data-column="${column}"></button>
                `;
                column++;
            });
            row++;

        });
    }

    //clickHandlerBoard method
    const clickHandlerBoard = () => {
        // update the board
        updateScreen();

        // get all the buttons
        const cells = document.querySelectorAll(".cell");

        cells.forEach(element => {
            element.addEventListener("click", (event) => {
                // switch player turn
                rowCell = event.target.dataset.row -1
                colCell = event.target.dataset.column -1

                // playround
                game.playRound(rowCell, colCell)

                console.table(game.board.printBoard())
            })
        });
    }

    return { updateScreen, clickHandlerBoard }
}


screenController().clickHandlerBoard();