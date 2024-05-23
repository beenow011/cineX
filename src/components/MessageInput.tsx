import { Send } from "lucide-react"
import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"

export const MessageInput = () => {
    return (
        <div className="absolute bottom-0 left-0 w-full">
            <div className=" mx-2 flex flex-row gap-3 md:mx-4 md:last:mb-6 lg:mx:auto justify-center items-center">
                <div className="relative flex h-full flex-1 items-stretch md:flex-col">
                    <div className="relative flex flex-col w-full flex-grow ">
                        <div className="relative ">
                            <Textarea
                                autoFocus
                                placeholder="Enter your questions..."
                                rows={1}

                                className='resize-none pr-12 text-base py-3 bg-black text-zinc-400 scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch'
                            />

                            <Button aria-label="send message" className="absolute bottom-1.5 right-[8px]"> <Send className="h-4 w-4 text-white" /></Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}