import { useState } from 'react';
import './App.css';

import Player from './components/Player';
import GameBoard from './components/GameBoard';

import { WINNING_COMBINATIONS } from './components/winning-combinations.js';

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
]

const derivedActivePlayer = (gameTurns) => {
  let currentPlayer = 'X';

  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }
  return currentPlayer;
}


function App() {

  const [player, setPlayer] = useState({
    'X': 'Player 1',
    'O': 'Player 2',
  })
  const [gameTurns, setGameTurns] = useState([]);


  const activePlayer = derivedActivePlayer(gameTurns);
  let gameBoard = initialGameBoard;

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];


    if (firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol) {
      winner = player[firstSquareSymbol];
    }
  }

  const hasDraw = gameTurns.length === 9 && !winner;

  const handleSelectSquare = (rowIndex, colIndex) => {
    setGameTurns(prevTurns => {
      const currentPlayer = derivedActivePlayer(prevTurns);
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns
      ]
      return updatedTurns;
    })
  }

  const handleRestart = () => {
    setGameTurns([]);
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
    <main>
      <div className="App">
        <ol>
          <Player initialName='Player 1'
            symbol='X'
            onChangeName={handlePlayerNameChange}
            isActive={activePlayer} />
          <Player initialName='Player 2'
            symbol='O'
            onChangeName={handlePlayerNameChange}
            isActive={activePlayer} />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart} />}
        <GameBoard onSelectSquare={handleSelectSquare} activePlayerSymbol={activePlayer}
          board={gameBoard}
        />
      </div>
      <Log />
    </main>
  );
}

export default App;
