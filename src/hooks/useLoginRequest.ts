import { useState } from "react";
import axios from "axios";

export const useLoginRequest = (url: string) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [response, setResponse] = useState(null);

    const postData = async (body: any) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post(url, body, {
                headers: { "Content-type": "application/json" },
            });
            setResponse(response.data);
            console.log(response.data)
            return response.data;
        } catch (err) {
            console.log(err)
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { postData, loading, error, response }
}