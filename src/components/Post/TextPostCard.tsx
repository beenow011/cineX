import service from "@/firebase/firestore"
import { DocumentData } from "firebase/firestore"
import { useEffect, useState } from "react"
import parse from "html-react-parser"
import { MoveUp, ThumbsUp } from "lucide-react"
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
function TextPostCard({ ele }: { ele: DocumentData }) {
    const [user, setUser] = useState<DocumentData[] | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

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
                <div className="border border-white rounded-lg p-2 w-fit hover:bg-slate-800 flex gap-2">
                    <ThumbsUp className="text-white h-4 w-4" />
                </div>
                <p className="text-md font-semibold py-2">{ele.likes}</p>
            </div>

        </div>
    )
}

export default TextPostCard
