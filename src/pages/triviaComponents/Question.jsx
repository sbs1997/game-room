import React, { useState } from 'react'
import Answer from './Answer'

function Question({triviaQuestion, handleChoice}) {
    const {question, correctAnswer, incorrectAnswers} = triviaQuestion
    const [status, setStatus] = useState("")

    // put the answers together and mixem all up 
    const answers = [...incorrectAnswers, correctAnswer]
    function shuffle (array){
        for (let i = array.length - 1; i>0; i--){
            const j = Math.floor(Math.random()*(i+1))
            let temp = array[i]
            array[i] = array[j]
            array[j]= temp
        }
        return array
    }
    const [shuffledAnswers] = useState(shuffle(answers))


    return (
        <div className="questionCard">
            <h3 className="question">{question.text}</h3>
            <ol>
                {shuffledAnswers.map((answer)=>{
                    return <Answer 
                        answer={answer}
                        key={shuffledAnswers.indexOf(answer)}
                        handleChoice={handleChoice}
                        correctAnswer={correctAnswer}
                        setStatus={setStatus}
                        status={status}
                        />
                })}
            </ol>
            <p id="result">{status === "correct" ? "Correct!" : status=== "incorrect" ? `Incorrect the correct answer was ${correctAnswer}` : " "}</p>
        </div>
    )
}

export default Question