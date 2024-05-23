'use client';
import Image from "next/image"
import { MovieInput } from "./MovieInput"
import { MovieCard } from "./MovieCard"
import { useContext } from "react"
import { ShanksContext } from "@/context/ShanksContext"
import { MovieContext } from "@/context/MovieContext";
import { ShanksCard } from "./ShanksCard";

export const MovieSelect = () => {
    const { res, loading } = useContext(MovieContext)
    return (
        <div className="flex-1 max-h-full relative">
            <MovieInput className="items-start h-fit mb-3" />
            <ShanksCard />
            <Image src={'/shanks3.jpg'} alt="shanks" height={576} width={1024} className="rounded-md hover:shadow-xl hover:shadow-cyan-400" />
        </div>
    )
}