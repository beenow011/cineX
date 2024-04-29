'use client';
import { MovieContext } from "@/context/MovieContext"
import { useContext } from "react"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { MovieInfo } from "./MovieInfo";
import { Loader2Icon } from "lucide-react";
export const MovieRes = () => {
    const { res, loading } = useContext(MovieContext)
    return (
        <div className="mx-2.5 w-full bg-slate-700/40 mt-5 p-3 rounded-md">
            {
                Object.keys(res).length === 0 ? (
                    <div className="text-white">
                        Search your fav movie by IMDB id or Movie name
                    </div>
                ) : (

                    loading ? (
                        <div className="flex justify-center items-center">
                            <Loader2Icon className="animate-spin text-white h-10" />
                        </div>
                    ) : (
                        <div>
                            {
                                res.Response === 'False' ? (
                                    <div className="w-full h-full flex flex-col justify-center items-center">
                                        <h1 className="text-red-100">
                                            Could not find the movie...
                                        </h1>
                                        <p className="text-red-600 font-bold text-3xl ">
                                            {res.Error}
                                        </p>
                                    </div>
                                ) : (
                                    <>

                                        <MovieInfo
                                            Title={res.Title as string}
                                            Director={res.Director as string}
                                            Genre={res.Genre as string}
                                            Language={res.Language as string}
                                            Runtime={res.Runtime as string}
                                            imdbRating={res.imdbRating as string}
                                            Year={res.Year}
                                            Poster={res.Poster}
                                            Plot={res.Plot}
                                            Actors={res.Actors}
                                        />
                                    </>
                                )
                            }
                        </div>
                    )
                )
            }
        </div>
    )
}