'use client'
import { useEffect, useState } from "react"
import MaxWidthWrapper from "./MaxWidthWrapper"
import service from "@/firebase/firestore"
import { DocumentData } from "firebase/firestore"
import ClubCard from "./ClubCard"
import { useRouter } from "next/navigation"
import { Plus } from "lucide-react"
import Skeleton from "react-loading-skeleton"
import { HoverEffect } from "./ui/card-hover-effect"
import { absoluteUrl } from "@/lib/utils"

interface cardParasm {
    icon: string, banner: string, roomName: string, movie: string
}
function Dashboard({ name, user }: { name: string | null | undefined, user: string | undefined }) {
    const [createdClubs, setCreatedClubs] = useState<DocumentData[] | null>()
    const [joinedClubs, setJoinedClubs] = useState<DocumentData[] | null>()
    const router = useRouter()
    useEffect(() => {
        if (user) {
            service.getYourRooms({ user }).then(res => setCreatedClubs(res)).catch(err => console.log(err))
            service.getJoinedRooms({ userId: user }).then(res => setJoinedClubs(res)).catch(err => console.log(err))
        }

    }, [])
    console.log(joinedClubs)
    const projects = [
        {
            title: "Shanks: The Movie Guru",
            description: ' Shanks is a chatbot designed to answer all your movie-related questions. Whether you need a plot summary, an ending explained, or details about the cast and crew, Shanks has you covered.',
            link: `${absoluteUrl('/shanks')}`,
        },
        {
            title: "Discover Movies Inspired by Your Favorite Films!",
            description: ' Discover tailored movie recommendations based on your unique taste. Explore new cinematic horizons and uncover hidden gems inspired by films you love!',
            link: `${absoluteUrl('/movies/fav-movies')}`,
        },
        {
            title: " Explore Films Based on Your Story Preferences!",
            description: 'Direct your movie-watching journey with personalized recommendations tailored to your storytelling preferences, from epic adventures to heartfelt romances and gripping mysteries. Explore cinematic masterpieces that align perfectly with your unique vision.',
            link: `${absoluteUrl('/movies/fav-plots')}`,
        },

    ];

    return (

        <MaxWidthWrapper className="px-0 mx-auto mt-5 max-w-[90rem] md:p-10">
            <div>
                <div className=" flex flex-col justify-between px-8 w-full bg-gradient-to-r from-black  to-slate-900 shadow-xl  rounded-md  shadow-slate-700 ">
                    <h1 className="text-white text-xl font-bold">
                        Welcome {name}.!
                    </h1>
                    <HoverEffect items={projects} target="" />
                </div>
                <div className="w-full bg-gradient-to-r from-black  to-slate-900 shadow-xl m-3 rounded-md py-5 shadow-slate-700 p-4">

                    <h1 className="text-cyan-600 text-lg font-semibold mt-3">Your Clubs</h1>

                    <ul className="mt-4 mb-4 scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch flex gap-5 justify-center items-center md:justify-normal md:items-start flex-wrap md:flex-nowrap md:overflow-scroll mx-auto md:mx-0">
                        <li className="h-36">
                            <div className="bg-slate-600/40 hover:bg-zinc-900 w-80 lg:w-96 p-2 flex flex-col justify-center items-center h-full  text-white rounded-t-lg my-1 lg:my-3" onClick={() => router.push(`/create-club`)}>
                                <Plus className="h-6 w-6 text-cyan-600" />
                                <p className="text-white ">Create your new club</p>
                            </div>
                        </li>
                        {
                            createdClubs && (
                                createdClubs
                                    .sort((a, b) => b.createdAt.seconds - a.createdAt.seconds) // Select only the first 5 elements
                                    .map((ele, i) => (
                                        <li key={i} className="">
                                            <ClubCard
                                                icon={ele.icon}
                                                banner={ele.banner}
                                                roomName={ele.roomName}
                                                movie={ele.movieID}
                                                id={ele.id}
                                                index={i}
                                            />
                                        </li>
                                    ))
                            )
                        }

                    </ul>


                </div>
                {
                    joinedClubs?.length! > 0 && (
                        <div className="w-full bg-gradient-to-r from-black  to-slate-900 shadow-xl m-3 rounded-md py-5 shadow-slate-700 p-4">

                            <h1 className="text-cyan-600 text-lg font-semibold mt-3">Joined Clubs</h1>

                            <ul className="mt-4 mb-4 scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch flex gap-5 justify-center items-center md:justify-normal md:items-start flex-wrap md:flex-nowrap md:overflow-y-scroll mx-auto md:mx-0">

                                {
                                    joinedClubs ? (
                                        joinedClubs
                                            .sort((a, b) => b.createdAt.seconds - a.createdAt.seconds) // Select only the first 5 elements
                                            .map((ele, i) => (
                                                <li key={i} className="">
                                                    <ClubCard
                                                        icon={ele.icon}
                                                        banner={ele.banner}
                                                        roomName={ele.roomName}
                                                        movie={ele.movieID}
                                                        id={ele.id}
                                                        index={i}
                                                    />
                                                </li>
                                            ))
                                    ) : (
                                        <div className="w-full flex justify-center items-center text-white">
                                            <h1>You have not joined any club.</h1>
                                        </div>
                                    )
                                }

                            </ul>


                        </div>
                    )
                }

            </div>
        </MaxWidthWrapper>
    )
}

export default Dashboard
