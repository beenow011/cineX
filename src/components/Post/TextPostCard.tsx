import service from "@/firebase/firestore"
import { DocumentData } from "firebase/firestore"
import { useEffect, useState } from "react"
import parse from "html-react-parser"
import { MoveUp, ThumbsUp, TriangleAlert } from "lucide-react"
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { trpc } from "@/app/_trpc/client"
import { toast } from "../ui/use-toast"
import Skeleton from "react-loading-skeleton"
function TextPostCard({ ele }: { ele: DocumentData }) {
    const [user, setUser] = useState<DocumentData[] | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const [isLiked, setIsLiked] = useState(false)
    const [flag, setFlag] = useState(false)
    const query = trpc.getUser.useQuery()
    const [likes, setLikes] = useState(ele.likes.length as number)
    useEffect(() => {
        if (flag) {
            if (isLiked)
                setLikes(prev => prev + 1)
            else
                setLikes(prev => prev - 1)
        }
    }, [isLiked])
    useEffect(() => {
        service.getUser({ uId: ele.userId })
            .then(res => {
                setUser(res)
                setLoading(false)
            })
            .catch(err => {
                console.error("Error fetching user data:", err)
                setError("Failed to load user data")
                setLoading(false)
            })
    }, [ele])

    useEffect(() => {
        if (query.data) {
            setIsLiked(ele.likes.includes(query.data.userId!))
        }
    }, [ele])

    if (loading) {
        return (
            <div>
                <Skeleton className="w-full h-32" />
            </div>
        )
    }

    if (error) {
        return <div className='bg-slate-600/30 w-full h-36 flex flex-col justify-center items-center'>
            <TriangleAlert className='h-5 w-5 text-white' />
            <p className='font-semibold'>Error Loading the posts!</p>

            <div>Reload the page or try again later.</div>

        </div>
    }
    const likeButton = () => {
        setIsLiked(true)
        setFlag(true)
        service.addLike({ postId: ele.id, userId: query.data?.userId!, type: 0 })
            .then(res => toast({
                title: "Successfully Liked!",
                description: "Your Like as been saved! Thank you",
                variant: 'default',
            }))
            .catch(err => toast({
                title: "Failed to like",
                description: err.message,
                variant: 'destructive',
            }))
    }
    const unLikeButton = () => {
        setIsLiked(false)
        setFlag(true)

        service.removeLike({ postId: ele.id, userId: query.data?.userId!, type: 0 })
            .then(res => toast({
                title: "Successfully Removed the Like!",
                description: "Your Like as been Removed! Thank you",
                variant: 'default',
            }))
            .catch(err => toast({
                title: "Failed to remove the like",
                description: err.message,
                variant: 'destructive',
            }))

    }

    return (
        <div className="w-full bg-slate-600 m-2 p-3 rounded-lg">
            <div className="flex justify-between">
                <div className="">
                    <p className="text-red-600 text-sm">{ele.roomName}</p>
                    <p className="text-cyan-600 font-semibold">{user && user[0].username}</p>
                </div>
                <p className="text-sm text-gray-900">{ele.createdAt.toDate().toDateString()}</p>
            </div>
            <div className="mt-2 quill-read-only">
                <h1 className="text-white text-xl font-semibold">{ele.title}</h1>
                {/* <p className="text-sm mt-2">
                    {parse(ele.body)}
                </p> */}
                <ReactQuill

                    value={ele.body}
                    readOnly={true}
                    theme="bubble" // Use 'bubble' theme which is minimal
                />
            </div>
            <div className="mt-1 flex align-middle gap-2">
                <div className={`border ${isLiked ? 'bg-white text-black' : 'bg-transparent text-white'} border-white rounded-lg p-2 w-fit hover:bg-blue-400 flex gap-2`} onClick={isLiked ? unLikeButton : likeButton}>
                    <ThumbsUp className=" h-4 w-4" />
                </div>
                <p className="text-md font-semibold py-2">{likes}</p>
            </div>

        </div>
    )
}

export default TextPostCard
