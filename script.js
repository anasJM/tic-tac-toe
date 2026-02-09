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

    const setCellValueToZero = () => {
        cellValue = 0;
    }

    return { getCellValue, setCellValue, setCellValueToZero };
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

    // reset the board
    const resetBoard = () => {
        board.forEach(element => {
            console.log("row")
            element.forEach(value => {
                value.setCellValueToZero();
                console.log(value.getCellValue())
            });
        });

        console.log("form reset board methoooooooooood!")
        // console.table(board);
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

    return { getBoard, selectCell, printBoard, resetBoard};
}





// game controller
function GameController() {
    const board = Gameboard();

    const players = [
        {
            name: "player 1",
            value: 1
        },
        {
            name: "player 2",
            value: 2
        }
    ];

    // inisialize winner object
    let winner = {};

    // active player
    let activePlayer = players[0];

    // set player one
    const setPlayerOneName = (player) => players[0].name = player;

    // set player two
    const setPlayerTwoName = (player) => players[1].name = player;

    // getter winner
    const getWinner = () => winner;
    
    // getter active player
    const getActivePlayer = () => activePlayer;

    // switch player turn method
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

    // play round method
    const playRound = (row, col) => {
        if (board.getBoard()[row][col].getCellValue() === 0 && Object.keys(winner).length === 0) {
            board.selectCell(row, col, getActivePlayer());
            switchPlayerTurn();
            printNewRound();
            checkWinner();
        }
    }

    // play again and reset the board
    const resetGame = () => {
        board.resetBoard();
        winner = {};
        activePlayer = players[0];
        resetButton.style.display = "none";
        console.log("game reset!");
    }

    // cheking who's the winner winner chicken dinner
    const checkWinner = () => {
        let checkboard = board.getBoard();

        let row0col0 = checkboard[0][0].getCellValue();
        let row0col1 = checkboard[0][1].getCellValue();
        let row0col2 = checkboard[0][2].getCellValue();
        let row1col0 = checkboard[1][0].getCellValue();
        let row1col1 = checkboard[1][1].getCellValue();
        let row1col2 = checkboard[1][2].getCellValue();
        let row2col0 = checkboard[2][0].getCellValue();
        let row2col1 = checkboard[2][1].getCellValue();
        let row2col2 = checkboard[2][2].getCellValue();

        if (row0col0 === row0col1 && row0col1 === row0col2 && row0col0 !== 0) {
            console.log(winner);
            winner = activePlayer;
        } else if (row1col0 === row1col1 && row1col1 === row1col2 && row1col0 !== 0) {
            switchPlayerTurn()
            winner = activePlayer;
            console.log(winner);
        } else if (row2col0 === row2col1 && row2col1 === row2col2 && row2col0 !== 0) {
            switchPlayerTurn()
            winner = activePlayer;
            console.log(winner);
        } else if (row0col0 === row1col0 && row1col0 === row2col0 && row0col0 !== 0) {
            switchPlayerTurn()
            winner = activePlayer;
            console.log(winner);
        } else if (row0col1 === row1col1 && row1col1 === row2col1 && row0col1 !== 0) {
            switchPlayerTurn()
            winner = activePlayer;
            console.log(winner);
        } else if (row0col2 === row1col2 && row1col2 === row2col2 && row0col2 !== 0) {
            switchPlayerTurn()
            winner = activePlayer;
            console.log(winner);
        } else if (row0col0 === row1col1 && row1col1 === row2col2 && row0col0 !== 0) {
            switchPlayerTurn()
            winner = activePlayer;
            console.log(winner);
        } else if (row0col2 === row1col1 && row1col1 === row2col0 && row0col2 !== 0) {
            switchPlayerTurn()
            winner = activePlayer;
            console.log(winner);
        } else if (row0col0 != 0 && row0col1 != 0 && row0col2 != 0 && row1col0 != 0 && row1col1 != 0 && row1col2 != 0 && row2col0 != 0 && row2col1 != 0 && row2col2 != 0) {
            winner = {draw: "draw"}
            console.log("draaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaw!!")
            resetButton.style.display = "block";
        }
    }

    printNewRound();

    return { getActivePlayer, playRound, resetGame, getWinner, setPlayerOneName, setPlayerTwoName, board }
}



// select turn's header & board div
    const turnHeader = document.querySelector(".turn");
    const boardSection = document.querySelector(".board");

    // get all the buttons
    const cells = document.querySelectorAll(".cell");

    // get the modal div
    const modal = document.querySelector(".modal");

    // get the reset buttons
    const resetButton = document.querySelector(".reset-button");

    // get the form
    const form = document.querySelector("form");




// screen controller
function screenController() {
    // form event listener
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        // get the data from the form
        const formData = new FormData(form);
        const playerOneName = formData.get("player-one");
        const playertwoName = formData.get("player-two");

        // replace the players name with the new ones
        game.setPlayerOneName(playerOneName);
        game.setPlayerTwoName(playertwoName);

        // hide the modal to show the board
        modal.style.display = "none"

        // update the screen
        updateScreen();
    })

    // game controller
    const game = GameController();


    // adding names method
    const addPlayersNames = () => {

    }

    //update screen method
    const updateScreen = () => {
        // get current player
        let activePlayer = game.getActivePlayer().name;
        let board = game.board.getBoard();

        // display the turn and the winner and if it's draw
        if (game.getWinner().draw) {
            turnHeader.textContent = "sheeeeeeesh! it's a tie."
        } else if (game.getWinner().name) {
            turnHeader.textContent = `${game.getWinner().name} wins!`;
            resetButton.style.display = "block";
        } else {
            // show the active player 
            turnHeader.textContent = `${activePlayer}'s turn!`;
        }

        // boardSection.innerHTML = "";

        //render the cells
        let row = 1;

        board.forEach(element => {
            let column = 1;
            element.forEach(value => {
                
                const button = document.querySelector(`[data-row="${row}"][data-column="${column}"]`)
                if (button) {
                    if (value.getCellValue() === 1) {
                        button.textContent = "X";
                    } else if(value.getCellValue() === 2) {
                        button.textContent = "O";
                    } else {
                        button.textContent = "";
                    }
                }
                
                column++;
            });
            row++;
        });
    }

    //clickHandlerBoard method
    const clickHandlerBoard = () => {
        // update the board
        updateScreen();

        cells.forEach(element => {
            // updateScreen();
            element.addEventListener("click", (event) => {
                rowCell = event.target.dataset.row -1
                colCell = event.target.dataset.column -1

                // playround
                game.playRound(rowCell, colCell)
                updateScreen()
                console.table(game.board.printBoard())
            })
        });
    }

    resetButton.addEventListener("click", (e) => {
        game.resetGame();
        updateScreen();
    })

    

    return { updateScreen, clickHandlerBoard }
}


screenController().clickHandlerBoard();