/*----- constants -----*/
const colors = {
    null: 'white',
    '1': 'o',
    '-1': 'x'
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

let turn = -1;

let winner = null;

/*----- cached element references -----*/
let squares = document.querySelectorAll('td');
let msg = document.querySelector('h1')
let table = document.querySelector('table')

/*----- event listeners -----*/
for (let i=0; i < squares.length; i++) {
        squares[i].addEventListener('click', playerClick)
}
    

/*----- functions -----*/


function playerClick(evt) {
    let tile = evt.target.id
    if (gameBoard[tile] === null) {
        gameBoard[tile] = turn;
        turn *= -1;
        evt.target.innerText = colors[turn];
        winner = getWinner();
        render();
    }
}

function getWinner() {
    for (var i = 0; i < WINNING_COMBOS.length; i++) {
      if (Math.abs(gameBoard[WINNING_COMBOS[i][0]] + gameBoard[WINNING_COMBOS[i][1]] + gameBoard[WINNING_COMBOS[i][2]]) === 3) return gameBoard[WINNING_COMBOS[i][0]];
    }
    if (gameBoard.includes(null)) return null;
    return 'T';
  
}

// rendering the board

    squares.forEach(function (square) {
        square.style.backgroundColor = colors.null;
    });





// 5) Handle a player clicking a square:
// 	5.1) Obtain the index of the square that was clicked by either:
// 		5.1.1) "Extracting" the index from an id assigned to the element in the HTML, or
// 		5.1.2) Looping through the cached square elements using a for loop and breaking out when the current square element equals the event object's target.
// 	5.2) If the board has a value at the index, immediately return because that square is already taken.
// 	5.3) If winner is not null, immediately return because the game is over.
// 	5.4) Update the board array at the index with the value of turn.
// 	5.5) Flip turns by multiplying turn by -1 (flips a 1 to -1, and vice-versa).
// 	5.6) Set the winner variable if there's a winner:
// 		5.6.1) Loop through the each of the winning combination arrays defined.
// 		5.6.2) Total up the three board positions using the three indexes in the current combo.
// 		5.6.3) Convert the total to an absolute value (convert any negative total to positive).
// 		5.6.4) If the total equals 3, we have a winner! Set winner to the board's value at the index specified by the first index in the combo array. Exit the loop.
// 	5.7) If there's no winner, check if there's a tie:
// 		5.7.1) Set winner to 'T' if there are no more nulls in the board array.
// 	5.8) All state has been updated, so render the state to the page (step 4.2).
		

// 6) Handle a player clicking the replay button:
// 	6.1) Do steps 4.1 (initialize the state variables) and 4.2 (render)