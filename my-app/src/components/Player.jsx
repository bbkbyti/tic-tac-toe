import { useState } from 'react';

export default function Player({ initialName, symbol, onChangeName, isActive }) {
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


    let editPlayerName = <span className='player-name'>{playerName}</span>;

    if (isEditing) {
        editPlayerName = <input type='text' required value={playerName} onChange={handleChange} />
    }

    return (
        <li className={isActive ? 'active' : undefined}>
            <span className='player'>
                {editPlayerName}
                <span className='player-symbol'>{symbol}</span>
                <button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
            </span>
        </li>
    )
}
