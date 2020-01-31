import React from 'react';

const JokeCard = props => {
  return (
    <div className="joke-card">
      <p>{`Joke: ${props.joke.joke}`}</p>
    </div>
  )
};

export default JokeCard;