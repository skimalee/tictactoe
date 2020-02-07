/*----- constants -----*/
const colors = {
    null: '',
    '1': 'O',
    '-1': 'X'
}

const WINNING_COMBOS = 
    [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
    ];

/*----- app's state (variables) -----*/
let gameBoard = 
[null, null, null,
 null, null, null,
 null, null, null];

let turn = 1;
let winner = null;

/*----- cached element references -----*/
let squares = document.querySelectorAll('td');
let msg = document.querySelector('h2')
let table = document.querySelector('table')

/*----- event listeners -----*/
for (let i=0; i < squares.length; i++) {
        squares[i].addEventListener('click', playerClick);
}

const button = document.querySelector('#replay');

button.addEventListener('click', resetGame);
    
/*----- functions -----*/
init();

function init() {
    gameBoard = 
        [null, null, null,
        null, null, null,
        null, null, null];

    turn = -1;
    winner = null;

   

    render();
}

function resetGame() {
    console.log('click')
    init();
}

function playerClick(evt) {
    if (!winner) {
        let tile = evt.target.id
        if (gameBoard[tile] === null) {
            gameBoard[tile] = turn;
            evt.target.innerText = colors[turn];
            winner = getWinner();
            turn *= -1;
            render();
            console.log(gameBoard)
        }
    }
}

function getWinner() {
    for (var i = 0; i < WINNING_COMBOS.length; i++) {
        if (Math.abs(gameBoard[WINNING_COMBOS[i][0]] + gameBoard[WINNING_COMBOS[i][1]] + gameBoard[WINNING_COMBOS[i][2]]) === 3) {
            winner = colors[turn];
            return gameBoard[WINNING_COMBOS[i][0]];
        }      
    }   
    if (gameBoard.includes(null)) {
        return null; 
    }
    return 'T';
}

function render() {
    if (winner === 'T') {
        msg.innerText = "It's a TIE!";
    } 

    if (winner === winner) {
        msg.innerText = `Congrats, Player ${colors[winner]}! You Win!`;
        

    } if (winner === null) {
        msg.innerText = `Player ${colors[turn]}, it's your turn!`;
        
    }
    
    gameBoard.forEach(function (tile, idx) {
       // console.log(squares[idx])
        if(!tile) {
            squares[idx].innerText = colors.null;
        }
        });
}

