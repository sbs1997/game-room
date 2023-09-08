import React, { useEffect, useState } from 'react'
import Question from './triviaComponents/Question'
import useUserIdStore from '../hooks/userIDStore'

function Trivia() {
  const { userId, setUserId } = useUserIdStore()
  const [questions, setQuestions] = useState([])
  const [questionCounter, setQuestionCounter] = useState(0)
  const [playerScore, setPlayerScore] = useState(0)
  const [user, setUser] = useState({})
  
    //get the active user so that we can properly update the score
    useEffect(()=>{
      fetch(`http://localhost:3000/users/${userId}`)
      .then(r=>r.json())
      .then(data=>setUser(data))
  }, [])

  useEffect(()=>{
    fetch("https://the-trivia-api.com/v2/questions?limit=10")
    .then(r=>r.json())
    .then((data)=>{
      console.log(data)
      setQuestions(data)
    })
  }, [])

  function handleChoice(answer, correctAnswer){
    if (answer === correctAnswer){
      console.log("correct!")
      setPlayerScore(playerScore+1)
    }else{
      console.log("incorrect :(")
    }
    setTimeout(() => {
      setQuestionCounter(questionCounter+1)
    }, 2000);
    
  }

  useEffect(()=>{
    if(questionCounter === 10){
      const update = {triviaResults: [...user.triviaResults, playerScore]}
      fetch(`http://localhost:3000/users/${userId}`, {
        headers: { "Content-Type": "application/json"},
        method: "PATCH",
        body: JSON.stringify(update)
    })
    }
}, [questionCounter])

  return (
    <div id="triviaContainer">
      { questions.length ?
          questionCounter === 10 ?
            <div className="questionCard">
              <p>Thanks for Playing!</p>
            </div>
          :
            <Question 
              triviaQuestion={questions[questionCounter]} 
              key={questions[questionCounter].id} 
              handleChoice={handleChoice}
            />
      :
        <></>
      }
      <div id="scorecard">Score: {playerScore}</div>
    </div>
  )
}

export default Trivia