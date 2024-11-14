import { useState } from 'react';

import Player from './components/Player';
import GameBoard from './components/GameBoard';
import Log from './components/Log.jsx';
import GameOver from './components/GameOver.jsx';

import { WINNING_COMBINATIONS } from './components/winning-combinations.js';

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2'
};

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

const derivedGameBoard = (gameTurns) => {
  let gameBoard = [...initialGameBoard.map(array => [...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }
  return gameBoard;
}

const derivedWinner = (gameBoard, player) => {
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
  return winner;
}

function App() {

  const [player, setPlayer] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);


  const activePlayer = derivedActivePlayer(gameTurns);

  const gameBoard = derivedGameBoard(gameTurns);
  // adding a brand new array instead of using initial array in memory!
  // making a deep copy for restart button logic to work



  const winner = derivedWinner(gameBoard, player);


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
      <div id='game-container'>
        <ol id='players' className='highlight-player'>
          <Player initialName={PLAYERS.X}
            symbol='X'
            onChangeName={handlePlayerNameChange}
            isActive={activePlayer === 'X'} />
          <Player initialName={PLAYERS.O}
            symbol='O'
            onChangeName={handlePlayerNameChange}
            isActive={activePlayer === 'O'} />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart} />}
        <GameBoard onSelectSquare={handleSelectSquare} activePlayerSymbol={activePlayer}
          board={gameBoard}
        />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
