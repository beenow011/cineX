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
import Image from "next/image"
import { Progress } from "../ui/progress"
import { Button } from "../ui/button"
function PollPostCardWIthComment({ ele }: { ele: DocumentData }) {
    const router = useRouter()
    // const [user, setUser] = useState<DocumentData[] | null>(null)
    // const [loading, setLoading] = useState<boolean>(true)
    // const [error, setError] = useState<string | null>(null)
    // const [isLiked, setIsLiked] = useState(false)
    // const [flag, setFlag] = useState(false)
    const [flagComment, setFlagComment] = useState(false)
    const [commentLoad, setCommentLoad] = useState(false)
    const [comment, setComment] = useState('')
    const [commentList, setCommentList] = useState<DocumentData[] | null>(null)
    // const query = trpc.getUser.useQuery()
    // const [likes, setLikes] = useState(ele.likes.length as number)
    const [user, setUser] = useState<DocumentData[] | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const [voteOne, setVoteOne] = useState<number>(ele.voters1.length)
    const [voteTwo, setVoteTwo] = useState<number>(ele.voters2.length)
    const [voteThree, setVoteThree] = useState<number | null>(ele?.voters3.length)
    const [yourVote, setYourVote] = useState<number>()
    const [per1, setPer1] = useState<number>(0)
    const [per2, setPer2] = useState<number>(0)
    const [per3, setPer3] = useState<number>(0)
    const [voteFlag, setVoteFlag] = useState(false)
    const [isLiked, setIsLiked] = useState(false)
    const [flag, setFlag] = useState(false)
    const query = trpc.getUser.useQuery()
    const [likes, setLikes] = useState(ele.likes.length as number)
    // useEffect(() => {
    //     if (flag) {
    //         if (isLiked)
    //             setLikes(prev => prev + 1)
    //         else
    //             setLikes(prev => prev - 1)
    //     }
    // }, [isLiked])
    // useEffect(() => {
    //     service.getUser({ uId: ele.userId })
    //         .then(res => {
    //             setUser(res)
    //             setLoading(false)
    //         })
    //         .catch(err => {
    //             console.error("Error fetching user data:", err)
    //             setError("Failed to load user data")
    //             setLoading(false)
    //         })
    // }, [ele])
    // useEffect(() => {
    //     if (query.data) {
    //         setIsLiked(ele.likes.includes(query.data.userId!))
    //     }
    // }, [ele])
    useEffect(() => {
        if (query.data) {
            setVoteFlag(
                ele.voters1.includes(query.data.userId!) ||
                ele.voters2.includes(query.data.userId!) ||
                ele.voters3.includes(query.data.userId!)
            );
            if (ele.voters1.includes(query.data.userId!)) {
                setYourVote(1)
            } else if (ele.voters2.includes(query.data.userId!)) {
                setYourVote(2)
            } else if (ele.voters3.includes(query.data.userId!))
                setYourVote(3)
        }
    }, [ele]);
    useEffect(() => {
        if (voteOne || voteTwo || voteThree) {
            const totalVotes = voteOne + voteTwo + (voteThree || 0);
            if (totalVotes > 0) {
                setPer1(voteOne / totalVotes);
                setPer2(voteTwo / totalVotes);
                setPer3(voteThree ? voteThree / totalVotes : 0);
            } else {
                setPer1(0);
                setPer2(0);
                setPer3(0);
            }
        }
    }, [voteOne, voteTwo, voteThree]);
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
        service.addLike({ postId: ele.id, userId: query.data?.userId!, type: 1 })
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

        service.removeLike({ postId: ele.id, userId: query.data?.userId!, type: 1 })
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
    const optionOneClicked = () => {
        setVoteOne(prev => prev + 1)
        setVoteFlag(true)
        setYourVote(1)
        if (user)
            service.addVote({ postId: ele.id, userId: query.data?.userId!, option: 0 })
                .then(res => toast({
                    title: "Successfully Voted!",
                    description: "Your vote as been saved! Thank you",
                    variant: 'default',
                }))
                .catch(err => toast({
                    title: "Failed to post",
                    description: err.message,
                    variant: 'destructive',
                }))


    }
    const optionTwoClicked = () => {
        setVoteTwo(prev => prev + 1)
        setVoteFlag(true)
        setYourVote(2)
        if (user)
            service.addVote({ postId: ele.id, userId: query.data?.userId!, option: 1 })
                .then(res => toast({
                    title: "Successfully Voted!",
                    description: "Your vote as been saved! Thank you",
                    variant: 'default',
                }))
                .catch(err => toast({
                    title: "Failed to post",
                    description: err.message,
                    variant: 'destructive',
                }))


    }
    const optionThreeClicked = () => {
        setVoteThree(prev => prev! + 1)
        setVoteFlag(true)
        setYourVote(3)
        if (user)
            service.addVote({ postId: ele.id, userId: query.data?.userId!, option: 2 })
                .then(res => toast({
                    title: "Successfully Voted!",
                    description: "Your vote as been saved! Thank you",
                    variant: 'default',
                }))
                .catch(err => toast({
                    title: "Failed to post",
                    description: err.message,
                    variant: 'destructive',
                }))


    }

    return (
        <div>
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

                        value={ele.question}
                        readOnly={true}
                        theme="bubble" // Use 'bubble' theme which is minimal
                    />
                </div>
                <div className="mb-2">
                    {/* <AspectRatio ratio={ } className="bg-gradient-to-r from-black to-zinc-600"> */}
                    <ul className=" flex flex-col gap-2">


                        <li className="flex flex-col md:flex-row w-full justify-between">
                            <div>
                                <Button onClick={optionOneClicked} className="w-full" disabled={voteFlag}>
                                    {ele.pollOption[0].text}
                                </Button>
                            </div>
                            <div className="flex gap-2">
                                <Progress value={per1 * 100} className="w-32 mt-1 mr-2" color={yourVote === 1 ? 'bg-cyan-600' : 'bg-primary'} /><span className="ml-2 px-1">{(per1 * 100).toFixed(2)}%</span>
                            </div>
                        </li>
                        <li className="flex flex-col md:flex-row w-full justify-between">
                            <div>
                                <Button onClick={optionTwoClicked} className="w-full" disabled={voteFlag}>
                                    {ele.pollOption[1].text}
                                </Button>
                            </div>
                            <div className="flex gap-2 ">
                                <Progress value={per2 * 100} className="w-32 mt-1 mr-2 " color={yourVote === 2 ? 'bg-cyan-600' : 'bg-primary'} /><span className="ml-2 px-1 ">{(per2 * 100).toFixed(2)}%</span>
                            </div>
                        </li>
                        {
                            ele.pollOption[2] && (
                                <li className="flex flex-col md:flex-row w-full justify-between">
                                    <div>
                                        <Button onClick={optionThreeClicked} className="w-full" disabled={voteFlag}>
                                            {ele.pollOption[2].text}
                                        </Button>
                                    </div>
                                    <div className="flex gap-2 relative">
                                        <Progress value={per3 * 100} className="w-32 mt-1 mr-2" color={yourVote === 3 ? 'bg-cyan-600' : 'bg-primary'} /><div className="ml-2 px-1">{(per3 * 100).toFixed(2)}%</div>
                                    </div>
                                </li>
                            )
                        }


                    </ul>
                    {/* </AspectRatio> */}
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
                        commentList?.length === 0 || !commentList ? (
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
                                <ul className="flex flex-col ">
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

export default PollPostCardWIthComment;
