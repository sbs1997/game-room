import React, { useEffect, useState } from 'react'
import useUserIdStore from '../hooks/userIDStore'
import NewUserForm from './homeComponents/NewUserForm'

function Home() {
  const { userId, setUserId } = useUserIdStore()
  const [ users, setUsers ] = useState([])

  useEffect(()=>{
    fetch('http://localhost:3000/users')
    .then(r=>r.json())
    .then(data=>{
      setUsers(data)
    })
  }, [])
  // console.log(users[userId-1].name)
  return (
    <>
    <p>Welcome to the digital game room! Select your user!
      <select id='userSelect'
        onChange={(e)=>{
          if (e.target.value){
            setUserId(e.target.value)
          }
        }}
      >
        <option value={null} key={0}></option>
        {users.map((user)=>{
            return <option value={user.id} key={user.id}>{user.name}</option>
        })}
      </select>
    </p>
    <p>{(users[userId-1]) ? `The current user is ${users[userId-1].name}.` : "" }</p>
    <NewUserForm users={users} setUsers={setUsers}/>
    </>
  )
}

export default Home