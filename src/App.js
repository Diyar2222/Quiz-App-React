import React,{useState,useEffect} from "react"
import Intro from "./components/Intro";
import Questions from "./components/Questions";
function App() {
  const [startGame, setStartGame] = useState(false)

  
  return (
    <div className="container">
      {!startGame ? <Intro setStartGame={setStartGame}/>:<Questions setStartGame={setStartGame}/>}
    </div>
  );
}

export default App;
