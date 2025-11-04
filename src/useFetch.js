import axios from 'axios';
import {useEffect, useState} from 'react';

function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        const controller = new AbortController();

        const fetchData = async () => {
            setLoading(true);
            setError(false);
            try {
                const response = await axios.get(url, {
                    params: {
                        limit: 20,
                    }
                });
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