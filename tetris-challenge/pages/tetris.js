const BOARD_X = 10
const BOARD_Y = 21

class Tetris {
    constructor() {
        this.board = Array(BOARD_Y).fill("").map(() => Array(BOARD_X).fill(0))
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