import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonCard from './components/PokemonCard';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import './App.css';

const App = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios
      .get('https://pokeapi.co/api/v2/pokemon?limit=150')
      .then(async (response) => {
        const allPokemonData = await Promise.all(
          response.data.results.map(async (pokemon) => {
            const pokemonRecord = await axios.get(pokemon.url);
            return pokemonRecord.data;
          })
        );
        setPokemonList(allPokemonData);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const filteredPokemon = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <Form.Control
        type="text"
        placeholder="Search Pokémon"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="my-4"
      />
      <div className="pokemon-grid">
        {filteredPokemon.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </Container>

  );
};

export default App;
