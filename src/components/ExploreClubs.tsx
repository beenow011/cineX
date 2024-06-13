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
function Explore({ name, user }: { name: string | null | undefined, user: string | undefined }) {
    const [createdClubs, setCreatedClubs] = useState<DocumentData[] | null>()
    const router = useRouter()
    useEffect(() => {
        if (user) {
            service.exploreRooms({ limit: 10 }).then(res => setCreatedClubs(res)).catch(err => console.log(err))
        }

    }, [])

    return (

        <MaxWidthWrapper className="px-0 mx-auto mt-5 max-w-[90rem] md:p-10">
            <div>
                <div className="w-full bg-zinc-900 border rounded-md border-white/30 p-4">
                    <h1 className="text-white text-xl font-bold">
                        Find your new club.!
                    </h1>
                    <h1 className="text-cyan-600 text-lg font-semibold mt-3">Explore</h1>

                    <ul className="mt-4 mb-4 md:grid flex gap-5 justify-center items-center flex-wrap md:grid-cols-2 xl:grid-cols-3 mx-auto">
                        {
                            createdClubs && (
                                createdClubs
                                    .sort((a, b) => b.createdAt.seconds - a.createdAt.seconds)  // Select only the first 5 elements
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
            </div>
        </MaxWidthWrapper>
    )
}

export default Explore