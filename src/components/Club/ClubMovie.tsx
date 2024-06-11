'use client';
import { trpc } from '@/app/_trpc/client';
import { Loader } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
interface MovieResponse {
    Title: string;
    Poster: string;
    Language: string;
    Year: string;
    Director: string;
    Actors: string;
    Genre: string;
    Runtime: string;
    imdbRating: string;
    Plot: string
    // Add other expected fields here
}

interface ClubMovieProps {
    movieID: string;
}

function ClubMovie({ movieID }: ClubMovieProps) {
    const [res, setRes] = useState<MovieResponse | null>(null);
    const [error, setError] = useState<string | null>(null);

    const { mutate: searchFromApiById, isLoading: isLoading1 } = trpc.retriveMoviesFromImdb.useMutation({
        onSuccess: (data: MovieResponse) => {
            console.log(data);
            setRes(data);
            setError(null); // Clear any previous errors
        },
        onError: (err: any) => {
            console.error(err);
            setError('Failed to retrieve movie data');
        }
    });

    useEffect(() => {
        if (movieID) {
            searchFromApiById({ imdbId: movieID });
        }
    }, [movieID, searchFromApiById]);

    return (
        <div className="flex-3 text-white bg-zinc-900 w-full md:w-64 h-fit flex flex-col justify-center items-center p-3 md:sticky top-5">
            <p className='text-white text-xl font-bold'>Movie info</p>
            {isLoading1 ? (
                <Loader className="h-6 w-6 text-white animate-spin" />
            ) : error ? (
                <div className="text-red-500">{error}</div>
            ) : (
                <div className='w-full flex flex-col justify-center items-center'>
                    <Avatar className="h-16 w-16 md:h-48 md:w-48 ring-2 ring-cyan-600 ">
                        <AvatarImage src={res?.Poster} alt="icon" className='object-contain' />
                        <AvatarFallback>{res?.Title}</AvatarFallback>
                    </Avatar>
                    <h1 className='text-lg font-semibold text-red-600'>
                        {res?.Title}
                    </h1>
                    <div className="flex flex-col xl:flex-row">

                        <div className="bg-slate-700/70   p-3 m-3 mt-8">
                            <div className="">
                                <div className="px-2 ">

                                    <div className="flex gap-2 ">
                                        <p className="text-cyan-600">{res?.Language}</p>
                                        <p className="text-slate-400">{res?.Year}</p>
                                    </div>
                                    <p className='text-slate-300'>Director : {res?.Director}</p>
                                    <p className='text-slate-300'>Actors : {res?.Actors}</p>
                                    <p className='text-slate-300'>Genre : {res?.Genre}</p>
                                    <p className='text-slate-300'>Runtime : {res?.Runtime}</p>
                                    <p className='text-slate-300'>imdbRating : {res?.imdbRating}</p>


                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ClubMovie;
