import './App.css';
import useFetch from './useFetch.js';
import {useEffect, useState} from 'react';
import axios from 'axios';
import Card from './Card/Card.jsx';

const pokemonEndpoint = 'https://pokeapi.co/api/v2/pokemon/';

function App() {
    const [url, setUrl] = useState(pokemonEndpoint);
    const [next, toggleNext] = useState(false);
    const [previous, togglePrevious] = useState(false);
    const [disabled, setDisabled] = useState({
        previous: true,
        next: false,
    })
    const { data: paginatedPokemon, loading, error } = useFetch(url);

    useEffect(() => {
        if (next) {
            setUrl(paginatedPokemon?.next);
            toggleNext(false);

        }
    }, [next]);

    useEffect(() => {
        if (previous) {
            setUrl(paginatedPokemon?.previous);
            togglePrevious(false);
            if (!paginatedPokemon?.previous) {
                console.log("Hello");
            }
        }
    }, [previous]);

    return (
      <>
          {loading ?
              <p>Loading</p> :
              (error && <p>Error</p>) ||
              <div className="main">
                  <div className="buttons">
                      <button
                          type="button"
                          onClick={togglePrevious}
                      >Vorige</button>
                      <button
                          type="button"
                          onClick={toggleNext}
                      >Volgende</button>
                  </div>
                  <ul className="results">
                      {paginatedPokemon?.results.map((pokemon) => {
                          return <li key={pokemon?.name} className="no-bullets">
                              <Card
                                  url={pokemon?.url}
                              />
                          </li>
                      })}
                  </ul>
              </div>
          }
      </>
    )
}

export default App
