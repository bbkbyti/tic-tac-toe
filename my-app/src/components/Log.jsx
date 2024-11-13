import React from 'react'

export default function Log({ turns }) {
    return (
        <ol>
            {turns.map(turn =>
                <li key={`${turn.square.row}${turn.square.col}`} >
                    {turn.player} SELECTED {turn.square.row},{turn.square.col}
                </li>
            )}
        </ol>
    )
}
