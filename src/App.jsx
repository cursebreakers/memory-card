import React, { useState } from 'react';
import Game from './Game';
import './App.css';

function App() {
  const [live, setLive] = useState(false);

  const startClick = () => {
    setLive(true);
  };

  return (
    <>
      {!live && <h2>Memory Eeveelution</h2>}
      {!live && <button className="begin" onClick={startClick}>Begin</button>}
      {live &&  <Game />}
    </>
  );
}

export default App;
