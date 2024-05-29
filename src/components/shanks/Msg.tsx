import { currentUser } from "@clerk/nextjs/server"
import { Timestamp } from "firebase/firestore"

export const Msg = ({ text, createdAt, isUserMessage }: { text: string, createdAt: Timestamp, isUserMessage: boolean }) => {

    return (
        <div className={`${isUserMessage ? 'border-cyan-800 text-cyan-600 rounded-l-md' : 'border-red-800 text-red-600 rounded-r-md'} max-w-[70%]  border-lg w-fit border-white border p-3 text-sm md:text-base`}>
            {text}
        </div>

    )
}