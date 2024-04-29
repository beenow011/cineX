'use client';
import { trpc } from "@/app/_trpc/client";
import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from "react";
interface contextParams {

    imdbId: string
    setImdbId: Dispatch<SetStateAction<string>>
    movie: string
    setMovie: Dispatch<SetStateAction<string>>
    flag: number
    searchMovieByID: () => void
    searchMovieByName: () => void
    loading: boolean
    res: any

}
export const MovieContext = createContext<contextParams>({
    imdbId: '',
    setImdbId: () => { },
    movie: '',
    setMovie: () => { },
    flag: 0,
    searchMovieByID: () => { },
    searchMovieByName: () => { },
    loading: false,
    res: {}
});

export const MovieProvider: React.FC<{ children: React.ReactNode }> = ({ children }: { children: ReactNode }) => {
    const [imdbId, setImdbId] = useState<string>('');
    const [flag, setFlag] = useState<number>(0);
    const [movie, setMovie] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [res, setRes] = useState<any>({});


    const { mutate: searchFromApiById, isLoading: isLoading1 } = trpc.retriveMoviesFromImdb.useMutation({
        onSuccess: (data) => {
            console.log(data)
            setRes(data)
        }
    }
    )
    const { mutate: searchFromApiByName, isLoading: isLoading2 } = trpc.retriveMoviesFromMovieName.useMutation({
        onSuccess: (data) => {
            console.log(data)
            setRes(data)

        }
    }

    )
    useEffect(() => {
        setLoading(isLoading1 || isLoading2)
    }, [isLoading1, isLoading2])


    const searchMovieByID = () => {
        searchFromApiById({ imdbId })
    }

    const searchMovieByName = () => {
        searchFromApiByName({ movie })
    }

    return (

        <MovieContext.Provider value={{ imdbId, setImdbId, flag, movie, setMovie, searchMovieByID, loading, searchMovieByName, res }}>
            {children}

        </MovieContext.Provider>


    )


};

// export default MovieProvider;
