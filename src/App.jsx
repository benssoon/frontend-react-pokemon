import './App.css';
import useFetch from './useFetch.js';
import {useEffect, useState} from 'react';
import Card from './Card/Card.jsx';
import Error from './Error/Error.jsx';

const pokemonEndpoint = 'https://pokeapi.co/api/v2/pokemon/';

function App() {
    const [url, setUrl] = useState(pokemonEndpoint);
    const [disabled, setDisabled] = useState({
        previous: null,
        next: null,
    })
    const { data: paginatedPokemon, loading, error } = useFetch(url);

    useEffect(() => {
        if (paginatedPokemon) {
            let p = true;
            let n = true;
            if (paginatedPokemon.previous) {
                p = false;
            }
            if (paginatedPokemon.next) {
                n = false;
            }
            setDisabled({
                previous: p,
                next: n,
            });
        }
    }, [paginatedPokemon]);

    return (
      <>
          <div className="main">
              {loading || error ?
                  <div className="messages">
                      <Card message={error.message || 'Loading'}/>
                  </div>
                  :
                  <>
                      <div className="buttons">
                          {console.log("The buttons are here!")}
                          <button
                              disabled={disabled.previous}
                              type="button"
                              onClick={() => {
                                  if (!disabled.previous) {
                                      console.log("previous page");
                                      setUrl(paginatedPokemon.previous);
                                  }
                              }}
                          >Vorige</button>
                          <button
                              disabled={disabled.next}
                              type="button"
                              onClick={() => {
                                  if (!disabled.next) {
                                      console.log("next page");
                                      setUrl(paginatedPokemon.next);
                                  }
                              }}
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
                  </>
              }


          </div>
      </>
    )
}

export default App
