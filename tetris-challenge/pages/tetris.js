const BOARD_X = 10
const BOARD_Y = 21

const SHAPES = [
    [[1,1,1,1]],
]

class Tetris {
    constructor() {
        this.board = Array(BOARD_Y).fill("").map(() => Array(BOARD_X).fill(0))
        this.generatePiece()
    }

    generatePiece() {
        const shape = SHAPES[Math.floor(Math.random() * SHAPES.length)]
        this.piece = {
            x: BOARD_X/2,
            y: 0,
            shape,
        }

        for(let y = 0; y < shape.length; y++) {
            for(let x = 0; x < shape[0].length; x++) {
                const newY = this.piece.y + y
                const newX = this.piece.x + x
                this.board[newY][newX] = shape[y][x]
            }
        }
    }
}



const tetris = new Tetris()

const cellStyles = {
    width: '40px',
    height: '40px',
    border: '1px solid white',
}

export default function TetrisGame() {
    return (
        <>
            <h1>
                Tetris
            </h1>
            <div>
                {tetris.board.map((row, i) => (
                <div key={i} style={{ display: 'flex' }}>
                    {row.map((cell, j) => <div key={j} style={cellStyles}>{cell}</div>)}
                </div>
            ))}
            </div>
        </>
    )
}