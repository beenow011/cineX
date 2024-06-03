'use client';
import { trpc } from '@/app/_trpc/client';
import { Loader } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
interface MovieResponse {
    Title: string;
    Poster: string;
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
        <div className="flex-3 text-white bg-zinc-900 w-full md:w-64 flex flex-col justify-center items-center p-3">
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
                </div>
            )}
        </div>
    );
}

export default ClubMovie;
