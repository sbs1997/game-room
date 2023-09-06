import React, { useState, useEffect } from 'react'
import Square from './ticTacToeComponents/Square'

function TicTacToe() {
    const squareIndex = [8, 3, 4, 1, 5, 9, 6, 7, 2]
    const [playerTurn, setPlayerTurn] = useState(true)
    const [playerPicks, setPlayerPicks] = useState([])
    const [computerPicks, setComputerPicks] = useState([])
    const [remainingPicks, setRemainingPicks] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9])
    const [gameOver, setGameOver] = useState(false)
    const [gameWinner, setGameWinner] = useState("")

    function pickSquare(id){
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

    let localOver = gameOver
    function checkGame(){
        
        playerPicks.map((first)=>{
                playerPicks.filter((second)=>second!==first).map((second)=>{
                    playerPicks.filter((third)=>{
                        return third !== second && third !== first
                    }).map((third)=>{
                        if (first+second+third === 15 && !localOver){
                            localOver = true
                            console.log(gameOver)
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
                    if (first+second+third === 15 && !localOver){
                        localOver = true
                        endGame("The Computer")
                    }
                })
            })
        })

        if (remainingPicks.length === 0 && !localOver){
            endGame("Nobody")
            localOver = true
        }
    }

    //check the game whenever a pick is made
    useEffect(()=>{
        checkGame()
    },[remainingPicks])


    function endGame(winner){
        setGameOver(true)
        setGameWinner(winner)
    }

    function computerTurn(){
        if (playerPicks.length>0){
            setTimeout(()=>{
                if (!localOver){
                    pickSquare(computerSelection(playerPicks, computerPicks, remainingPicks))
                }
            }, 1000)
        }
    }

    //make the computer automatically take it's turn
    useEffect(computerTurn, [playerPicks])


    function computerSelection(player, computer, remaining){
        let ender = false
        let pick = 0
        //if computer can win win
        remaining.map((first)=>{
            computer.map((second)=>{
                computer.filter((third)=>{
                    return third !== second
                }).map((third)=>{
                    if (first+second+third === 15 && !ender){
                        console.log("i win!")
                        ender = true
                        pick = first
                    }
                })
            })
        })
        //if player can win stop them
        remaining.map((first)=>{
            player.map((second)=>{
                player.filter((third)=>{
                    return third !== second
                }).map((third)=>{
                    if (first+second+third === 15 && !ender){
                        console.log("you're not winning today")
                        ender = true
                        pick = first
                    }
                })
            })
        })
        //if computer can make a fork then do it
        remaining.map((first)=>{
            computer.map((second)=>{
                remaining.filter((third)=>{
                    return third !== first
                }).map((third)=>{
                    if (first+second+third === 15){
                        remaining.filter((fourth)=>{
                            return fourth !== first && fourth !==third
                        }).map((fourth)=>{
                            computer.map((fifth)=>{
                                if (first+fifth+fourth === 15 && !ender){
                                    console.log("you've been forked!")
                                    ender = true
                                    pick = first
                                }
                            })
                        })
                    }
                })
            })
        })
        //if center is open return center
        if (remaining.includes(5) && !ender){
            console.log("center")
            ender = true
            pick = 5
        }
        for (let i=2; i<9; i+=2){
            if (player.includes(10-i) && remaining.includes(i) && !ender){
                console.log("opposite corner")
                ender =  true
                pick = i
            }
        }
        //if there is an open corner take it
        for (let i=2; i<9; i+=2){
            if (remaining.includes(i) && !ender){
                console.log('taken cause it was a corner')
                ender = true
                pick = i
            }
        }
        //take a side spot if you can
        for (let i=1; i<10; i+=2){
            if (remaining.includes(i) && !ender){
                console.log("side spot")
                ender = true
                pick = i
            }
        }
        return pick
    }

    return (
        <>
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
        {/* debbugging tool that you can click to log the computers selection in a position */}
        {/* <button onClick={()=>console.log(computerSelection(playerPicks, computerPicks, remainingPicks))}>log computer selection</button> */}
        <p id='endgameText'>{gameOver ? `${gameWinner} won!` : ""}</p>
        </>
  )
}

export default TicTacToe