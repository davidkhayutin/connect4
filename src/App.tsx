import React, { useState } from 'react';
import styled from 'styled-components';
import './App.css';


const BoardContainer = styled.div`
  background: #005eb3;
  background-image: linear-gradient(#3ca3ff,#005eb3);
  margin:auto;
  width: 800px;
  padding: 8px;
  margin-top: 20px;
  .one {
    background-color: red;
   
    background-image: linear-gradient(0deg, transparent 0, transparent 67.5px, #fff 67.5px, #fff 83.5px, transparent 83.5px, transparent 151px), linear-gradient(60deg, transparent 0, transparent 97.4304px, #fff 97.4304px, #fff 113.4304px, transparent 113.4304px, transparent 151px), linear-gradient(120deg, #800000 0, #800000 97.4304px, #fff 97.4304px, #fff 113.4304px, #800000 113.4304px, #800000 151px);
   
    :before {
      border: 8px solid #800000;
      background-image: linear-gradient(0deg, transparent 0, transparent 69.5px, #EBEBEB 69.5px, #EBEBEB 81.5px, transparent 81.5px, transparent 151px), linear-gradient(30deg, transparent 0, transparent 98.7104px, #EBEBEB 98.7104px, #EBEBEB 110.7104px, transparent 110.7104px, transparent 151px), linear-gradient(60deg, transparent 0, transparent 98.7104px, #EBEBEB 98.7104px, #EBEBEB 110.7104px, transparent 110.7104px, transparent 151px), linear-gradient(90deg, transparent 0, transparent 69.5px, #EBEBEB 69.5px, #EBEBEB 81.5px, transparent 81.5px, transparent 151px), linear-gradient(120deg, transparent 0, transparent 98.7104px, #EBEBEB 98.7104px, #EBEBEB 110.7104px, transparent 110.7104px, transparent 151px), linear-gradient(150deg, #6C0000 0, #6C0000 98.7104px, #EBEBEB 98.7104px, #EBEBEB 110.7104px, #6C0000 110.7104px, #6C0000 151px);
    }
    :after {
      content: "";
      background: #800000;
      color: #6C0000;
    }
  }
  .two {
    background-color: yellow;
    background-image: linear-gradient(0deg, transparent 0, transparent 67.5px, #fff 67.5px, #fff 83.5px, transparent 83.5px, transparent 151px), linear-gradient(60deg, transparent 0, transparent 97.4304px, #fff 97.4304px, #fff 113.4304px, transparent 113.4304px, transparent 151px), linear-gradient(120deg, #000099 0, #000099 97.4304px, #fff 97.4304px, #fff 113.4304px, #000099 113.4304px, #000099 151px);
    :before {
      border: 8px solid #000099;
      background-image: linear-gradient(0deg, transparent 0, transparent 69.5px, #EBEBEB 69.5px, #EBEBEB 81.5px, transparent 81.5px, transparent 151px), linear-gradient(30deg, transparent 0, transparent 98.7104px, #EBEBEB 98.7104px, #EBEBEB 110.7104px, transparent 110.7104px, transparent 151px), linear-gradient(60deg, transparent 0, transparent 98.7104px, #EBEBEB 98.7104px, #EBEBEB 110.7104px, transparent 110.7104px, transparent 151px), linear-gradient(90deg, transparent 0, transparent 69.5px, #EBEBEB 69.5px, #EBEBEB 81.5px, transparent 81.5px, transparent 151px), linear-gradient(120deg, transparent 0, transparent 98.7104px, #EBEBEB 98.7104px, #EBEBEB 110.7104px, transparent 110.7104px, transparent 151px), linear-gradient(150deg, #00016C 0, #00016C 98.7104px, #EBEBEB 98.7104px, #EBEBEB 110.7104px, #00016C 110.7104px, #00016C 151px);
    }
    :after {
      content: "";
      background: #000099;
      color: #00016C;
    }

  }
`

const Cell = styled.div`
  width: calc(800px / 7 - 8px);
  height: calc(800px / 7 - 8px);
  background: white;
  display: inline-block;
  box-sizing: border-box;
  border-radius: 50%; 
  margin: 4px;
  cursor:pointer;
  box-shadow: 0 0 0 5px #282828 inset, 0 0 0 10px #969696 inset, 0 0 6px rgba(255, 255, 255, 0.2);
  position: relative;
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.5), 0 0 3px 0 rgba(0, 0, 0, 0.4) inset;
  border-radius: 50%;
  background-size: 151px 151px;
  background-position: center center;
  :before {
    position: absolute;
    content: "";
    z-index: 1;
    width: calc(700px / 7 - 8px);
    height: calc(700px / 7 - 8px);
    border-radius: 50%;
    top: 0px;
    left: 0px;
    background-size: 151px 151px;
    background-position: center center;
  }
  :after {
    z-index: 2;
    position: absolute;
    text-align: center;
    font: bold 50px/111px Arial;
    white-space: pre;
    width: calc(720px / 7 - 20px);
    height: calc(720px / 7 - 20px);
    border-radius: 50%;
    top: 13px;
    left: 13px;;
    text-shadow: -1px -1px 0px rgba(0, 0, 0, 0.3), 1px 1px 0px rgba(255, 255, 255, 0.2);
  }
`

const Turn = styled.div`
  font-size: 40px;
  margin: 20px 0;
`

const Button = styled.button``

enum Player  {
 None = 0,
 One = 1,
 Two = 2
}

type Board = Player []

const intializeBoard = ():Board => {
  return [...Array(42)].map(() => Player.None)
}

function App() {
  const [board, setBoard] = useState<Board>(intializeBoard())
  const [playerOneTurn, setPlayerOneTurn] = useState<boolean>(true)
  const [winner, setWinner] = useState(0)

  const fetchColumnIndexes = (column:number): Player[] =>{
    return [...Array(6)].map((a, b) => {
      if(!b){return column};
      return column + (b * 7)
    })
  } 

  const findLowestIndex = ( column:number) => {
    return fetchColumnIndexes(column).sort((a,b) => b - a ).find(cell => !board[cell])
  }

  const checkColForFour = (col: number[]) => {
    if(winner) return
    const currentCol = col.map(idx => board[idx])
    
    let player = 0;
    let count = 0;

    currentCol.forEach((idx) => {
      if(!idx) return
      if(count >= 3 && idx === player){
        setWinner(player)
      }
      if(idx !== player){
        player = idx;
        count = 1
        return
      }
      count += 1
    })
  }

  const checkVertical =  () => {
    const allColumns = [...Array(7)].map((a, b) => fetchColumnIndexes(b))
    allColumns.forEach((col) => {
      checkColForFour(col)
    })
  }

  const checkHorizontal = () => {
    if(winner) return
    const allColumns = [...Array(6)].map((a,b) => [...Array(7)].map((c, d) => b * 7 + d ))
    allColumns.forEach((col) => {
      checkColForFour(col)
    })
  }

  const checkDiagnoal = (column: number, index: number) => {
    if(column <= 3){
      const boardSlice = [
        board[index],
        board[index + 7 - 1],
        board[index + 7 * 2 - 2],
        board[index + 7 * 3 - 3]
      ];
      console.log("boardslice 1",boardSlice)
    }

    if(column >= 3){
      const boardSlice = [
        board[index],
        board[index + 7 + 1],
        board[index + 7 * 2 + 2],
        board[index + 7 * 3 + 3]
      ];
      console.log("boardslice 2", boardSlice)
    }
  }



  const checkForWinner = () => {
    checkVertical()
    checkHorizontal()
  }


  const handleCellClick = (column: number) => {
    if(winner) return
    const lowestIndex= findLowestIndex(column) 
    if(lowestIndex || (lowestIndex === 0 && column === 0)){
      const value =  playerOneTurn? Player.One : Player.Two
      board[lowestIndex] = value
      checkDiagnoal(column, lowestIndex)
      setBoard(board)
      checkForWinner()
      setPlayerOneTurn(!playerOneTurn)
    }
  }

  const renderCell  = (player: Player, index: number) => {
     const classes = {0: "zero", 1: "one", 2: "two"}
    return <Cell key={index} onClick={()=>handleCellClick(index % 7)} className={classes[player]}/>
  }

  const renderCells = () => {
    return board.map((player, idx) => renderCell(player, idx))
  }
  
  const resetBoard = () => {
    setBoard(intializeBoard());
    setPlayerOneTurn(true)
    setWinner(0)
  }
  const tieGame = board.find((a) => a === Player.None) === undefined
  
  return (
    <div className="App">
      <BoardContainer>
        {renderCells()} 
      </BoardContainer>
      {tieGame && <Turn>Tie Game!</Turn>}
      {winner > 0 && <Turn>Player {winner} Wins!</Turn>}
      {!winner && !tieGame && <Turn>Go Player: {playerOneTurn? 1 : 2} </Turn>}
      <Button onClick={resetBoard}>Reset Game</Button>
    </div>
  );
}

export default App;
