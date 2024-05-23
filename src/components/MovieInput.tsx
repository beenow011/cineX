'use client';
import { useContext, useEffect, useState } from "react";
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { trpc } from "@/app/_trpc/client";
import { MovieContext } from "@/context/MovieContext";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export const MovieInput = ({ className = '' }: { className: string }) => {
    // const [imdbId, setImdbId] = useState<string>('')
    // const [trigger, setTrigger] = useState(false)
    // const [movie, setMovie] = useState<string>('')
    const { setImdbId, setMovie, searchMovieByID, loading: isLoading, searchMovieByName } = useContext(MovieContext)
    // Fetch movie data using the provided IMDb ID




    // console.log(imdbId, movie)
    return (
        <div className={cn("w-full h-full mx-2.5 bg-black p-3 divide-y-2 md:divide-y-0 flex-col md:flex-row md:divide-x-2 divide-slate-400 flex mt-3.5 justify-between items-center rounded-md", className)}>
            <div className="p-3 flex-1 flex flex-col justify-center items-center">
                <h1 className="text-cyan-400 mb-3 font-semibold">Search the movie by IMDB id</h1>
                <label htmlFor="id" className="text-slate-300 text-xl mb-1.5 font-semibold">IMDB ID</label>
                <Input type="string" id="imdbId" placeholder="IMDB Id" className="bg-zinc-800 w-1/2 text-slate-200" onChange={e => setImdbId(e.target.value)} />
                <Button className="my-3" onClick={searchMovieByID} disabled={isLoading}> Search </Button>


            </div>

            <div className="p-3 flex-1 flex flex-col justify-center items-center">
                <h1 className="text-cyan-400 mb-3 font-semibold">Search the movie by name</h1>
                <label htmlFor="movie" className="text-slate-300 text-xl mb-1.5 font-semibold">Movie Name</label>
                <Input type="string" id="moviename" placeholder="Movie Name" className="bg-zinc-800 w-1/2 text-slate-200" onChange={e => setMovie(e.target.value)} />

                <Button className="my-3" onClick={searchMovieByName} disabled={isLoading}> Search </Button>
            </div>
        </div>
    )
}