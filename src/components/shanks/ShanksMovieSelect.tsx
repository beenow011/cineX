'use client';
import Image from "next/image"
import { MovieInput } from "../MovieInput"
import { MovieCard } from "../MovieCard"
import { useContext } from "react"
import { ShanksContext } from "@/context/ShanksContext"
import { MovieContext } from "@/context/MovieContext";
import { ShanksCard } from "./ShanksCard";

export const MovieSelect = () => {
    const { res, loading } = useContext(MovieContext)
    return (
        <div className="flex-1 max-h-full  sticky">
            <ShanksCard />
            <div className="flex justify-center items-center w-full">
                <MovieInput className="justify-center items-center h-fit mb-3 w-3/4 " />
            </div>
        </div>
    )
}