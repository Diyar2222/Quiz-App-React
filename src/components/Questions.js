import React,{useState,useEffect} from 'react'
import SingleQuestion from './SingleQuestion'
// const url = 'https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple'
const url = "https://opentdb.com/api.php?amount=10&category=11&difficulty=easy&type=multiple"


const Questions = ({setStartGame}) => {
    const [questionsNum, setQuestionsNum] = useState()
    const [loading,setLoading] = useState(false)
    const [questionAndAnswers, setQuestionAndAnswers] = useState([])
    const [warning,setWarning] = useState(false)
    const [numOfCorrect,setNumOfCorrect] = useState(0)
    const [showResult,setShowResult] = useState(false)
    const fetchData = async () => {
        setLoading(true)
        const res = await fetch(url)
        const data = await res.json()
        setQuestionsNum(data.results.length)
        setQuestionAndAnswers(data.results.map(item=>{
            return {
                questions:item.question,
                answers:shuffle([...item.incorrect_answers,item.correct_answer]),
                correctAnswer:item.correct_answer,
                selectedAnswer:""
            }
        }))
        setLoading(false)
      }
    useEffect(()=>{
      fetchData()
    },[])
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          let temp = array[i];
          array[i] = array[j];
          array[j] = temp;
        }
        return array;
      }
    const updateAnswer = (question,answer) => {
        setQuestionAndAnswers(questionAndAnswers.map(item=>{
            return item.questions===question ? 
                {...item, selectedAnswer:answer}
                : item
        }))
    }
    const checkAnswer = () => {
        const notAllAnswered = questionAndAnswers.some(item=>
            item.selectedAnswer === ""
        )
        setWarning(notAllAnswered)
        if(!notAllAnswered){
            questionAndAnswers.map(item=>{
                if(item.selectedAnswer===item.correctAnswer){
                    setNumOfCorrect(prev=>prev+1)
                }
            })
        setShowResult(true)
        }
    }
    const playAgain = () => {
        setStartGame(false)
        setNumOfCorrect(0)
    }
    if(loading){
      return <h1>Loading...</h1>
    }
    return (
        <div className='question-answers-container'>   
           {questionAndAnswers.map((item,index)=>{
          const {questions, answers,correctAnswer,selectedAnswer} = item
          return (<div>
            <SingleQuestion key={index} 
            question={questions} 
            answers={answers}
            updateAnswer={updateAnswer}
            correctAnswer={correctAnswer}
            selectedAnswer={selectedAnswer}
            checkAnswer={checkAnswer}
            showResult={showResult}
           />
          </div>)
        })}
        {!showResult && <div className="check-btn-container">
                {warning && <p className="warning-text">There are questions left</p>}
                <button onClick={checkAnswer} className="btn check-btn">Check answers</button>
            </div>}
        {showResult && 
            <div className="check-btn-container">
                <h4>You scored {numOfCorrect}/{questionsNum} correct answers</h4>
                <button onClick={playAgain} className='btn'>Play again</button>
            </div>
            }
        </div>
  )
}

export default Questions