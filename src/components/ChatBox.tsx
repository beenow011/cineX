'use client';
import { useContext } from "react"
import { MessageInput } from "./MessageInput"
import { Messages } from "./ShanksMessages"
import { MovieContext } from "@/context/MovieContext"

export const ChatBox = () => {
    const { res } = useContext(MovieContext)
    const { imdbID: movieID } = res
    return (
        <div className="flex-1  bg-slate-900 h-[80vh] w-3/4 relative">
            <Messages movieID={movieID} />
            <MessageInput />
        </div>
    )
}