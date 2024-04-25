import { useEffect, useState, useCallback} from "react";

async function sendHttpRequest(url, config) {
    const response = await fetch(url, config)
    const resData = response.json()

    if (!response.ok) {
        throw new Error(resData.message || 'unable to fetch Data')
    }
    return resData;
}

export default function useHttp(url, config, initialData) {
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(initialData)

    //to reset data after everycheckout
    function clearData() {
        setData(initialData)
    }

    const sendRequest = useCallback(
        async function sendRequest(dataToBesentToBackend) {
            setLoading(true)
            try {
                const resData = await sendHttpRequest(url, { ...config, body: dataToBesentToBackend })
                setData(resData)
            } catch (error) {
                setError(error.message || 'Missing Data')
            }
            setLoading(false)
        }, [url, config])

    //putting sendRequest here in useEffect because when application loads we need to load the meal immediately.
    //at the same time since it is custom hook and used at many places we want to execute it not only for GET we want to execute it when 
    // it is required .that is why I am putiing it in condition and  for post and othe request exposing sendRequest in return object
    useEffect(() => {
        if (config && (config.method === 'GET' || !config.method) || !config) {
            sendRequest()
        }
    }, [sendRequest, config])

    return {
        data,
        error,
        loading,
        sendRequest,
        clearData
    }
}