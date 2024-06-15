'use client';
import ClubMovie from "@/components/Club/ClubMovie";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import TextPostCard from "@/components/Post/TextPostCard";
import TextPostCardWIthComment from "@/components/Post/TextPostCardWithComment";
import service from "@/firebase/firestore";
import { DocumentData } from "firebase/firestore";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";

function page() {
    const { postId: pageId } = useParams();
    const [ele, setEle] = useState<DocumentData>()
    useEffect(() => {
        if (pageId)
            service.getAPost({ postId: pageId as string }).then(res => setEle(res.data())).catch(err => console.log(err))
    }, [pageId])
    return (
        <MaxWidthWrapper className="px-0 mx-auto mt-5 max-w-7xl md:p-8">
            <div className="flex flex-col-reverse md:flex-row mt-3 relative">
                <div className="flex-1 p-3 ">

                    {
                        ele && (
                            <TextPostCardWIthComment ele={ele} />
                        )
                    }
                </div>


                <ClubMovie movieID={ele?.roomName.substring(0, ele?.roomName.indexOf('/'))} />

            </div>
        </MaxWidthWrapper>
    )
}

export default page