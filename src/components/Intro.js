import React from 'react'

const introPage = ({setStartGame}) => {
  return (
    <div className='intro'>
        <h1>Quizzical</h1>
        <p>Want to test your knowledge?</p>
        <button onClick={()=>setStartGame(true)} className='btn start-btn'>Start quiz</button>
    </div>
  )
}

export default introPage