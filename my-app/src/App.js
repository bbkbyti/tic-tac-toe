import { useState } from 'react';

import Player from './components/Player';
import './App.css';

function App() {

  const [player, setPlayer] = useState({
    'X': 'Player 1',
    'O': 'Player 2',
  })

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
      <Player initialName='Player 1' symbol='X' onChangeName={handlePlayerNameChange} />
      <Player initialName='Player 2' symbol='O' onChangeName={handlePlayerNameChange} />
    </div>
  );
}

export default App;
