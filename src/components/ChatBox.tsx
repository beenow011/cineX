'use client';
import { useContext } from "react"
import { MessageInput } from "./MessageInput"
import { Messages } from "./ShanksMessages"
import { MovieContext } from "@/context/MovieContext"

export const ChatBox = ({ img }: { img: string | undefined }) => {
    const { res } = useContext(MovieContext)
    const { imdbID: movieID } = res
    return (
        <div className="flex-1  bg-slate-900 h-[calc(100vh-96px)] w-3/4 relative">
            {
                movieID && movieID.length > 0 ? (
                    <Messages movieID={movieID} img={img} />
                ) : null
            }

            <MessageInput />
        </div>
    )
}