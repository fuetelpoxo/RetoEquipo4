import { useEffect, useState } from "react";

export function useLogicaRetos() {
    const [retos, setRetos] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRetos = async () => {
            try {
                setLoading(true);
                const response = await fetch("http://localhost:8000/api/retos", {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                });
                
                if (!response.ok) {
                    throw new Error("Error al obtener los retos");
                }
                
                const data = await response.json();
                setRetos(data.data || data); // Handle both data wrapper cases
            } catch (error) {
                setError("No se pudieron cargar los retos");
                console.error("Error fetching retos:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRetos();
    }, []);

    return { retos, error, loading };
}
