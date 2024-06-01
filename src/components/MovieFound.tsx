'use client';
import { trpc } from "@/app/_trpc/client"
import { MovieContext } from "@/context/MovieContext"
import { Loader2Icon } from "lucide-react";
import { useContext, useEffect, useState } from "react"
import { MovieInfo } from "./MovieInfo";
import { MovieCard } from "./MovieCard";

export const MovieFound = () => {
    const [res, setRes] = useState<any>({})
    const { searchMovieByID, res2, loading2, imdbId, movie } = useContext(MovieContext)
    // const { mutate: searchFromApiById, isLoading: isLoading1 } = trpc.retriveMoviesFromImdb.useMutation({
    //     onSuccess: (data) => {
    //         console.log(data)
    //         setRes(data)
    //     }
    // })
    // useEffect(() => {
    //     if (similarMovieId && (Object.keys(res).length === 0 || res.Response === 'False')) {
    //         searchFromApiById({ imdbId: similarMovieId })
    //     }
    // }, [similarMovieId])

    // useEffect(() => {
    //     setRes({})
    // }, [movie, imdbId])
    return (
        // <div>
        //     <div className="mx-2.5 w-full bg-slate-700/40 mt-5 p-3 rounded-md">
        //         {

        //             isLoading1 ? (
        //                 <div className="flex justify-center items-center">
        //                     <Loader2Icon className="animate-spin text-white h-10" />
        //                 </div>
        //             ) : (

        //                 Object.keys(res).length === 0 ? (
        //                     <div className="text-white">
        //                         Search your fav movie by IMDB id or Movie name
        //                     </div>

        //                 )

        //                     : (
        //                         <div>
        //                             {
        //                                 res.Response === 'False' ? (
        //                                     <div className="w-full h-full flex flex-col justify-center items-center">
        //                                         <h1 className="text-red-100">
        //                                             Could not find the movie...
        //                                         </h1>
        //                                         <p className="text-red-600 font-bold text-3xl ">
        //                                             {res.Error}
        //                                         </p>
        //                                     </div>
        //                                 ) : (
        //                                     <>

        //                                         <MovieInfo
        //                                             Title={res.Title as string}
        //                                             Director={res.Director as string}
        //                                             Genre={res.Genre as string}
        //                                             Language={res.Language as string}
        //                                             Runtime={res.Runtime as string}
        //                                             imdbRating={res.imdbRating as string}
        //                                             Year={res.Year}
        //                                             Poster={res.Poster}
        //                                             Plot={res.Plot}
        //                                             Actors={res.Actors}
        //                                         />
        //                                     </>
        //                                 )
        //                             }
        //                         </div>
        //                     )
        //             )
        //         }
        //     </div>

        // </div>
        <MovieCard res={res2} loading={loading2} flag={false} className="" />
    )
}