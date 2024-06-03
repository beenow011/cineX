'use client'
import { useEffect, useState } from "react"
import MaxWidthWrapper from "./MaxWidthWrapper"
import service from "@/firebase/firestore"
import { DocumentData } from "firebase/firestore"
import ClubCard from "./ClubCard"

interface cardParasm {
    icon: string, banner: string, roomName: string, movie: string
}
function Dashboard({ name, user }: { name: string | null | undefined, user: string | undefined }) {
    const [createdClubs, setCreatedClubs] = useState<DocumentData[] | null>()
    useEffect(() => {
        if (user) {
            service.getYourRooms({ user }).then(res => setCreatedClubs(res)).catch(err => console.log(err))
        }
    }, [])
    return (

        <MaxWidthWrapper className="px-0 mx-auto mt-5 max-w-7xl md:p-10">
            <div>
                <div className="w-full bg-zinc-900 border rounded-md border-white/30 p-4">
                    <h1 className="text-white text-xl font-bold">
                        Welcome {name}.!
                    </h1>
                    <ul className="flex mt-4 flex-wrap gap-3">
                        {
                            createdClubs && (createdClubs.map((ele) => (
                                <li key={ele.roomID}><ClubCard icon={ele.icon} banner={ele.banner} roomName={ele.roomName} movie={ele.movie} /></li>
                            )))
                        }

                    </ul>
                </div>
            </div>
        </MaxWidthWrapper>
    )
}

export default Dashboard