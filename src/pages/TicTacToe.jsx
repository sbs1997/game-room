import React, { useState, useEffect } from 'react'
import Square from './ticTacToeComponents/Square'

function TicTacToe() {
    const squareIndex = [8, 3, 4, 1, 5, 9, 6, 7, 2]
    const [playerTurn, setPlayerTurn] = useState(true)
    const [playerPicks, setPlayerPicks] = useState([])
    const [computerPicks, setComputerPicks] = useState([])
    const [remainingPicks, setRemainingPicks] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9])
    const [gameOver, setGameOver] = useState(false)

    function pickSquare(id){
        console.log(playerTurn)
        setRemainingPicks(remainingPicks.filter((num)=>{
            return num !== id
        }))
        if (playerTurn){
            setPlayerPicks([...playerPicks, id])
        }
        else{
            setComputerPicks([...computerPicks, id])
        }
        setPlayerTurn(!playerTurn)
        console.log(playerPicks)
        console.log(computerPicks)
        console.log(remainingPicks)
    }

    function checkGame(){
        playerPicks.map((first)=>{
            playerPicks.filter((second)=>second!==first).map((second)=>{
                playerPicks.filter((third)=>{
                    return third !== second && third !== first
                }).map((third)=>{
                    if (first+second+third === 15){
                        endGame("You")
                    }
                })
            })
        })
        computerPicks.map((first)=>{
            computerPicks.filter((second)=>second!==first).map((second)=>{
                computerPicks.filter((third)=>{
                    return third !== second && third !== first
                }).map((third)=>{
                    if (first+second+third === 15){
                        endGame("The Computer")
                    }
                })
            })
        })
        if (remainingPicks.length === 0){
            endGame("Nobody")
        }
    }

    useEffect(()=>{
        checkGame()
    },[remainingPicks])


    function endGame(winner){
        console.log(`${winner} won!`)
        setGameOver(true)
    }

    function computerTurn(){
        setTimeout(()=>{
            
        }, 1000)
    }

    return (
        <div id="ticTacToeBoard">
            {squareIndex.map((id)=>{
                return(
                    <Square 
                    key={id} 
                    id={id} 
                    pickSquare={pickSquare}
                    playerPicks={playerPicks}
                    computerPicks={computerPicks}
                    gameOver={gameOver}
                    ></Square>
                )
                })
            }
        </div>
  )
}

export default TicTacToe