import React, { useEffect, useState } from 'react'
import UserScore from './scoreboardComponents/UserScore'

function Scoreboard() {
  const [users, setUsers] = useState([])
  useEffect(()=>{
    fetch('http://localhost:3000/users')
    .then(r=>r.json())
    .then((data)=>{
      console.log(data)
      setUsers(data)
    })
  }, [])

  return (
    <div id="scoreContainer">
      <h2>SCOREBOARD</h2>
      <table id="scoreboard">
        <thead>
          <tr>
            <td>Name</td>
            <td>Wins</td>
            <td>Losses</td>
            <td>Draws</td>
          </tr>
        </thead>
        <tbody>
          {users.map((user)=>{
            return <UserScore user={user} key={user.id}/>
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Scoreboard