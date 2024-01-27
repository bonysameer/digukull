import React, { useState } from 'react';
import './App.css';
import Board from './components/Board';
import ScoreBoard from './components/ScoreBoard';
import ResetButton from './components/ResetButton';

function App() {

  const WIN_CONDITION = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ]

  const [board, setBoard] = useState(Array(9).fill(null));
  const [xplaying, setXPlaying] = useState(true);
  const [scores, setScores] = useState({xScore:0,oScore:0});
  const [gameOver, setGameOver] = useState(false);

  // const board = ['X','X','X','X','X','X','X','X','X']
  const handeleBoxClick = (boxindex) => {
    const updatedBoard = board.map((value, index)=>{
      if(index === boxindex){
        return xplaying === true ? "X" : "O";
      }
      else{
        return value;
      }
    })

    const winner = checkWinner(updatedBoard);

    if(winner){
      if(winner === "O"){
        let {oScore} = scores;
        oScore += 1;
        setScores({...scores, oScore})
      }
      else{
        let {xScore} = scores;
        xScore += 1;
        setScores({...scores, xScore})
      }
    }

  //  console.log(scores);
    checkWinner(updatedBoard)

    setBoard(updatedBoard);

    setXPlaying(!xplaying);
  }

  const checkWinner = (board) => {
    for(let i=0; i<WIN_CONDITION.length; i++){
      const [x,y,z] = WIN_CONDITION[i];

      if(board[x] && board[x] === board[y] && board[y] === board[z]){
        setGameOver(true)
        return board[x];
      }
    }
  }

  const resetBoard = () => {
    setGameOver(false);
    setBoard(Array(9).fill(null))
  }

  return (
    <div className="App">
      <ScoreBoard scores={scores} xplaying={xplaying}/>
      <Board board={board} onClick={gameOver ? resetBoard : handeleBoxClick}/>
      <ResetButton resetBoard={resetBoard}/>
      {/* <Box value={'x'} onClick={null} /> */}
    </div>
  );
}

export default App;
