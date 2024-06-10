import service from "@/firebase/firestore"
import { DocumentData } from "firebase/firestore"
import { ThumbsUp } from "lucide-react"
import { useEffect, useState } from "react"
import Skeleton from "react-loading-skeleton"
import ReactQuill from "react-quill"
import { Progress } from "../ui/progress"
import { Button } from "../ui/button"

function PollPostCard({ ele }: { ele: DocumentData }) {
    const [user, setUser] = useState<DocumentData[] | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const [voteOne, setVoteOne] = useState<number>(ele.pollOption[0].count)
    const [voteTwo, setVoteTwo] = useState<number>(ele.pollOption[1].count)
    const [voteThree, setVoteThree] = useState<number | null>(ele.pollOption[2]?.count)
    const [per1, setPer1] = useState<number>(0)
    const [per2, setPer2] = useState<number>(0)
    const [per3, setPer3] = useState<number>(0)
    const [voteFlag, setVoteFlag] = useState(false)

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
        if (voteOne && voteTwo)
            if (voteThree) {
                setPer1((voteOne / (voteOne + voteTwo + voteThree)))
                setPer2(voteTwo / (voteOne + voteTwo + voteThree))
                setPer3(voteThree / (voteOne + voteTwo + voteThree))
            } else {
                setPer1(voteOne / (voteOne + voteTwo))
                setPer2(voteTwo / (voteOne + voteTwo))
            }
    }, [voteOne, voteTwo, voteThree])

    if (loading) {
        return (
            <div>
                <Skeleton className="w-full h-32" />
            </div>
        )
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

                    value={ele.question}
                    readOnly={true}
                    theme="bubble" // Use 'bubble' theme which is minimal
                />
            </div>
            <div className="mb-2">
                {/* <AspectRatio ratio={ } className="bg-gradient-to-r from-black to-zinc-600"> */}
                <ul className=" flex flex-col gap-2">


                    <li className="flex w-full justify-between">
                        <div>
                            <Button onClick={() => setVoteOne(prev => prev + 1)}>
                                {ele.pollOption[0].text}
                            </Button>
                        </div>
                        <div className="flex gap-2">
                            <Progress value={per1 * 100} className="w-32 mt-1" /><span>{(per1 * 100).toFixed(2)}%</span>
                        </div>
                    </li>
                    <li className="flex w-full justify-between">
                        <div>
                            <Button onClick={() => setVoteTwo(prev => prev + 1)}>
                                {ele.pollOption[1].text}
                            </Button>
                        </div>
                        <div className="flex gap-2">
                            <Progress value={per2 * 100} className="w-32 mt-1" /><span>{(per2 * 100).toFixed(2)}%</span>
                        </div>
                    </li>
                    {
                        ele.pollOption[2] && (
                            <li className="flex w-full justify-between">
                                <div>
                                    <Button onClick={() => setVoteThree(prev => prev! + 1)} className="w-full">
                                        {ele.pollOption[2].text}
                                    </Button>
                                </div>
                                <div className="flex gap-2">
                                    <Progress value={per3 * 100} className="w-32 mt-1" /><div>{(per3 * 100).toFixed(2)}%</div>
                                </div>
                            </li>
                        )
                    }


                </ul>
                {/* </AspectRatio> */}
            </div>
            <div className="mt-1 flex align-middle gap-2">
                <div className="border border-white rounded-lg p-2 w-fit hover:bg-slate-800 flex gap-2">
                    <ThumbsUp className="text-white h-4 w-4" />
                </div>
                <p className="text-md font-semibold py-2">{ele.likes}</p>
            </div>

        </div>
    )
}

export default PollPostCard