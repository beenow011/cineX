'use client';
import ClubMovie from "@/components/Club/ClubMovie";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import MediaPostCardWIthComment from "@/components/Post/MediaPostCardWithComment";
import PollPostCardWIthComment from "@/components/Post/PollPostCardWIthComment";
import TextPostCard from "@/components/Post/TextPostCard";
import TextPostCardWIthComment from "@/components/Post/TextPostCardWithComment";
import service from "@/firebase/firestore";
import { DocumentData } from "firebase/firestore";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";

function Page() {
    const { postId } = useParams<{ postId: string }>();
    const [ele, setEle] = useState<DocumentData | null>()
    useEffect(() => {
        if (postId)
            service.getAPollPost({ postId: postId as string }).then((res) => setEle(res)).catch(err => console.log(err))
    }, [postId])
    console.log(ele)
    return (
        <MaxWidthWrapper className="px-0 mx-auto mt-5 max-w-7xl md:p-8">
            <div className="flex flex-col-reverse md:flex-row mt-3 relative">
                <div className="flex-1 p-3 ">

                    {
                        ele && (
                            <PollPostCardWIthComment ele={ele} />
                        )
                    }
                </div>


                <ClubMovie movieID={ele?.roomName.substring(0, ele?.roomName.indexOf('/'))} />

            </div>
        </MaxWidthWrapper>
    )
}

export default Page