import React from 'react'

const SingleQuestion = ({question,
    answers,
    updateAnswer,
    correctAnswer,
    selectedAnswer,
    showResult
    }) => {
    function handleClick(currentQuestion,answer){
        updateAnswer(currentQuestion, answer)
      }
    function decodeHTMLEntities(text) {
      let textArea = document.createElement('textarea');
      textArea.innerHTML = text;
      return textArea.value;
    }
  return (
    <div className='each-question'>
        <h2>{decodeHTMLEntities(question)}</h2>
        <div className='answers'>
                {answers.map((answer,index)=>{
                    return (<button 
                        key={index}
                        id={answer.id}
                        onClick={() => handleClick(question,answer)} 
                        className={`answers-btn ${answer === selectedAnswer ? "chosen":""}
                        ${showResult && answer===correctAnswer ? "correct" : ""}
                        ${showResult && answer!==correctAnswer ? "dimmed" : ""}
                        ${showResult && answer!==correctAnswer && answer===selectedAnswer? "incorrect" : ""}`}
                        disabled={showResult}>
                        {decodeHTMLEntities(answer)}
                        </button>)
                })}
            </div>
        <div className='underline'></div>
    </div>
  )
}

export default SingleQuestion