/**
 * 🔹 Custom Hook: useGet
 * - Håndterer fetch-anmodninger og returnerer data, fejl og loading-tilstand.
 * - Bruges til at hente data fra en given URL.
 * - Returnerer et objekt med `data`, `error`, og `isLoading` for nem adgang.
 */
import { useState, useEffect } from "react";

export function useGet(url) {
     // 🔹 State til at gemme data, fejl og loading-tilstand
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        // 🔹 Håndterer fetch-anmodningen og opdatering af state
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const result = await response.json();
                setData(result);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [url]);

    return { data, error, isLoading };
}