// Get Eevee from PokeAPI Evolutions Endpoint

import React, { useState, useEffect } from 'react';

const pokeAPI = ( { pokeID } ) => {
    const [pokeData, setPokeData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const sortData = (pokeData) => {
        if (pokeData) {
            const { name, abilities, sprites, types, id, moves, height, weight } = pokeData;
            const moveNames = moves.map(move => move.move.name);

            return {
                name: name,
                id: id,
                abilities: abilities.map(ability => ability.ability.name),
                moves: moveNames,
                sprites: sprites.front_default,
                types: types.map(type => type.type.name),
                height: height,
                weight: weight,

            };
        }
        return null;
    };
  
    useEffect(() => {
      const fetchPokeData = async () => {
        try {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeID}/`);
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
          const data = await response.json();
          setPokeData(data);
          setLoading(false);
          setError(false); 
          console.log(data);
        } catch (error) {
          console.error(error);
          setError(true);
          setLoading(false);
        }
      };
  
      fetchPokeData();
    }, [pokeID]);

    const sortedData = sortData(pokeData); 
    const dataArray = sortedData ? [sortedData] : [];
    console.log('Sorted:', sortedData)  
    return { sortedData: dataArray, loading, error };
  };
   

  const GetPokemon = ({ sortedData: propSortedData, pokeID, onClick }) => {
    const { sortedData, loading, error } = pokeAPI({ pokeID });
 
    // Display loading status
    if (loading) {
      return <div>Loading...</div>;
    }
  
    // Display error status
    if (error) {
      return <div>Error: Failed to fetch Eevee</div>;
    }
  
    // Display pokemon
    return (
      <div>
        {sortedData && sortedData.map((pokemon, index) => (
          <div key={index} className="pokeCard" onClick={onClick}>
            <div className="pokeProfile">
              <img className="pokeSprite" src={pokemon.sprites} alt={pokemon.name} />
              <p>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</p>
              <p>#{pokeID}</p>
            </div>
            <div className="pokeSkills">
              <h4>Type:</h4>
              <p>{pokemon.types.map(type => type.charAt(0).toUpperCase() + type.slice(1)).join(', ')}</p>
              <h4>Abilities:</h4>
              <p>{pokemon.abilities.map(ability => ability.charAt(0).toUpperCase() + ability.slice(1)).join(', ')}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };
    
  export default GetPokemon;