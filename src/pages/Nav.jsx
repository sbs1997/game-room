import React from 'react'
import { Outlet, NavLink } from 'react-router-dom'

function Nav() {
  return (
    <>
        {/* Nav Bar */}
        <div id="navBar">
            <NavLink to="." >Home</NavLink>
            <NavLink to="tictactoe">TicTacToe</NavLink>
            <NavLink to="trivia">Trivia</NavLink>
            <NavLink to="scoreboard">Scoreboard</NavLink>
        </div>

        <Outlet/>
    </>
  )

}

export default Nav