import { useEffect, useState } from "react";
import type { Movie } from "../Types";
import { getMovies } from "../api";

const useFetchMovies = () => {


    const [movies, setMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);


    const fetchMovies = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const movies = await getMovies();
            setMovies(movies);

        } catch (err) {
            setError("Erro ao buscar filmes. Tente novamente", )
            console.error('Erro ao buscar filmes', err);
        } finally  {
            setIsLoading(false);
        }
        
    };

    useEffect(() => {
        fetchMovies();
    }, []);
    return {
        movies, isLoading, error
    }
}

export default useFetchMovies