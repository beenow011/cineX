'use client';
import { DocumentData } from "firebase/firestore"
import { AspectRatio } from "../ui/aspect-ratio"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import ClubPosts from "./ClubPosts"
import ClubMovie from "./ClubMovie"
import ClubButtons from "./ClubButtons"
import { currentUser, getAuth } from "@clerk/nextjs/server"
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/context/AuthContext";
import { trpc } from "@/app/_trpc/client";
import service from "@/firebase/firestore";
import Skeleton from "react-loading-skeleton";
import { Skeleton as Skel } from "../ui/skeleton";



function ClubPage({ club, roomId, loadingMain }: { club: DocumentData | undefined, roomId: string, loadingMain: boolean }) {
    const strings = club?.roomName.split('/')
    // const { userId } = useContext(UserContext)
    const query = trpc.getUser.useQuery()
    const [flag, setFlag] = useState(false)
    const [loading, setLoading] = useState(false)
    const joinRoom = () => {
        setLoading(true)
        service.joinClub({ userId: query.data?.userId!, roomId }).then(res => console.log(res)).catch(err => console.log(err)).finally(() => setLoading(false))
    }
    const leaveRoom = () => {
        setLoading(true)
        service.leaveCLub({ userId: query.data?.userId!, roomId }).then(res => console.log(res)).catch(err => console.log(err)).finally(() => setLoading(false))
    }
    if (query.data) {

        console.log('a', query.data.userId)
    }
    useEffect(() => {

        club?.users?.includes(query.data?.userId) ? setFlag(true) : setFlag(false)
    }, [query])

    return (
        <div>
            <AspectRatio ratio={4 / 1} className="bg-gradient-to-r from-black to-zinc-600">
                {
                    loadingMain ? (<Skeleton className="my-2 h-full object-contain " count={1} baseColor="black" />) : (

                        < Image
                            src={club?.banner}
                            alt="Photo by Drew Beamer"
                            fill
                            className="rounded-md object-contain"
                        />

                    )
                }
            </AspectRatio>
            <div className="mt-4 bg-zinc-900 p-4 rounded-b-lg hidden md:flex gap-6 ">

                <Avatar className="h-16 w-16 md:h-48 md:w-48 ">

                    <AvatarImage src={club?.icon} alt="icon" className="object-contain" />
                    <AvatarFallback>{club?.roomName}</AvatarFallback>
                </Avatar>
                {
                    loadingMain ? (
                        <div className="p-3 h-full flex flex-col my-auto gap-2">

                            <Skel className="h-4 w-[250px]" />
                            <Skel className="h-4 w-[250px]" />
                        </div>
                    ) : (
                        <div className="p-3 h-full flex flex-col my-auto">
                            <p className="text-red-600 antialiased">
                                {
                                    strings && strings[0]
                                }/<span className="font-bold text-cyan-600 text-2xl">{strings && strings[1]}</span></p>
                            <p className="text-white font-semibold ">
                                {club?.description}

                            </p>

                        </div>
                    )
                }

            </div>
            <div className="mt-4 bg-zinc-900 p-4 rounded-b-lg flex h-36 overflow-scroll relative md:hidden">
                <Avatar className="h-16 w-16 md:h-48 md:w-48 fixed ">
                    <AvatarImage src={club?.icon} alt="icon" className="object-contain" />

                </Avatar>
                {
                    loadingMain ? (
                        <div className="p-3 h-full flex flex-col my-auto gap-2 absolute  right-0 w-3/4">

                            <Skel className="h-4 w-[250px]" />
                            <Skel className="h-4 w-[250px]" />
                        </div>
                    ) : (
                        <div className=" absolute  right-0 w-3/4">
                            <p className="text-red-600 antialiased">
                                {
                                    strings && strings[0]
                                }/<span className="font-bold text-cyan-600 text-2xl">{strings && strings[1]}</span></p>
                            <p className="text-white truncate text-wrap   ">
                                {club?.description}

                            </p>
                        </div>)}

            </div>


            <div className="flex flex-col-reverse md:flex-row mt-3">
                <div className="flex-1 p-3 ">
                    <ClubButtons members={club?.users.length | 0} alreadyMember={flag} userId={query.data?.userId!} roomId={roomId} admin={club?.createdBy} join={joinRoom} leave={leaveRoom} loading={loading} roomName={club?.roomName} />
                    <ClubPosts />
                </div>


                <ClubMovie movieID={club?.movieID} />

            </div>
        </div >
    )
}

export default ClubPage