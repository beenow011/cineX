import service from "@/firebase/firestore"
import { DocumentData } from "firebase/firestore"
import { useEffect, useState } from "react"
import parse from "html-react-parser"
import { MoveUp, Send, SquareX, ThumbsUp, TriangleAlert } from "lucide-react"
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { trpc } from "@/app/_trpc/client"
import { toast } from "../ui/use-toast"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import { useRouter } from "next/navigation"
import { Input } from "../ui/input"
import CommentComp from "./Comment"
function TextPostCardWIthComment({ ele }: { ele: DocumentData }) {
    const router = useRouter()
    const [user, setUser] = useState<DocumentData[] | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const [isLiked, setIsLiked] = useState(false)
    const [flag, setFlag] = useState(false)
    const [flagComment, setFlagComment] = useState(false)
    const [commentLoad, setCommentLoad] = useState(false)
    const [comment, setComment] = useState('')
    const [commentList, setCommentList] = useState<DocumentData[] | null>(null)
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
        if (ele.id) {
            setCommentLoad(true)
            service.getComments({ postId: ele.id }).then(res => setCommentList(res)).catch(err => console.log(err)).finally(() => setCommentLoad(false))
        }
    }, [ele])

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
    console.log(ele)
    const commentSend = () => {
        if (comment.length > 0) {
            console.log(ele.id, query.data?.userId, comment)
            service.createComment({
                postId: ele.id,
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
            <div className="w-full bg-slate-600 m-2 p-3 rounded-lg " >
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
                        className="text-white"
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
            <div >
                <div className="relative">
                    <Input placeholder="comments" value={comment} onChange={(e) => setComment(e.target.value)} />
                    <div className="absolute right-0 w-fit h-fit top-0 p-3 bg-red-600 hover:bg-red-900" onClick={commentSend}>
                        <Send className="h-4 w-4 text-white" />
                    </div>
                </div>
            </div>
            <div className="mt-1">

                {
                    commentLoad ? (
                        <div>
                            <Skeleton className="w-full h-32" />
                        </div>
                    ) : (
                        commentList?.length === 0 ? (
                            <div>
                                <div className='bg-slate-600/30 w-full h-36 flex flex-col justify-center items-center'>
                                    <SquareX className='h-5 w-5 text-white' />
                                    <p className='font-semibold text-white'>No Comments</p>

                                </div>
                            </div>
                        ) : (
                            <div>
                                <div className="h-10 w-10 bg-gray-300 rounded-full ml-2">

                                </div>
                                <ul className="flex flex-col gap-2">
                                    {flagComment && comment && (
                                        <div>
                                            <div className="h-8 w-0.5 ml-6 bg-gray-300">


                                            </div>
                                            <div className="w-full bg-slate-800 p-2">
                                                <div className="flex justify-between">
                                                    <p className="text-cyan-600 font-semibold">{user && user[0].username}</p>
                                                    {/* <p className="text-sm text-gray-300">{commentItem.createdAt.toDate().toDateString()}</p> */}
                                                </div>
                                                <p className="text-white">{comment}</p>

                                            </div>
                                        </div>
                                    )}
                                    {
                                        commentList?.map(ele => (
                                            <li key={ele.id}>
                                                <CommentComp commentItem={ele} />
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        )
                    )

                }
            </div>
        </div>
    )
}

export default TextPostCardWIthComment;
