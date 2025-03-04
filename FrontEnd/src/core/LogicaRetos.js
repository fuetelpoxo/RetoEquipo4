import { useEffect, useState } from "react";

export function useLogicaRetos() {
    const [retos, setRetos] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("/api/retos")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error al obtener los retos");
                }
                return response.json();
            })
            .then((data) => setRetos(data))
            .catch((error) => setError(error.message));
    }, []);

    return { retos, error };
}
