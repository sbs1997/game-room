import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route
} from "react-router-dom";
import "./index.css";

//pages
import Scoreboard from './pages/Scoreboard';
import TicTacToe from './pages/TicTacToe';
import Trivia from './pages/Trivia';
import Home from './pages/Home';
import Nav from './components/Nav';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Nav/>}>
      <Route index element={<Home/>}/>
      <Route path='tictactoe' element={<TicTacToe/>}/>
      <Route path='trivia' element={<Trivia/>}/>
      <Route path='scoreboard' element={<Scoreboard/>}/>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);