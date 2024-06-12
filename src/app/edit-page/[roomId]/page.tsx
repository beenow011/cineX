'use client';

import { EditInfo } from "@/components/Club/EditInfo"
import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import { toast } from "@/components/ui/use-toast"
import service from "@/firebase/firestore"
import { currentUser } from "@clerk/nextjs/server"
import { DocumentData } from "firebase/firestore"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function Page() {
    const { roomId } = useParams<{ roomId: string }>()
    const [club, setClub] = useState<DocumentData>()
    const [loading, setLoading] = useState<boolean>(false)
    console.log(roomId)

    useEffect(() => {
        setLoading(true)
        service.retrieveRoom({ roomID: roomId }).then((res) => {

            setClub(res)
        }).catch(err => {
            toast({
                title: "Failed to load the club!",
                description: 'Check the url and try again!',
                variant: 'destructive',
            });
        }).finally(() => setLoading(false))
    }, [])

    return (
        <div>
            <MaxWidthWrapper className="px-0 mx-auto mt-5 max-w-7xl md:p-8">
                {club && (
                    <EditInfo club={club} roomId={roomId} />

                )}
            </MaxWidthWrapper>

        </div>
    )
}