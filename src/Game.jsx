import React, { useState, useEffect } from 'react';
import GetPokemon from './Pokedex';
import {Scoreboard, StartOver, Winner} from './Score';
import './App.css';


function Game() {
    const pokemonIDs = [133, 134, 135, 136, 197, 196, 470, 471, 700];
    const [pokemonIDsShuffled, setPokemonIDsShuffled] = useState(pokemonIDs);
    const [clickedIDs, setClickedIDs] = useState([]);
    const [score, setScore] = useState(0);
    const [highestStreak, setHighestStreak] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    // Function to shuffle the array
    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    useEffect(() => {
        if (score > highestStreak) {
            setHighestStreak(score);
        }
    }, [score]);

    const handlePokemonClick = (id) => {
        console.log('Clicked: ', id)
        if (clickedIDs.includes(id)) {
            // Reset game and score
            setClickedIDs([]);
            setGameOver(true); // Game over when the streak ends
        } else {
            // Increase score and update clicked IDs
            const newScore = score + 1;
            setScore(newScore);
            setClickedIDs([...clickedIDs, id]);
            // Shuffle cards
            const shuffledIDs = shuffleArray([...pokemonIDsShuffled]);
            setPokemonIDsShuffled(shuffledIDs);
            if (newScore === 9) {
                setGameOver(true); // Game over when perfect score achieved
            }
        }
    };


    const handleReset = () => {
        // Reset game state
        setClickedIDs([]);
        setScore(0);
        setGameOver(false);
        // Reshuffle cards
        const shuffledIDs = shuffleArray([...pokemonIDs]);
        setPokemonIDsShuffled(shuffledIDs);
    };

    return (
        <>
            {gameOver && score < 9 && <StartOver onReset={handleReset} score={score} highestStreak={highestStreak} />}
            {gameOver && score === 9 && <Winner onReset={handleReset} score={score} />}
            {!gameOver && (
                <>
                    <Scoreboard score={score} highestStreak={highestStreak} />
                    <div className="pokeGrid">
                        {pokemonIDsShuffled.map((id) => (
                            <GetPokemon key={id} pokeID={id} onClick={() => handlePokemonClick(id)} />
                        ))}
                    </div>
                </>
            )}
        </>
    );

}

export default Game


