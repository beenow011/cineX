'use client';
import ClubPage from "@/components/Club/ClubPage";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { toast } from "@/components/ui/use-toast";
import service from "@/firebase/firestore";
import { DocumentData, Timestamp } from "firebase/firestore";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";

function Page() {
    const { roomID } = useParams<{ roomID: string }>()
    const [club, setClub] = useState<DocumentData>()
    console.log(roomID)

    useEffect(() => {
        service.retrieveRoom({ roomID }).then((res) => {

            setClub(res)
        }).catch(err => {
            toast({
                title: "Failed to load the club!",
                description: 'Check the url and try again!',
                variant: 'destructive',
            });
        })
    }, [])
    return (
        <div>
            <MaxWidthWrapper className="px-0 mx-auto mt-5 max-w-7xl md:p-8">
                <ClubPage club={club} />
            </MaxWidthWrapper>
        </div>
    )
}

export default Page