import { useState } from 'react';

export default function Player({ initialName, symbol, onChangeName }) {
    const [playerName, setPlayerName] = useState(initialName);
    const [isEditing, setIsEditing] = useState(false);

    const handleEditClick = () => {
        setIsEditing((editing) => !editing);

        if (isEditing) {
            onChangeName(symbol, playerName)
        }
    }

    const handleChange = (e) => {
        setPlayerName(e.target.value);
    }

    if (isEditing) {
        editPlayerName = <input type='text' required value={playerName} onChange={handleChange} />
    }
    let editPlayerName = <span>{playerName}</span>
    return (
        <div></div>
    )
}
