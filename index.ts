import * as readlineSync from 'readline-sync'

let table: (string | number)[][] = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]
let currentPlayer: string = 'X'
let verification: boolean = false
let draw: boolean = false;

function showTable() {
    console.clear()
    for (let i = 0; i < 3; i++) {
        let row = '';
        for (let j = 0; j < 3; j++) {
            row += (typeof table[i][j] === 'number') ? table[i][j] : table[i][j];
            
            if (j < 2){
                row += ' | '; 
            } 
        }
        console.log(row);
        if (i < 2) {
            console.log('---------');
        }
    }
}

showTable()
function mark(d: number, player: string) {
    for (let l: number = 0; l < table.length; l++) {
        for (let c: number = 0; c < table.length; c++) {
            if (table[l][c] === d) {
                table[l][c] = player
                return
            }
        }
    }
}

function checkNotAvailable(numb: number): boolean {
    if(numb === 0 || isNaN(numb) ) {
        console.log('Comand not available! Try again!')
        return true
    } else {
        return false
    }
}

function checkDiagonals() {
    if (table[0][0] === currentPlayer &&
        table[1][1] === currentPlayer &&
        table[2][2] === currentPlayer ||
        table[2][0] === currentPlayer &&
        table[1][1] === currentPlayer &&
        table[0][2] === currentPlayer) {
        verification = true
    }
}

function checkLinesAndColums() {
    for (let i = 0; i < table.length; i++) {
        if (table[i][0] === currentPlayer &&
            table[i][1] === currentPlayer &&
            table[i][2] === currentPlayer ||
            table[0][i] === currentPlayer &&
            table[1][i] === currentPlayer &&
            table[2][i] === currentPlayer) {
            verification = true
        }
    }
}

function checkDraw() {

    if (verification === true) {
        return;
    }

    for (let i = 0; i < table.length; i++) {
        for (let j = 0; j < table[i].length; j++) {
            if (typeof table[i][j] === 'number' &&
                verification === false) {
                return
            }
        }
    }
    draw = true
    console.log('Draw')
}

do {
    verification = false;

    let numb: number = Number(readlineSync.question(`Player ${currentPlayer} enter number:  `))
    if(checkNotAvailable(numb)){
        continue
    }
    mark(numb, currentPlayer)
    showTable()
    
    checkDiagonals()
    checkLinesAndColums()
    
    if (verification && draw === false) {
        console.log(`Winner!: ${currentPlayer}`)
    }

    checkDraw()

    if (draw) {
        break
    }
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

} while (verification === false)
