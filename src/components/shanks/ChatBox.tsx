'use client';
import { useContext } from "react"
import { MessageInput } from "./MessageInput"
import { Messages } from "./ShanksMessages"
import { MovieContext } from "@/context/MovieContext"
import { Search } from "lucide-react";

export const ChatBox = ({ img }: { img: string | undefined }) => {
    const { res } = useContext(MovieContext)
    const { imdbID: movieID } = res
    return (
        <div className="flex-1  bg-slate-900 h-[calc(100vh-96px)] w-full md:w-3/4 relative">
            {
                movieID && movieID.length > 0 ? (
                    <Messages movieID={movieID} img={img} />
                ) :
                    (
                        <div className="w-full h-full flex-col flex justify-center items-center align-middle">
                            <Search className="h-7 w-7 text-white" />
                            <h1 className="text-white font-semibold text-2xl">Select any movie to chat.</h1>
                        </div>
                    )
            }

            <MessageInput />
        </div>
    )
}