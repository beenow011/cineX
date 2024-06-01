import { Loader2Icon } from "lucide-react"
import { boolean } from "zod"
import { MovieInfo } from "./MovieInfo"
import { Button } from "./ui/button"
import { useContext } from "react"
import { MovieContext } from "@/context/MovieContext"
import { cn } from "@/lib/utils";

interface params {
    res: any
    loading: boolean
    flag: boolean
    className: string
}


export const MovieCard = ({ res, loading, flag, className }: params) => {

    const { searchSimilarMovies } = useContext(MovieContext)
    return (


        <div>

            <div className={cn("mx-2.5 w-full  bg-zinc-900 mt-5 p-3 rounded-md   shadow-white/30", className)}>
                {

                    loading ? (
                        <div className="flex justify-center items-center">
                            <Loader2Icon className="animate-spin text-white h-10" />
                        </div>
                    ) : (

                        Object.keys(res).length === 0 ? (
                            flag ? (
                                <div className="text-white">
                                    Search your fav movie by IMDB id or Movie name
                                </div>) : null

                        )

                            : (
                                <div>
                                    {
                                        res.Response === 'False' ? (
                                            <div className="w-full h-full flex flex-col justify-center items-center">
                                                <h1 className="text-red-100">
                                                    Could not find the movie...
                                                </h1>
                                                <p className="text-red-600 font-bold text-3xl ">
                                                    {flag ? (res.Error) : ('Something is wrong! Please try again!')}
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


            {
                flag && (
                    <div className="w-full  flex mt-5  justify-center items-center">


                        <Button className="bg-cyan-600 hover:bg-cyan-900" onClick={searchSimilarMovies}>
                            Similar Movies
                        </Button>


                    </div>
                )
            }

        </div>

    )


}