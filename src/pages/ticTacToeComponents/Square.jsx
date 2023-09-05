import React from 'react'

function Square({id, pickSquare, playerPicks, computerPicks, gameOver}) {
    const owner = playerPicks.includes(id) ? "X" : computerPicks.includes(id) ? "O" : ""
    return (
            <div 
            className={`square${id} square`}
            onClick={()=>{
                if (!playerPicks.includes(id) && !computerPicks.includes(id) && !gameOver){
                    pickSquare(id)
                }
            }}
            >
                {owner}
            </div>
    )
}

export default Square