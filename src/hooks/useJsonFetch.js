import { useState, useEffect, useRef, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function useJsonFetch(url, options) {
    const {setLoading, setHasError} = useContext(AuthContext)
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const timestampRef = useRef();

    useEffect(() => { 
        const fetchData = async () => {
            const timestamp = Date.now();
            timestampRef.current = timestamp;
            setLoading(true);
            try {
                const response = await fetch(url, options);
                if (!response.ok) { throw new Error(response.statusText); }
                const jsonData = await response.json();
                if (timestampRef.current === timestamp) { setData(jsonData); }
                setError(null);
                setHasError(false);
            } catch (e) {
                // console.log(e)
                setError(e);
                setHasError(e);
            } finally { 
                setLoading(false); 
            }
        };
        url.length > 1 && fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url, setLoading, setHasError]);
    // console.log(error)
    return [data, error];
}
