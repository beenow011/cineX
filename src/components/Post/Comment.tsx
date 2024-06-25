import { DocumentData } from "firebase/firestore"
import { toast } from "../ui/use-toast"
import service from "@/firebase/firestore"
import { useEffect, useState } from "react"
import { trpc } from "@/app/_trpc/client"
import Skeleton from "react-loading-skeleton"
import { Reply, Send, ThumbsUp, TriangleAlert } from "lucide-react"
import { Input } from "../ui/input"

function CommentComp({ commentItem }: { commentItem: DocumentData }) {
    const [user, setUser] = useState<DocumentData[] | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const [isLiked, setIsLiked] = useState(false)
    const [flag, setFlag] = useState(false)
    const [replyFlag, setReplyFlag] = useState(false)
    const [flagComment, setFlagComment] = useState(false)

    const [commentLoad, setCommentLoad] = useState(false)
    const [comment, setComment] = useState('')
    const [commentList, setCommentList] = useState<DocumentData[] | null>(null)
    const query = trpc.getUser.useQuery()
    const [likes, setLikes] = useState(commentItem.likes.length as number)
    // const [likesReply, setLikesReply] = useState(commentItem.likes.length as number)

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
    console.log(commentList)
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
    const commentSend = () => {
        if (comment.length > 0) {
            console.log(commentItem.id, query.data?.userId, comment)
            service.createComment({
                postId: commentItem.id,
                userId: query.data?.userId!,
                text: comment
            }).then(res => {
                toast({
                    title: "Successfully Comment has been posted!",
                    description: "Your Like as been Removed! Thank you",
                    variant: 'default',
                })
                setFlagComment(true)

            }).catch(err => {
                console.log(err)
                toast({
                    title: "Failed to comment!",
                    description: err.message,
                    variant: 'destructive',
                }
                )
            })
        } else {
            toast({
                title: "Comment field is empty!",
                description: "Minimun one letter should be there.",
                variant: 'destructive',
            })
        }
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
                <div className="mt-1 flex align-middle justify-between gap-2">
                    <div className="flex align-middle gap-2">
                        <div className={`border ${isLiked ? 'bg-white text-black' : 'bg-transparent text-white'} border-white rounded-lg p-2 w-fit hover:bg-blue-400 flex gap-2`} onClick={isLiked ? unLikeButton : likeButton}>
                            <ThumbsUp className=" h-4 w-4" />
                        </div>
                        <p className="text-md text-gray-300 font-semibold py-2">{likes}</p>
                    </div>
                    <div className={`border  border-white rounded-lg p-2 w-fit hover:bg-blue-400 flex gap-2`} onClick={() => setReplyFlag(prev => !prev)}>
                        <Reply className=" h-4 w-4 text-white" />
                    </div>
                </div>

            </div>
            {
                replyFlag && (
                    <div >
                        <div className="relative">
                            <Input placeholder="comments" value={comment} onChange={(e) => setComment(e.target.value)} />
                            <div className="absolute right-0 w-fit h-fit top-0 p-3 bg-red-600 hover:bg-red-900" onClick={commentSend}>
                                <Send className="h-4 w-4 text-white" />
                            </div>
                        </div>
                    </div>
                )
            }
            {
                commentList && commentList.length > 0 && (
                    <div>

                        <ul className=" flex flex-col justify-end items-end">
                            {flagComment && comment && (
                                <li className="w-3/4 ">
                                    <div className="h-8 w-0.5 ml-6 bg-gray-300">


                                    </div>
                                    <div className="w-full bg-slate-800 p-2">
                                        <div className="flex justify-between">
                                            <p className="text-cyan-600 font-semibold">{user && user[0].username}</p>
                                            {/* <p className="text-sm text-gray-300">{commentItem.createdAt.toDate().toDateString()}</p> */}
                                        </div>
                                        <p className="text-white">{comment}</p>

                                    </div>
                                </li>
                            )}
                            {
                                commentList?.map(ele => (
                                    <li key={ele.id} className="w-3/4">
                                        <div className="h-8 w-0.5 ml-6 bg-gray-300">

                                        </div>
                                        <div className="w-full bg-slate-800 p-2">
                                            <div className="flex justify-between">
                                                <p className="text-cyan-600 font-semibold">{user && user[0].username}</p>
                                                <p className="text-sm text-gray-300">{ele.createdAt.toDate().toDateString()}</p>
                                            </div>
                                            <p className="text-white">{ele.text}</p>
                                            <div className="mt-1 flex align-middle justify-between gap-2">
                                                {/* <div className="flex align-middle gap-2">
                                                    <div className={`border ${isLiked ? 'bg-white text-black' : 'bg-transparent text-white'} border-white rounded-lg p-2 w-fit hover:bg-blue-400 flex gap-2`} onClick={isLiked ? unLikeButton : likeButton}>
                                                        <ThumbsUp className=" h-4 w-4" />
                                                    </div>
                                                    <p className="text-md text-gray-300 font-semibold py-2">{ele.likes.length}</p>
                                                </div> */}

                                            </div>

                                        </div>

                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                )
            }
        </div>
    )
}

export default CommentComp