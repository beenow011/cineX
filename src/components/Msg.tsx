import { Timestamp } from "firebase/firestore"

export const Msg = ({ text, createdAt, isUserMessage }: { text: string, createdAt: Timestamp, isUserMessage: boolean }) => {

    return (
        <div className={`${isUserMessage ? 'bg-cyan-600 text-black ' : 'bg-red-600 text-white'} w-3/4 rounded-md border-white border p-3`}>
            {
                text
            }
        </div>
    )
}