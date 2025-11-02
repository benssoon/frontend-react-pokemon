import './Card.css';
import useFetch from '../useFetch.js';
import {useEffect} from 'react';

function Card( {url, /*name, image, numMoves, weight, abilities*/} ) {
    const { data: pokemon, loading, error } = useFetch(url);

    useEffect(() => {
        console.log('hello')
    }, []);

    useEffect(() => {
        pokemon !== undefined && console.log(pokemon);
    }, [pokemon]);

    return (
        <div className="pokemon-card">
            {loading ?
                <p>Loading</p> :
                (error && <p>Error</p>) ||
                <div>
                    <p>{pokemon?.name}</p>
                    <img src={pokemon?.sprites.front_default} alt={'An image of ' + pokemon?.name}/>
                    <p>Number of Learnable Moves: {pokemon?.moves.length}</p>
                    <p>Weight: {pokemon?.weight}</p>
                    <p>Abilities:</p>
                    <ul>
                        {pokemon?.abilities?.map((ability) => {
                            return <li
                                key={ability.ability.name}
                                className="no-bullets"
                            >{ability.ability.name}
                            </li>
                        })}
                    </ul>
                </div>
            }
        </div>
    )
}

export default Card;