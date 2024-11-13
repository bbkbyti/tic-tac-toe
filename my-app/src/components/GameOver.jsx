import React from 'react'

export default function GameOver({ winner, onRestart }) {
    return (
        <div>
            <h2>Game Over!</h2>
            {winner && <p>{winner} Won!</p>}
            {!winner && <p>It's Draw!</p>}
            <p>
                <button onClick={onRestart}>Restart!</button>
            </p>
        </div>
    )
}
