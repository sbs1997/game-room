import React, { useState } from 'react'

function Answer({answer, handleChoice, correctAnswer, setStatus, status}) {
    const [selected, setSelected] = useState(false)
    return (
        <li 
            key={answer} 
            className={`${selected ? "selected": ""} answer`}
            onClick={(e)=>{
                if (!status){
                    setSelected(true)
                    if (answer === correctAnswer){
                        setStatus("correct")
                    }else setStatus("incorrect")
                    handleChoice(e.target.textContent, correctAnswer)
                }
        }}>{answer}</li>    )
}

export default Answer