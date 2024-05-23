'use client';

import { trpc } from '@/app/_trpc/client';
import { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react';

interface ContextParams {
    imdbId: string;
    setImdbId: Dispatch<SetStateAction<string>>;
    movie: string;
    setMovie: Dispatch<SetStateAction<string>>;
    searchMovieByID: () => void;
    searchMovieByName: () => void;
    loading: boolean;
    res: any;
}

export const ShanksContext = createContext<ContextParams>({
    imdbId: '',
    setImdbId: () => { },
    movie: '',
    setMovie: () => { },
    searchMovieByID: () => { },
    searchMovieByName: () => { },
    loading: false,
    res: {},
});

export const ShanksProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [imdbId, setImdbId] = useState<string>('');
    const [movie, setMovie] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [res, setRes] = useState<any>({});
    const [answer, setAnswer] = useState('')

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

    const searchMovieByID = () => {
        searchFromApiById({ imdbId })
    }

    const searchMovieByName = () => {
        searchFromApiByName({ movie })
    }

    useEffect(() => {
        setLoading(isLoading1 || isLoading2)
    }, [isLoading1, isLoading2])
    return (
        <ShanksContext.Provider value={{ res, imdbId, setImdbId, movie, setMovie, searchMovieByID, searchMovieByName, loading }}>
            {children}
        </ShanksContext.Provider>
    )
}