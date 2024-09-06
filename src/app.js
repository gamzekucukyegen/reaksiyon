"use client"
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css'
import React, { useState, useRef } from "react";

const App = () => {
  const [game, setGame] = useState("waiting");
  const [message, setMessage] = useState(null);
  const [reactionTime, setReactionTime] = useState(null);
  const startTimeRef = useRef(null);
  const timeoutRef = useRef(null);
  

  const startGame = () => {
    setReactionTime(null);
    setGame("waiting")
    setMessage(null)
    
    const random = Math.floor(Math.random() * 5000) + 1000;

    timeoutRef.current = setTimeout(() => {
        setGame("green");
        
      startTimeRef.current = new Date();
    }, random);

    setGame("red");
  };

  const handleClick = () => {
    if (game === "red") {
      clearTimeout(timeoutRef.current);
      <br/>
      setGame("too early");
     setMessage("You clicked too early! Try again.");
     
    } else if (game === "green") {
      const endTime = new Date();
      const reactionTime = endTime - startTimeRef.current;
      setReactionTime(reactionTime);
     setMessage(`You took ${reactionTime}ms!`)
     setGame("waiting")
    
    }
    
  };

  return (
    <div className='contanier'>
      <h1>Reaction Time Test</h1>
      <br/>
      {game === "waiting" || game === "too early" || game === " " ? (
        <>
         <button className="btn btn-success button"  onClick={startGame}>Start Game</button>
        {game === "too early" && <h2>{message}</h2>}
      </>
      ) : (
        <div
          onClick={handleClick}
          style={{
            width: "250px",
            height: "250px",
            backgroundColor: game === "red" ? "red" : "green",
            cursor: "pointer"
          }}
        ></div>
      )}
      <br/>
      {reactionTime && <h2>You took: {reactionTime}ms</h2>}
    </div>
  );
};

export default App