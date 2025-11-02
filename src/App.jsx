import './App.css';
import useFetch from './useFetch.js';
import {useEffect, useState} from 'react';
import axios from 'axios';
import Card from './Card/Card.jsx';

const url = 'https://pokeapi.co/api/v2/pokemon/';

function App() {
    const { data: paginatedPokemon, loading, error } = useFetch(url);

    return (
      <>
          {loading ?
              <p>Loading</p> :
              (error && <p>Error</p>) ||
              <div className="main">
                  <div className="buttons">
                      <button>Vorige</button>
                      <button>Volgende</button>
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
