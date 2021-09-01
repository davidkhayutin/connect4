import { randomInt } from 'crypto';
import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti'

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
  .winner {
    -webkit-animation: 2s rotate-right linear infinite;
    animation: 2s rotate-right linear infinite;
  }
  @-webkit-keyframes rotate-right {
    0% {
      -webkit-transform: rotate(0deg);
              transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
              transform: rotate(360deg);
    }
  }
  
  @keyframes rotate-right {
    0% {
      -webkit-transform: rotate(0deg);
              transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
              transform: rotate(360deg);
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
const Title = styled(Turn)`

 color: blue
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
  const [winnigIndexs, setWinningIndexes] = useState<number[]>([])
  const [computer, setComputer] = useState(false)
  const [easy, setEasy] = useState(true)

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
    currentCol.forEach((idx, x) => {
      if(count >= 3 && idx === player && idx ){
        // eslint-disable-next-line array-callback-return
        setWinningIndexes(col.filter(a => {
          const possibleIndex = (board[a - 1] === player || board[a +1] === player) || (board[a - 7] === player || board[a + 7] === player)
          if(board[a] === player && possibleIndex){
            return a
          }
        }))
        setWinner(player)
        return
      }
      if(idx !== player){
        player = idx;
        count = 1
        return
      }
      count += 1

    })
  }

  const checkColForThree = () => {

    
    let nextCol: any;

    // all vertical 
    const allColumns = [...Array(7)].map((a, b) => fetchColumnIndexes(b))

    allColumns.forEach((vCol) => {
      if(nextCol !== undefined) return
      const currentCol = vCol.map(idx => board[idx])
      let count = 0;
    
      currentCol.forEach((idx, x) => {
        if(idx !== 1) return;
        if(count >= 2 && !currentCol.includes(2)){
          nextCol = vCol[0]
        }
        count += 1
      })
    })

    // horizontal
    if(!nextCol){
      const allColumns = [...Array(6)].map((a,b) => [...Array(7)].map((c, d) => b * 7 + d ))
      allColumns.forEach((col) => {
        if(nextCol !== undefined) return
        const currentCol = col.map(idx => board[idx])
        let count = 0;
    
        currentCol.forEach((idx, x) => {
          if(idx !== 1) {
            count = 0
            return
          }
          if(count >= 2){
            console.log(currentCol)

            nextCol = currentCol[idx - 1] === 0? currentCol[idx - 1] : currentCol[idx + 1]
            return
          }

          count += 1
        })

      })  
    }

    return nextCol
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

  const checkDiagnoal = () => {
    if(winner) return
    for (let r = 0; r <= 2; r++) {
      for (let c = 0; c < 7; c++) {
        const index = r * 7 + c;
          const boardSlice2 = [
          board[index],
          board[index + 7 - 1],
          board[index + 7 * 2 - 2],
          board[index + 7 * 3 - 3]];
          const arraySet1 = new Set(boardSlice2)
          if(arraySet1.size === 1 && (arraySet1.has(1) ||arraySet1.has(2))){
            const value = arraySet1.has(1)? 1 : 2
            setWinningIndexes([index, index + 7 - 1,index + 7 * 2 - 2 , index + 7 * 3 - 3])
            setWinner(value)
            return
          } 
          
        const boardSlice = [
          board[index],
          board[index + 7 + 1],
          board[index + 7 * 2 + 2],
          board[index + 7 * 3 + 3]];
          
          const arraySet = new Set(boardSlice)
         
          if(arraySet.size === 1 && (arraySet.has(1) ||arraySet.has(2))){
            const value = arraySet.has(1)? 1 : 2
            setWinningIndexes([index, index + 7 + 1,index + 7 * 2 + 2 , index + 7 * 3 + 3])
            setWinner(value)
            return
          }     
      }
    }
  }

  const checkForWinner = () => {
    checkVertical()
    checkHorizontal()
    checkDiagnoal()
  }


  const handleCellClick = (column: number) => {
    if(computer && !playerOneTurn) return
    if(winner) return
    const lowestIndex= findLowestIndex(column) 
    if(lowestIndex || (lowestIndex === 0 && column === 0)){
      const value =  playerOneTurn? Player.One : Player.Two
      board[lowestIndex] = value
      
      setBoard(board)
      checkForWinner()
      setPlayerOneTurn(!playerOneTurn)
    }
  }



  const handleCellClickComputer = (column: number) => {
    const stopWin = checkColForThree(); // will need to change to work  with all vertical and horizontal 

    if(stopWin || stopWin === 0){
      const lowestIndex = findLowestIndex(stopWin) 
      if(lowestIndex){
        board[lowestIndex] = Player.Two
        setBoard(board);
        checkForWinner();
        setPlayerOneTurn(!playerOneTurn);
      }
      return
    }
    if(winner) return
    const lowestIndex= findLowestIndex(column) 
    if(lowestIndex || (lowestIndex === 0 && column === 0)){
      const value =  playerOneTurn? Player.One : Player.Two
      board[lowestIndex] = value
      
      setBoard(board)
      checkForWinner()
      setPlayerOneTurn(!playerOneTurn)
    }
  }

  const renderCell  = (player: Player, index: number) => {
     const classes = {0: "zero", 1: "one", 2: "two"}
     const isWinningNumber = winnigIndexs.includes(index) ? "winner" :""
    return <Cell key={index} onClick={()=>handleCellClick(index % 7)} className={`${classes[player]} ${isWinningNumber}`}/>
  }

  const renderCells = () => {
    return board.map((player, idx) => renderCell(player, idx))
  }
  
  const resetBoard = () => {
    setBoard(intializeBoard());
    setPlayerOneTurn(true)
    setWinner(0)
    setWinningIndexes([])
  }

  const tieGame = board.find((a) => a === Player.None) === undefined

  useEffect(()=> {

    if (!playerOneTurn && computer) {
      const rndInt = Math.floor(Math.random() * 6) + 1;
      setTimeout(() => {
        handleCellClickComputer(rndInt)
      },2000)

    }
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[playerOneTurn])

  const switchMode = () => {
    resetBoard()
    setComputer(!computer)
    setEasy(true)
  }
  
  return (
    <div className="App">
      <Title>Connect FOUR</Title>
      {winner > 0 && <Confetti width={2000} height={1500} />}
      <BoardContainer>
        {renderCells()} 
      </BoardContainer>
      {tieGame && <Turn>Tie Game!</Turn>}
      {winner > 0 && <Turn>Player {winner} Wins!</Turn>}
      {!winner && !tieGame && <Turn>Go Player: {playerOneTurn? 1 : 2} </Turn>}
      <Button onClick={resetBoard}>Reset Game</Button>
      <form>
       <input type="checkbox" name="comp" onChange={switchMode}/>
       <label> Vs. Computer</label>
      </form>
    {computer && <form>
       <input type="checkbox" name="comp" onChange={()=>setEasy(true)} checked={easy}/>
       <label>Easy</label>
       <input type="checkbox" name="comp" onChange={()=>setEasy(false)} checked={!easy} />
       <label>Hard</label>
      </form>}
     
    </div>
  );
}

export default App;
