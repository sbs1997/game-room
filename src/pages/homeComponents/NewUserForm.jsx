import React, {useState} from 'react'

function NewUserForm( {users, setUsers} ) {
    const [makingUser, setMakingUser] = useState(false)
    return (
        <>
        {
            makingUser ? 
            <form onSubmit={(e)=>{
                e.preventDefault()
                fetch("http://localhost:3000/users", {
                    method: "POST",
                    headers: { "Content-Type": "application/json"},
                    body: JSON.stringify({
                        name: e.target.name.value,
                        tttWins: 0,
                        tttDraws: 0,
                        tttLosses: 0,
                        triviaResults: []
                    })
                })
                .then(r=>r.json())
                .then((data)=>{
                    setUsers([...users, data])
                })
            }}>
                <input 
                    autoFocus = {true}
                    name = "name"
                    id= "nameInput"
                    onBlur={()=>{setMakingUser(!makingUser)}}
                ></input>
            </form>
            :
            <button className="formButton" onClick={()=>setMakingUser(!makingUser)}>Make New User</button>
        }
        </>
    )
}

export default NewUserForm