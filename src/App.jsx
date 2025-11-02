import './App.css';
import useFetch from './useFetch.js';
import {useEffect, useState} from 'react';
import axios from 'axios';

const url = 'https://pokeapi.co/api/v2/pokemon/';

function App() {
    const { data, loading, error } = useFetch(url);

    useEffect(() => {
        console.log(data);
    }, [data]);

    return (
      <>
          <h1>Data</h1>
          {loading ? <p>Loading</p> : <p>{data?.results[0].name}</p>}
          {error && <p>{error}</p>}
      </>
    )
}

export default App
