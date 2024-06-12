'use client';
import { Loader2, Plus, Share } from "lucide-react"
import { Button, buttonVariants } from "../ui/button"
import service from "@/firebase/firestore"
import { useCallback, useEffect, useState } from "react"
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import DialogComponent from "../DialogComponent";
import { CldUploadButton } from "next-cloudinary";
import { useRouter } from "next/navigation";


function ClubButtons({ members, alreadyMember, userId, roomId, admin, roomName }: { members: number, alreadyMember: boolean, userId: string, roomId: string, admin: string, roomName: string }) {
    console.log(userId, roomId)
    const [loading, setLoading] = useState(false)
    const [joined, setJoined] = useState(alreadyMember)
    const [flag, setFlag] = useState(false)
    const joinRoom = () => {
        setFlag(true)
        setJoined(true)
        setLoading(true)
        service.joinClub({ userId, roomId }).then(res => console.log(res)).catch(err => console.log(err)).finally(() => setLoading(false))
    }
    const leaveRoom = () => {
        setFlag(true)
        setJoined(false)
        setLoading(true)
        service.leaveCLub({ userId, roomId }).then(res => console.log(res)).catch(err => console.log(err)).finally(() => setLoading(false))
    }
    const handleUpload = useCallback(async (result: any) => {
        console.log(result);
        // setIcon(result.info.url)
    }, []);

    const router = useRouter()
    return (
        <div className="w-full bg-slate-700/50  rounded-lg flex justify-between gap-3 p-2">
            <div className="flex gap-3">
                {
                    admin === userId ? (
                        <Button >


                            <p className=" antialiased font-semibold">Edit</p>

                        </Button>
                    ) : (
                        joined ? (
                            <Button onClick={leaveRoom}>
                                {loading ? (<Loader2 className="h-4 w-4 text-white animate-spin" />) : (

                                    <p className=" antialiased font-semibold">Leave</p>)
                                }

                            </Button>
                        ) : (
                            <Button onClick={joinRoom}>
                                {loading ? (<Loader2 className="h-4 w-4 text-white animate-spin" />) : (

                                    <p className=" antialiased font-semibold">Join</p>)
                                }

                            </Button>)
                    )
                }

                <div className="p-2 md:flex hidden ">
                    <p className="text-red-600  md:font-bold">Members:    <span className="text-cyan-600">{members + (joined && flag ? 1 : 0)}</span></p>
                </div>
            </div>
            <div className="flex gap-2">
                {/* <Button variant={'ghost'}>
                    <Plus className="h-6 w-6 text-cyan-600" /> <p className="text-cyan-600 antialiased font-semibold">Post</p>
                </Button> */}

                <Button variant="outline"><Plus className="h-6 w-6 text-cyan-600" onClick={() => router.push(`/create-post/${roomId}`)} /> <p className="text-cyan-600 antialiased font-semibold" >Post</p></Button>

                <Button variant={'ghost'}>
                    <Share className="h-6 w-6 text-cyan-600" /> <p className="text-cyan-600 antialiased font-semibold">Share</p>
                </Button>
            </div>
        </div>
    )
}

export default ClubButtons