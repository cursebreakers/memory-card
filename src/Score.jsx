// Scoreboard component
import React, { useState } from 'react';

function Scoreboard({ score, highestStreak }) {
    return (
        <div className="scoreboard">
          <div>Score: {score}</div>
          <div>Highest Streak: {highestStreak}</div>
        </div>
    );
}

function StartOver({ onReset, score, highestStreak }) {
    return (
        <>
            <div className="endStreak">
                <h2>This streak: {score}</h2>
                <h4>Best streak: {highestStreak}</h4>
                <p>Best possible score: 9</p>
                <button onClick={onReset}>Start Over</button>
            </div>    
        </>
    );
}


function Winner({ onReset }) {

    return (
        <>
          <div className="winGame">
            <img className="winGif" src="https://media1.tenor.com/m/75kmksSClcwAAAAC/eevee-pokemon.gif" alt="Eevee happy gif from Tenor"></img>
            <h2>You did it!</h2>
            <button onClick={onReset}>Play again?</button>
          </div>    
        </>
  
    );

}

export { Scoreboard, StartOver, Winner };


