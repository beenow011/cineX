'use client';
import { PlotContext } from "@/context/PlotContext"
import { FilmIcon, Ghost, LoaderIcon } from "lucide-react"
import { useContext, useEffect, useState } from "react"
import { MovieCard } from "./MovieCard";
import { trpc } from "@/app/_trpc/client";

export const PlotResult = () => {
    const { answer, loading, res } = useContext(PlotContext)
    // const [res, setRes] = useState({})

    // const { mutate: searchFromApiById2, isLoading: loading2 } = trpc.retriveMoviesFromImdb.useMutation({
    //     onSuccess: (data) => {
    //         console.log(data)
    //         setRes(data)
    //     }
    // }
    // )

    // useEffect(() => {
    //     setRes({})
    //     if (answer.length > 0) {
    //         searchFromApiById2({ imdbId: answer })
    //     }
    // }, [answer])

    return (
        <div className="bg-gradient-to-r from-black  to-slate-900 shadow-xl m-3 rounded-md py-5 shadow-slate-700">

            {!loading && !answer ? (<div className="w-full h-full flex flex-col justify-center items-center">
                <FilmIcon className="h-12 w-12 mb-3 text-white" />
                <p className="text-white text-lg font-medium">Let me suggest you a movie...Tell me what&apos;s in your mind?</p>
            </div>) : null}
            {
                loading && (
                    <div className="w-full h-full flex flex-col justify-center items-center">
                        {/* <Ghost className="h-12 w-12 mb-3 text-white" /> */}
                        <LoaderIcon className="h-12 w-12 mb-3 text-white animate-spin" />
                        <p className="text-white text-lg font-medium">Loading...</p>
                    </div>

                )
            }
            {Object.keys(res).length !== 0 && (
                <MovieCard res={res} loading={false} flag={false} className="" />
            )
            }
        </div>
    )
}