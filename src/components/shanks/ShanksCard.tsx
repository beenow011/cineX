'use client';
import { MovieContext } from "@/context/MovieContext"
import { FileWarning, Loader2Icon } from "lucide-react";
import Image from "next/image";
import { useContext } from "react"

export const ShanksCard = () => {
    const { res, loading } = useContext(MovieContext);
    return (
        <div className="  bg-shanks mx-3">
            <div className=" w-full h-full">
                {
                    !loading && (Object.keys(res).length === 0 ? (
                        <div className="flex flex-col xl:flex-row">
                            <div>
                                <h1 className="text-cyan-600 p-4 font-bold text-2xl">
                                    Search any movie!
                                </h1>
                                <Image src={'/shankslogo.jpg'} alt="shanks" height={400} width={400} className="rounded-md m lg:h-96 lg:w-96 md:h-46 md:w-36 sm:h-16 sm:w-16 hover:shadow-xl hover:shadow-cyan-400" />
                            </div>
                            <div className="bg-slate-700/70 h-96 xl:w-1/2 p-3 m-3 mt-16">
                                <p className="text-white">
                                    Shanks is a chatbot designed to answer all your movie-related questions. Whether you need a plot summary, an ending explained, or details about the cast and crew, Shanks has you covered. It offers concise yet thorough information, character insights, memorable quotes, and fun trivia. Shanks also aggregates reviews and ratings, providing a well-rounded view of a film&apos;s reception. The name &quot;Shanks&quot; signifies its ability to cut through confusion and deliver precise answers, making it an essential tool for any movie enthusiast seeking quick and accurate information
                                </p>

                            </div>
                        </div>
                    ) : (
                        res.Response === 'False' ? (
                            <div className="flex flex-col xl:flex-row">
                                <div>
                                    <h1 className="text-cyan-600 p-4 font-bold text-2xl">
                                        Search any movie!
                                    </h1>
                                    <div className="bg-no-repeat flex justify-center items-center w-96 h-96 bg-[url('/shankslogo.jpg')]">
                                        <FileWarning className="text-white bg-black/30 h-16 w-16 " />
                                    </div>
                                </div>
                                <div className="bg-slate-700/70 h-96 xl:w-1/2  p-3 m-3 mt-16">
                                    <p className="text-red-600">
                                        Something went wrong! please try again.
                                    </p>

                                </div>
                            </div>
                        ) : (

                            <div className="flex flex-col xl:flex-row">
                                <div>
                                    <h1 className="text-cyan-600 p-4 font-bold text-2xl">
                                        Movie fetched!
                                    </h1> <div className=" bg-no-repeat  w-96 h-96 bg-[url('/shankslogo.jpg')]">


                                        <div className="w-full h-full bg-slate-800/90 flex justify-center items-center">
                                            <img src={res.Poster} className="h-full hover:shadow-xl  hover:shadow-cyan-400" />
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-slate-700/70 h-96 xl:w-1/2 p-3 m-3 mt-16">
                                    <div className="">
                                        <div className="px-2 ">
                                            <h1 className="text-white font-bold text-2xl">{res.Title}</h1>
                                            <div className="flex gap-2 ">
                                                <p className="text-cyan-600">{res.Language}</p>
                                                <p className="text-slate-400">{res.Year}</p>
                                            </div>
                                            <p className='text-slate-300'>Director : {res.Director}</p>
                                            <p className='text-slate-300'>Actors : {res.Actors}</p>
                                            <p className='text-slate-300'>Genre : {res.Genre}</p>
                                            <p className='text-slate-300'>Runtime : {res.Runtime}</p>
                                            <p className='text-slate-300'>imdbRating : {res.imdbRating}</p>


                                        </div>
                                        <div className="px-2 ">
                                            <p className='text-cyan-300'>Plot: {res.Plot}</p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        )
                    )
                    )
                }
                {
                    (loading ? (
                        <div className="flex flex-col xl:flex-row">
                            <div>
                                <h1 className="text-cyan-600 p-4 font-bold text-2xl">
                                    Fetching the Movie
                                </h1>
                                <div className="bg-no-repeat  w-96 h-96 bg-[url('/shankslogo.jpg')]">
                                    <div className="h-full w-full bg-slate-600/80 flex justify-center items-center">
                                        <Loader2Icon className="text-white bg-black  h-16 w-16 animate-spin" />
                                    </div>
                                </div>
                            </div>
                            <div className="bg-slate-700/70 h-96 w-1/2 p-3 m-3 mt-16">
                                <p className="text-green-600">
                                    Please wait a moment!
                                </p>

                            </div>
                        </div>
                    ) : null)

                }
            </div>
        </div>
    )
}