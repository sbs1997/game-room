import React from 'react'

function UserScore({user}) {
    const {name, tttWins, tttDraws, tttLosses, triviaResults} = user
    let triviaSum=0
    triviaResults.map((num)=>{
        triviaSum += num
    })
    // console.log(triviaSum)
    const triviaAverage = triviaResults.length ? triviaSum/(triviaResults.length) : 0
    
    return (
        <tr>
            <td>{name}</td>
            <td>{tttWins}</td>
            <td>{tttLosses}</td>
            <td>{tttDraws}</td>
            <td>{triviaAverage}</td>
            <td>{triviaResults.length}</td>
        </tr>
    )
}

export default UserScore