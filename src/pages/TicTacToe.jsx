import React, { useState, useEffect } from 'react'
import Square from './ticTacToeComponents/Square'
import useUserIdStore from '../hooks/userIDStore'

function TicTacToe() {
    const squareIndex = [8, 3, 4, 1, 5, 9, 6, 7, 2]
    const [playerTurn, setPlayerTurn] = useState(false)
    const [playerPicks, setPlayerPicks] = useState([])
    const [computerPicks, setComputerPicks] = useState([])
    const [remainingPicks, setRemainingPicks] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9])
    const [gameOver, setGameOver] = useState(false)
    const [gameWinner, setGameWinner] = useState("")
    const { userId, setUserId } = useUserIdStore()
    const [user, setUser] = useState({})
    const [started, setStarted] = useState(false)
    const [hardMode, setHardMode] = useState(true)
    const [taunts, setTaunts] = useState(`${hardMode ? "Feeling brave enough to play on hard mode? We'll see how that goes for you..." : "Only a coward would use easy mode?"}`)


    //get the active user so that we can properly update the score
    useEffect(()=>{
        fetch(`http://localhost:3000/users/${userId}`)
        .then(r=>r.json())
        .then(data=>setUser(data))
    }, [])

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
        // console.log(playerPicks)
        // console.log(computerPicks)
        // console.log(remainingPicks)
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
        let update = {}
        if (winner === "You"){update = {tttWins: user.tttWins+1}}
        if (winner === "The Computer"){update = {tttLosses: user.tttLosses+1}}
        if (winner === "Nobody"){update = {tttDraws: user.tttDraws+1}}

        fetch(`http://localhost:3000/users/${userId}`, {
            headers: { "Content-Type": "application/json"},
            method: "PATCH",
            body: JSON.stringify(update)
        })
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
                        setTaunts("I win!")
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
                        setTaunts("You're not winning today")
                        ender = true
                        pick = first
                    }
                })
            })
        })
        //if computer can make a fork then do it only if hardmode is enabled
        if (hardMode){
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
                                        setTaunts("You've been forked!")
                                        ender = true
                                        pick = first
                                    }
                                })
                            })
                        }
                    })
                })
            })
        }
        //defending forks only if hardmode is enabled
        if (((player.includes(2) && player.includes(8)) || (player.includes(4) && player.includes(6))) && !ender && remaining.includes(3) && hardMode){
            setTaunts("I'm not falling for this trick")
            ender = true
            pick = 3
        }
        //if center is open return center
        if (remaining.includes(5) && !ender){
            setTaunts("The center is the best")
            ender = true
            pick = 5
        }
        for (let i=2; i<9; i+=2){
            if (player.includes(10-i) && remaining.includes(i) && !ender){
                setTaunts("I'll take the opposite corner to be safe")
                ender =  true
                pick = i
            }
        }
        //if there is an open corner take it
        for (let i=2; i<9; i+=2){
            if (remaining.includes(i) && !ender){
                setTaunts("I'll take a corner")
                ender = true
                pick = i
            }
        }
        //take a side spot if you can
        for (let i=1; i<10; i+=2){
            if (remaining.includes(i) && !ender){
                setTaunts("I guess I'll settle for a side spot")
                ender = true
                pick = i
            }
        }
        return pick
    }

    return (
        <>
        {started ? 
            <>
            <p id="talkingSpot">{`Computer: ${taunts}`}</p>
            <div id="ticTacToeBoard">
                {squareIndex.map((id)=>{
                    return(
                        <Square 
                            key={id} 
                            id={id} 
                            playerTurn={playerTurn}
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
            :
            <div id="startDiv">
                <h2>Lets Get Started!</h2>
                <button className="startButton" onClick={()=>{
                    setStarted(true)
                    setPlayerTurn(true)
                }}>Go First</button>
                <button className="startButton" onClick={()=>{
                    setStarted(true)
                    setTimeout(()=>{
                        pickSquare(computerSelection(playerPicks, computerPicks, remainingPicks))
                    }, 2000)
                }}>Go Second</button>
                <button className="startButton" 
                    onClick={()=>setHardMode(!hardMode)} 
                >Difficulty: {hardMode? "Hard" : "Easy"}</button>
            </div>
        }
        </>
  )
}

export default TicTacToe