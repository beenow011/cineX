import service from "@/firebase/firestore"
import { DocumentData } from "firebase/firestore"
import { ThumbsUp } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import ReactQuill from "react-quill"
import { AspectRatio } from "../ui/aspect-ratio"
import Skeleton from "react-loading-skeleton"
import { toast } from "../ui/use-toast"
import { trpc } from "@/app/_trpc/client"


function MediaPostCard({ ele }: { ele: DocumentData }) {
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
        if (query.data) {
            setIsLiked(ele.likes.includes(query.data.userId!))
        }
    }, [ele])

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

    if (loading) {
        return <p className="text-white">Loading...</p>
    }

    if (error) {
        return <p className="text-white">{error}</p>
    }

    // useEffect(() => {
    //     if (ele.files[0]) {
    //         const img = new Image();
    //         img.src = ele.files[0];
    //         img.onload = () => {
    //             setAspectRatio(img.naturalWidth / img.naturalHeight);
    //         };
    //     }
    // }, [ele]);

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
            <div className="mb-2">
                {/* <AspectRatio ratio={ } className="bg-gradient-to-r from-black to-zinc-600"> */}
                <ul className="flex gap-2">
                    {ele.files.map((item: string, i: number) => (
                        <li key={i} className="flex-1">
                            {loading ? (
                                <Skeleton
                                    className="my-2 h-full object-contain"
                                    count={1}
                                    baseColor="black"
                                />
                            ) : (
                                <Image
                                    src={item}
                                    alt="Photo by Drew Beamer"
                                    height={200}
                                    width={300}
                                    className="rounded-md h-full object-contain w-full"
                                />
                            )}
                        </li>
                    ))}
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
    )
}


export default MediaPostCard