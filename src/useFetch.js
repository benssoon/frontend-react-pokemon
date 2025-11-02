import axios from 'axios';
import {useEffect, useState} from 'react';

//////////////////////////////////////////
// ONLY FOR TESTING, REMOVE WHEN FINISHED!
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
//////////////////////////////////////////

function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, toggleLoading] = useState(false);
    const [error, toggleError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            toggleLoading(true);
            toggleError(false);
            try {
                const response = await axios.get(url);

                //////////////////////////////////////////
                // ONLY FOR TESTING, REMOVE WHEN FINISHED!
                await delay(1000);
                //////////////////////////////////////////

                setData(response.data);
            } catch (er) {
                toggleError(true);
                console.error(er);
                console.error(url);
            }
            toggleLoading(false);
        }
        fetchData();
    }, [url]);

    return {data, loading, error};
}

export default useFetch;