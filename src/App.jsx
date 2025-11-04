import './App.css';
import useFetch from './useFetch.js';
import {useEffect, useState} from 'react';
import Card from './Card/Card.jsx';

const pokemonEndpoint = 'https://pokeapi.co/api/v2/pokemon/';

function App() {
    const [url, setUrl] = useState(pokemonEndpoint);
    const [disabled, setDisabled] = useState({
        previous: null,
        next: null,
    });
    const [cycle, setCycle] = useState('initializing');

    useEffect(() => {
        setCycle('mounting');
    }, []);

    useEffect(() => {
        setCycle('updating url');

        return function cleanup() {
            setCycle('unmounting');
        }
    }, [url]);


    const { data: paginatedPokemon, loading, error } = useFetch(url, cycle, 'first call');

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
              {loading || error || !paginatedPokemon ?
                  <div className="messages">
                      <Card message={error?.response?.data || 'Loading'}/>
                  </div>
                  :
                  <>
                      <div className="buttons">
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
