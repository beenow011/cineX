import { useContext, useEffect, useState } from "react"
import TextPost from "../Post/TextPost"
import MediaPost from "../Post/MediaPost"
import PollPost from "../Post/PollPost"
import { PostConext, PostProvider } from "@/context/PostContext"
import AllPost from "../Post/AllPost"

function ClubPosts({ roomId }: { roomId: string }) {
    const [field, setField] = useState('All')
    const { setRoomId } = useContext(PostConext)
    useEffect(() => {
        if (roomId) {
            setRoomId(roomId)
        }
    }, [roomId])
    return (

        <div className="flex-1 text-white m-3">
            <div className="flex gap-3">
                <div className={` border-cyan-600 text-red-600 p-1 cursor-pointer hover:bg-cyan-800 transition text-md font-semibold flex justify-center items-center w-24 rounded-full ${field === 'All' && 'bg-cyan-600'}`} onClick={() => setField('All')}>All</div>
                <div className={` border-cyan-600 text-red-600 p-1 cursor-pointer hover:bg-cyan-800 transition text-md font-semibold flex justify-center items-center w-24 rounded-full ${field === 'Text' && 'bg-cyan-600'}`} onClick={() => setField('Text')}>Text</div>
                <div className={` border-cyan-600 text-red-600 p-1 cursor-pointer hover:bg-cyan-800 transition text-md font-semibold flex justify-center items-center w-24 rounded-full ${field === 'Media' && 'bg-cyan-600'}`} onClick={() => setField('Media')}>Media</div>
                <div className={` border-cyan-600 text-red-600 p-1 cursor-pointer hover:bg-cyan-800 transition text-md font-semibold flex justify-center items-center w-24 rounded-full ${field === 'Poll' && 'bg-cyan-600'}`} onClick={() => setField('Poll')}>Poll</div>
            </div>
            {
                field === 'All' && (
                    <AllPost roomId={roomId} />
                )
            }
            {
                field === 'Text' && (
                    <TextPost roomId={roomId} />
                )
            }
            {
                field === 'Media' && (
                    <MediaPost roomId={roomId} />
                )
            }
            {
                field === 'Poll' && (
                    <PollPost roomId={roomId} />
                )
            }


        </div>
    )
}

export default ClubPosts