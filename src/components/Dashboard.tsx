'use client'
import { useEffect, useState } from "react"
import MaxWidthWrapper from "./MaxWidthWrapper"
import service from "@/firebase/firestore"
import { DocumentData } from "firebase/firestore"
import ClubCard from "./ClubCard"
import { useRouter } from "next/navigation"
import { Plus } from "lucide-react"
import Skeleton from "react-loading-skeleton"

interface cardParasm {
    icon: string, banner: string, roomName: string, movie: string
}
function Dashboard({ name, user }: { name: string | null | undefined, user: string | undefined }) {
    const [createdClubs, setCreatedClubs] = useState<DocumentData[] | null>()
    const router = useRouter()
    useEffect(() => {
        if (user) {
            service.getYourRooms({ user }).then(res => setCreatedClubs(res)).catch(err => console.log(err))
        }

    }, [])

    return (

        <MaxWidthWrapper className="px-0 mx-auto mt-5 max-w-[90rem] md:p-10">
            <div>
                <div className="w-full bg-zinc-900 border rounded-md border-white/30 p-4">
                    <h1 className="text-white text-xl font-bold">
                        Welcome {name}.!
                    </h1>
                    <h1 className="text-cyan-600 text-lg font-semibold mt-3">Your Clubs</h1>

                    <ul className="mt-4 mb-4 md:grid flex gap-5 justify-center items-center flex-wrap md:grid-cols-2 xl:grid-cols-3 mx-auto">
                        <li className="h-36">
                            <div className="bg-slate-600/40 hover:bg-zinc-900 w-80 lg:w-96 p-2 flex flex-col justify-center items-center h-full  text-white rounded-t-lg my-1 lg:my-3" onClick={() => router.push(`/create-club`)}>
                                <Plus className="h-6 w-6 text-cyan-600" />
                                <p className="text-white ">Create your new club</p>
                            </div>
                        </li>
                        {
                            createdClubs && (
                                createdClubs
                                    .sort((a, b) => b.createdAt.seconds - a.createdAt.seconds)
                                    .slice(0, 5)  // Select only the first 5 elements
                                    .map((ele, i) => (
                                        <li key={ele.roomID} className="">
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

                    <div className="bg-slate-600/40 w-full flex justify-center items-center text-cyan-600 p-2 hover:bg-zinc-900 transition font-bold cursor-pointer">See all your clubs</div>
                </div>
            </div>
        </MaxWidthWrapper>
    )
}

export default Dashboard