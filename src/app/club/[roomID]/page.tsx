'use client';
import { trpc } from "@/app/_trpc/client";
import ClubPage from "@/components/Club/ClubPage";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { toast } from "@/components/ui/use-toast";
import service from "@/firebase/firestore";
import { DocumentData, Timestamp } from "firebase/firestore";
import { redirect, useParams } from "next/navigation"
import { useEffect, useState } from "react";

function Page() {
    // const user = await currentUser()
    const query = trpc.getUser.useQuery()
    const { roomID } = useParams<{ roomID: string }>()
    // if (!query?.data?.userId) redirect(`/auth-callback?origin=club/${roomID}`)
    const [club, setClub] = useState<DocumentData>()
    const [loading, setLoading] = useState<boolean>(false)
    console.log(roomID)

    useEffect(() => {
        setLoading(true)
        service.retrieveRoom({ roomID }).then((res) => {

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
                <ClubPage club={club} roomId={roomID} loadingMain={loading} />
            </MaxWidthWrapper>
        </div>
    )
}

export default Page