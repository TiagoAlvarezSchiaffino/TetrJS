import { useEffect, useState } from "react"

const BOARD_X = 10
const BOARD_Y = 21

const SHAPES = [
    [[1,1,1,1]],
    [
        [1, 1],
        [1, 1],
    ]
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

        this.place()

    }

    place({ remove = false, stick = false } = {}) {
        const { shape } = this.piece
        for(let y = 0; y < shape.length; y++) {
            for(let x = 0; x < shape[0].length; x++) {
                const newY = this.piece.y + y
                const newX = this.piece.x + x
                this.board[newY][newX] = remove ? 0 : stick ? 2 : shape[y][x]
            }
        }
    }

    check({ dx, dy }) {
        const { shape } = this.piece
        for(let y = 0; y < shape.length; y++) {
            for(let x = 0; x < shape[0].length; x++) {
                const newY = this.piece.y + y + dy
                const newX = this.piece.x + x + dx
                
                if (newX < 0 || newX >= BOARD_X) { return false }
                if (newY >= BOARD_Y) { return false }

                if (this.board[newY][newX] === 2) { return false }
            }
    }
    return true
}

    clearLines() {
        this.board.forEach((row, i) => {
            if (row.every(cell => cell === 2)) {
                this.board.splice(i, 1)
                this.board.unshift(array(BOARD_X).fill(0))
            }
        })
    }

    move({ dx = 0, dy = 0 }) {

        const valid = this.check({ dx, dy })

        if (!valid && dy) {
            this.place({ stick: true })
            this.clearLines()
            this.generatePiece()
            return
        }

        if (!valid) {
            return
        }
        this.place({ remove: true })
        this.piece.x += dx
        this.piece.y += dy
        this.place()
    }
}



const tetris = new Tetris()

const cellStyles = (cell) => ({
    width: '40px',
    height: '40px',
    border: '1px solid white',
    backgroundColor: cell === 1 ? 'silver' : cell === 2 ? 'red' : 'black'
})

export default function TetrisGame() {
    const [_, render] = useState({})

    useEffect(() => {
        const keyDownHandler = (e) => {
            console.log('key', e)
            if (e.key === 'ArrowDown') {
                tetris.move({ dy: 1 })
            }
            if (e.key === 'ArrowLeft') {
                tetris.move({ dx: -1 })
            }
            if (e.key === 'ArrowRight') {
                tetris.move({ dx: 1 })
            }
            render({})
        }
        document.addEventListener('keydown', keyDownHandler)

        return () => document.removeEventListener('keydown', keyDownHandler)
    })

    return (
        <>
            <h1>
                Tetris
            </h1>
            <div>
                {tetris.board.map((row, i) => (
                <div key={i} style={{ display: 'flex' }}>
                    {row.map((cell, j) => <div key={j} style={cellStyles(cell)} />)}
                </div>
            ))}
            </div>
        </>
    )
}