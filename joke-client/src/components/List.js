import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import JokeCard from './Card';

function JokeList(props) {
    const [jokes, setJokes] = useState([]);

    useEffect(() => {
        axiosWithAuth()
        .get('/api/jokes')
        .then(res => {
            setJokes(res.data);
        })
        .catch(err => console.log(err.response));
    }, []);

    return (
        <>
            <h1>My Jokes List</h1>
            <div className="joke-container">
                {jokes.map(joke => (
                    <JokeCard key={joke.id} joke={joke} />
                ))}
            </div>
        </>
    )
};

export default JokeList;