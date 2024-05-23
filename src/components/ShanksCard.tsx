'use client';
import { MovieContext } from "@/context/MovieContext"
import { Loader2Icon } from "lucide-react";
import Image from "next/image";
import { useContext } from "react"

export const ShanksCard = () => {
    const { res, loading } = useContext(MovieContext);
    return (
        <div className="absolute ">
            {
                Object.keys(res).length === 0 && (
                    <div>
                        <h1 className="text-cyan-600 p-4 font-bold text-2xl">
                            Search any movie!
                        </h1>
                    </div>
                )
            }
            {
                loading ? (
                    <div className="">
                        <Loader2Icon className="text-black h-24 w-24 animate-spin" />
                    </div>
                ) : (
                    res.Response === 'False' ? (
                        <h1 className="text-red-600 p-4 font-bold text-2xl">
                            Something is wrong! Please try again!
                        </h1>
                    ) : (
                        <div className="relative h-full w-full">
                            <div className="absolute top-[140px] left-8 w-full h-full  flex justify-center items-center">
                                <img src={res.Poster} alt="Poster" className="w-24 h-24" />
                            </div>

                        </div>
                    )
                )
            }

        </div>
    )
}