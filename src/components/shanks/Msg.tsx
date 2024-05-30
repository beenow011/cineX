import { currentUser } from "@clerk/nextjs/server"
import { Timestamp } from "firebase/firestore"

export const Msg = ({ text, createdAt, isUserMessage }: { text: string, createdAt: Timestamp, isUserMessage: boolean }) => {

    return (
        <div className={`border-lg ${isUserMessage ? 'border-cyan-600 text-cyan-600 rounded-l-lg' : 'border-red-600 text-red-600 rounded-r-lg'} max-w-[70%]   w-fit  border p-3 text-sm md:text-base`}>
            {text}
        </div>

    )
}