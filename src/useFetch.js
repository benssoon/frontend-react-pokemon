import axios from 'axios';
import {useEffect, useState} from 'react';

function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    function delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    useEffect(() => {
        if(!url) return; // Do not fetch data if there is no url passed (i.e. for error/loading cards).
        const controller = new AbortController();

        async function fetchData() {
            setLoading(true);
            setError(false);
            try {
                const response = await axios.get(url, {
                    params: {
                        limit: 20,
                    }
                });
                await delay(2000);
                setData(response.data);
            } catch (er) {
                setError(er);
                console.error(er);
                console.error(url);
            }
            setLoading(false);
        }

        fetchData();

        return function cleanup() {
            controller.abort();
        }
    }, [url]);

    return {data, loading, error};
}

export default useFetch;