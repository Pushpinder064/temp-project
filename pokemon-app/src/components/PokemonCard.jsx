import React from 'react';
import Card from 'react-bootstrap/Card';

const PokemonCard = ({ pokemon }) => {
  return (
    <div className="pokemon-card">
      <Card style={{ width: '50%' }}>
        <Card.Img variant="top" src={pokemon.sprites.front_default} />
        <Card.Body>
          <Card.Title>{pokemon.name}</Card.Title>
          <Card.Text>Base Experience: {pokemon.base_experience}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default PokemonCard;
