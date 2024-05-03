'use client';
import { trpc } from "@/app/_trpc/client";
import { useMutation } from "@tanstack/react-query";
import { Console } from "console";
import { Dispatch, FormEvent, ReactNode, SetStateAction, createContext, useCallback, useEffect, useState } from "react";
import { useCompletion } from 'ai/react';
// import { json } from "stream/consumers";
interface contextParams {

    imdbId: string
    setImdbId: Dispatch<SetStateAction<string>>
    movie: string
    setMovie: Dispatch<SetStateAction<string>>
    searchSimilarMovies: () => void
    searchMovieByID: () => void
    searchMovieByName: () => void
    loading: boolean
    loading2: boolean
    res: any
    res2: any

}
export const MovieContext = createContext<contextParams>({
    imdbId: '',
    setImdbId: () => { },
    movie: '',
    setMovie: () => { },
    searchSimilarMovies: () => { },
    searchMovieByID: () => { },
    searchMovieByName: () => { },
    loading: false,
    loading2: false,

    res: {},
    res2: {}
});

export const MovieProvider: React.FC<{ children: React.ReactNode }> = ({ children }: { children: ReactNode }) => {
    const [imdbId, setImdbId] = useState<string>('');
    const [flag, setFlag] = useState<number>(0);
    const [movie, setMovie] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [res, setRes] = useState<any>({});
    const [res2, setRes2] = useState<any>({});
    const [answer, setAnswer] = useState('')

    const { mutate: searchFromApiById, isLoading: isLoading1 } = trpc.retriveMoviesFromImdb.useMutation({
        onSuccess: (data) => {
            console.log(data)
            setRes(data)
        }
    }
    )
    const { mutate: searchFromApiById2, isLoading: loading2 } = trpc.retriveMoviesFromImdb.useMutation({
        onSuccess: (data) => {
            console.log(data)
            setRes2(data)
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


    // useEffect(() => {
    //     setRes({})
    // }, [movie, imdbId])

    const searchForSimilarMovies = async ({ Title, imdbID, Language }: { Title: string, imdbID: string, Language: string }) => {
        try {
            // console.log("1", Title, imdbID)
            const requestBody = {
                Title: Title,
                imdbID: imdbID
            };
            // Making a GET request with query parameters
            const response = await fetch(`/api/fav-movies?Title=${encodeURIComponent(Title)}&imdbID=${encodeURIComponent(imdbID)}&Language=${encodeURIComponent(Language)}`, {
                method: 'GET'
            });


            if (!response.ok || response.status !== 200) {
                throw new Error('Failed to  retrive the movie!')
            }

            return response

        } catch (err) {
            console.log("ERROR:", err)
        }
    }

    // const { mutate: searchForSimilarMovies } = trpc.searchSimilarMovies.useMutation({
    //     onSuccess: (data) => {
    //         console.log("Data", data)
    //     }
    // })

    useEffect(() => {
        setLoading(isLoading1 || isLoading2)
    }, [isLoading1, isLoading2])


    const searchMovieByID = () => {
        searchFromApiById({ imdbId })
    }

    const searchMovieByName = () => {
        searchFromApiByName({ movie })
    }

    // console.log(Language)

    const searchSimilarMovies = () => {
        if (res && res.Title && res.imdbID) {
            const Language = res?.Language.split(',')
            searchForSimilarMovies({ Title: res.Title as string, imdbID: res.imdbID as string, Language: Language[0] as string }).then(async (res) => {
                const reader = res?.body?.pipeThrough(new TextDecoderStream()).getReader();
                let resptext = "";
                // console.log(reader)
                while (true) {

                    const { value, done } = await reader?.read()!;

                    if (done) {

                        break;

                    }

                    resptext += value;

                    // setAnswer(resptext);

                }
                setAnswer(getImdbID(resptext))
                searchFromApiById2({ imdbId: answer })
                // console.log("Movie", res?.url)
            }


            )
        }
    }

    const getImdbID = (answer: string) => {

        const cleanedString = answer
            .replace(/["\n:'\\n ]/g, '').trim();
        // console.log(cleanedString)
        const matchid = cleanedString.match(/tt\d+/);
        const id = matchid ? matchid[0].match(/tt\d+/) : null;
        const resStr = id ? id[0] : null;
        // console.log(resStr)

        const similarMovieId = resStr ? resStr.slice(0, 2) + resStr.slice(3, 6) + resStr.slice(7, 10) + resStr.slice(11, 12) : ''
        return similarMovieId
    }
    // console.log(similarMovieId)



    return (

        <MovieContext.Provider value={{ imdbId, setImdbId, searchSimilarMovies, movie, setMovie, searchMovieByID, loading, loading2, searchMovieByName, res, res2 }}>
            {children}

        </MovieContext.Provider>


    )


};

// export default MovieProvider;
