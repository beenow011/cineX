import { currentUser } from "@clerk/nextjs/server"
import { Timestamp } from "firebase/firestore"

export const Msg = ({ text, createdAt, isUserMessage }: { text: string, createdAt: Timestamp, isUserMessage: boolean }) => {

    return (
        <div className={`${isUserMessage ? 'bg-cyan-600 text-black rounded-l-md' : 'bg-red-600 text-white rounded-r-md'} w-3/4  border-white border p-3`}>
            {
                text
            }
        </div>
    )
}