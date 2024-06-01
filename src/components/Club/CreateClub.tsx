'use client';
import { useContext } from "react";
import { MovieCard } from "../MovieCard"
import { MovieInput } from "../MovieInput"
import InputInfo from "./InputInfo"
import { MovieContext } from "@/context/MovieContext";


function CreateRoom({ user }: { user: string | undefined }) {
    const { res, loading } = useContext(MovieContext)
    return (
        <div className="bg-zinc-900 p-4">
            <h1 className="text-cyan-600 text-2xl font-bold">
                Start your own <span className="text-red-600">
                    club</span> now..!
            </h1>
            <MovieInput className="" />
            <MovieCard res={res} loading={loading} flag={false} className="bg-black" />
            <InputInfo user={user} />
        </div>
    )
}

export default CreateRoom