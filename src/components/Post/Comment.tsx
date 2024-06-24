import { DocumentData } from "firebase/firestore"
import { toast } from "../ui/use-toast"
import service from "@/firebase/firestore"
import { useEffect, useState } from "react"
import { trpc } from "@/app/_trpc/client"
import Skeleton from "react-loading-skeleton"
import { ThumbsUp, TriangleAlert } from "lucide-react"

function CommentComp({ commentItem }: { commentItem: DocumentData }) {
    const [user, setUser] = useState<DocumentData[] | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const [isLiked, setIsLiked] = useState(false)
    const [flag, setFlag] = useState(false)
    const [commentLoad, setCommentLoad] = useState(false)
    const [comment, setComment] = useState('')
    const [commentList, setCommentList] = useState<DocumentData[] | null>(null)
    const query = trpc.getUser.useQuery()
    const [likes, setLikes] = useState(commentItem.likes.length as number)
    useEffect(() => {
        if (flag) {
            if (isLiked)
                setLikes(prev => prev + 1)
            else
                setLikes(prev => prev - 1)
        }
    }, [isLiked])
    useEffect(() => {
        service.getUser({ uId: commentItem.userId })
            .then(res => {
                setUser(res)
                setLoading(false)
            })
            .catch(err => {
                console.error("Error fetching user data:", err)
                setError("Failed to load user data")
                setLoading(false)
            })
    }, [commentItem])

    useEffect(() => {
        if (query.data) {
            setIsLiked(commentItem.likes.includes(query.data.userId!))
        }
        if (commentItem.id) {
            setCommentLoad(true)
            service.getComments({ postId: commentItem.id }).then(res => setCommentList(res)).catch(err => console.log(err)).finally(() => setCommentLoad(false))
        }
    }, [commentItem])

    if (loading) {
        return (
            <div>
                <Skeleton className="w-full h-32" />
            </div>
        )
    }
    // commentList && console.log(commentList)
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
        service.addCommentLike({ commentId: commentItem.id, userId: query.data?.userId! })
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

        service.removeCommentLike({ commentId: commentItem.id, userId: query.data?.userId! })
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
        <div>
            <div className="h-8 w-0.5 ml-6 bg-gray-300">

            </div>
            <div className="w-full bg-slate-800 p-2">
                <div className="flex justify-between">
                    <p className="text-cyan-600 font-semibold">{user && user[0].username}</p>
                    <p className="text-sm text-gray-300">{commentItem.createdAt.toDate().toDateString()}</p>
                </div>
                <p className="text-white">{commentItem.text}</p>
                <div className="mt-1 flex align-middle gap-2">
                    <div className={`border ${isLiked ? 'bg-white text-black' : 'bg-transparent text-white'} border-white rounded-lg p-2 w-fit hover:bg-blue-400 flex gap-2`} onClick={isLiked ? unLikeButton : likeButton}>
                        <ThumbsUp className=" h-4 w-4" />
                    </div>
                    <p className="text-md text-gray-300 font-semibold py-2">{likes}</p>
                </div>

            </div>
        </div>
    )
}

export default CommentComp