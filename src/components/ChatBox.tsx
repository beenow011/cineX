import { MessageInput } from "./MessageInput"

export const ChatBox = () => {
    return (
        <div className="flex-1  bg-slate-900 h-[80vh] w-3/4 relative">
            <MessageInput />
        </div>
    )
}