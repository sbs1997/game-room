import React from 'react'

function UserScore({user}) {
    const {name, tttWins, tttDraws, tttLosses} = user
    return (
        <tr>
            <td>{name}</td>
            <td>{tttWins}</td>
            <td>{tttLosses}</td>
            <td>{tttDraws}</td>
        </tr>
    )
}

export default UserScore