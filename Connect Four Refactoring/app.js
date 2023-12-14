class Cell {
    constructor() {
        this.color = null;
    }
}

class Board {
    constructor() {
        this.cells = Array(6).fill().map(() => Array(7).fill().map(() => new Cell()));
    }

    checkWin() {
        for (let row = 0; row < 6; row++) {
            for (let col = 0; col < 7; col++) {
                const color = this.cells[row][col].color;
                if (color && 
                    ((this.cells[row][col+1]?.color === color && this.cells[row][col+2]?.color === color && this.cells[row][col+3]?.color === color) ||
                    (this.cells[row+1]?.[col]?.color === color && this.cells[row+2]?.[col]?.color === color && this.cells[row+3]?.[col]?.color === color) ||
                    (this.cells[row+1]?.[col+1]?.color === color && this.cells[row+2]?.[col+2]?.color === color && this.cells[row+3]?.[col+3]?.color === color) ||
                    (this.cells[row+1]?.[col-1]?.color === color && this.cells[row+2]?.[col-2]?.color === color && this.cells[row+3]?.[col-3]?.color === color))) {
                    return color;
                }
            }
        }
        return null;
    }
}

class Game {
    constructor() {
        this.board = new Board();
        this.currentColor = prompt("Player 1, enter your color:");
        this.player1Color = this.currentColor;
        this.player2Color = prompt("Player 2, enter your color:");
    }

    play(column) {
        for (let row = 5; row >= 0; row--) {
            if (!this.board.cells[row][column].color) {
                this.board.cells[row][column].color = this.currentColor;
                this.currentColor = this.currentColor === this.player1Color ? this.player2Color : this.player1Color;
                break;
            }
        }
        const winner = this.board.checkWin();
        if (winner) {
            alert(winner + ' won!');
        }
        this.render();
    }

    render() {
        const boardDiv = document.getElementById('board-container');
        boardDiv.innerHTML = '';

        for (let column = 0; column < 7; column++) {
            const button = document.createElement('button');
            button.textContent = 'Drop';
            button.addEventListener('click', () => this.play(column));
            boardDiv.appendChild(button);
        }

        for (let row = 0; row < 6; row++) {
            for (let column = 0; column < 7; column++) {
                const cellDiv = document.createElement('div');
                cellDiv.classList.add('cell');
                if (this.board.cells[row][column].color) {
                    cellDiv.style.backgroundColor = this.board.cells[row][column].color;
                }
                boardDiv.appendChild(cellDiv);
            }
        }
    }
}

const game = new Game();
game.render();