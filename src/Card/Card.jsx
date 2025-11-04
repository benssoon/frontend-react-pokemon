import './Card.css';
import useFetch from '../useFetch.js';
import {useEffect, useState} from 'react';

function Card( {message, url, /*name, image, numMoves, weight, abilities*/} ) {
    const { data, loading, error } = useFetch(url);
    const [pokemon, setPokemon] = useState({
        name: '',
        image: '',
        moves: 0,
        weight: 0,
        abilities: [],
    })

    useEffect(() => {
        if (data) {
            setPokemon({
                name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
                image: data.sprites.front_default,
                moves: data.moves.length,
                weight: data.weight,
                abilities: data.abilities,
            });
        }
    }, [data]);

    useEffect(() => {
        return function unmount() {

        }
    }, [data]);

    return (
        <>
            {
                message && <div className="message card">
                    <p>{message}</p>
                </div>

                ||

                <div className="pokemon card">
                    {loading ?
                        <p>Loading</p> :
                        (error && <p>Error</p>) ||
                        <div>
                            <h2>{pokemon.name}</h2>
                            <img src={pokemon.image} alt={'An image of ' + pokemon.name}/>
                            <p>Moves: {pokemon.moves}</p>
                            <p>Weight: {pokemon.weight}</p>
                            <p>Abilities:</p>
                            <ul>
                                {pokemon.abilities?.map((ability, index) => {
                                    return <li
                                        key={index}
                                        className="no-bullets"
                                    >{ability.ability.name}
                                    </li>
                                })}
                            </ul>
                        </div>
                    }
                </div>
            }
        </>
    )
}

export default Card;