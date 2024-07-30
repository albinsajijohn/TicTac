function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        person1: params.get('player1'),
        person2: params.get('player2')
    };
}

const { person1, person2 } = getQueryParams();
const playerNamesElement = document.getElementById('playerNames');
playerNamesElement.textContent = `Player 1: ${person1} (X), Player 2: ${person2} (O)`;

class Player{
    constructor(name, marker){
        this.name=name;
        this.marker=marker; 
}
}
Player.prototype.returnName = function() {
    return (this.name);
}; 
const player1 = new Player(person1,"X");
const player2 = new Player(person2,"O");
console.log(player1.returnName());
console.log(player2.returnName());
console.log(Object.getPrototypeOf(player2) === Player.prototype); 
    
const boardElement = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const restartButton = document.getElementById('restartButton');
const statusElement = document.getElementById('status');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = player1;
let isGameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const handleCellClick = (e) => {
    const cell = e.target;
    const index = cell.getAttribute('data-index');

    if (board[index] !== '' || !isGameActive) {
        return;
    }

    board[index] = currentPlayer.marker;
    cell.innerText = currentPlayer.marker;

    if (checkWin()) {
        statusElement.innerText = `Player ${currentPlayer.name} wins!`;
        isGameActive = false;
    } else if (board.every(cell => cell !== '')) {
        statusElement.innerText = `It's a draw!`;
        isGameActive = false;
    } else {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
        statusElement.innerText = `Player ${currentPlayer.name}'s turn`;
    }
};

function checkWin() {
    return winningConditions.some(condition => {
        return condition.every(index => {
            return board[index] === currentPlayer.marker;
        });
    });
};

const restartGame = () => {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = player1;
    isGameActive = true;
    statusElement.innerText = `Player ${currentPlayer.name}'s turn`;
    cells.forEach(cell => cell.innerText = '');
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);
statusElement.innerHTML = `Player ${currentPlayer.name}'s turn`;
