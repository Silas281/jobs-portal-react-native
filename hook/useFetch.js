import { useState, useEffect } from "react";
import axios from "axios";


const rapidApiKey = process.env.RAPID_API_KEY;

const useFetch = ({ endpoint, query }) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const options = {
        method: 'GET',
        url: `https://jsearch.p.rapidapi.com/${endpoint}`,
        params: { ...query },
        headers: {
            'X-RapidAPI-Key': '2a168f3b99msh2709a9d6b415efcp1601c8jsndc032b52db5c',
            'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        }
    };

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await axios.request(options);
            //console.log(response.data);
            setData(response.data.data);
            setIsLoading(false);
        } catch (error) {

            setError(error);
            //alert('Error fetching data');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const refetch = () => {
        setIsLoading(true);
        fetchData();
    }

    return { data, isLoading, error, refetch };
};

export default useFetch;
