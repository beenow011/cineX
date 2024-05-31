import { currentUser } from "@clerk/nextjs/server"
import { Timestamp } from "firebase/firestore"
import ReactMarkdown from "react-markdown"
import { format, formatDistance, formatRelative, subDays } from 'date-fns'
import Typewriter from 'typewriter-effect';
export const Msg = ({ text, createdAt, isUserMessage, index, typeWritter }: { text: string, createdAt: Timestamp, isUserMessage: boolean, index: number, typeWritter: boolean }) => {


    return (
        <div className={`border-lg ${isUserMessage ? 'border-cyan-600 text-cyan-600  rounded-l-lg' : 'border-red-600 font-mono text-red-600 rounded-r-lg'} max-w-[70%]   w-fit  border p-3 text-sm md:text-base`}>

            {index == 0 && !isUserMessage && typeWritter ? (
                // <ReactMarkdown className={'prose'}>
                //     {text}
                // </ReactMarkdown>
                <Typewriter
                    onInit={(typewriter) => {
                        typewriter.typeString(text)
                            // Increase speed by reducing delay
                            .start();
                    }}
                    options={
                        { delay: 10, }
                    }
                />
            ) : text}
            {/* {date} */}
        </div>

    )
}