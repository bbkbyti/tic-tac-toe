import { useState } from 'react';
import './App.css';

import Player from './components/Player';
import GameBoard from './components/GameBoard';

const derivedActivePlayer = (gameTurns) => {
  let currentPlayer = 'X';

  return currentPlayer;
}


function App() {

  const [player, setPlayer] = useState({
    'X': 'Player 1',
    'O': 'Player 2',
  })

  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = derivedActivePlayer(gameTurns);

  const handleSelectSquare = (rowIndex, colIndex) => {
    setGameTurns(prevTurns => {
      const currentPlayer = derivedActivePlayer(prevTurns);
      const updatedTurns = [
        { square: { row: rowIndex, col: ColIndex }, player: currentPlayer },
        ...prevTurns
      ]
      return updatedTurns;
    })
  }

  const handlePlayerNameChange = (symbol, newName) => {
    setPlayer(prevPlayer => {
      return {
        ...prevPlayer,
        [symbol]: newName
      }
    })
  }
  return (
    <div className="App">
      <Player initialName='Player 1'
        symbol='X'
        onChangeName={handlePlayerNameChange}
        isActive={activePlayer} />
      <Player initialName='Player 2'
        symbol='O'
        onChangeName={handlePlayerNameChange}
        isActive={activePlayer} />
      <GameBoard />
    </div>
  );
}

export default App;
