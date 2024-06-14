import service from "@/firebase/firestore"
import { DocumentData } from "firebase/firestore"
import { useContext, useEffect, useState } from "react"
import TextPostCard from "./TextPostCard";
import MediaPostCard from "./MediaPostCard";
import NoPost from "./NoPost";
import { PostConext } from "@/context/PostContext";
import PollPostCard from "./PollPostCard";

function AllPost({ roomId }: { roomId: string }) {
    const { mixedPost: posts } = useContext(PostConext)
    console.log(posts)
    return (
        <div className="mt-3">
            <ul>
                {
                    posts && posts.length > 0 ? (
                        posts.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds).map(ele => (
                            <li key={ele.id}>
                                {
                                    ele.type === 'text' && <TextPostCard ele={ele} />
                                }
                                {
                                    ele.type === 'media' && <MediaPostCard ele={ele} />
                                }
                                {
                                    ele.type === 'poll' && <PollPostCard ele={ele} />
                                }

                            </li>
                        ))
                    ) : (
                        <NoPost roomId={roomId} />
                    )
                }
            </ul>
        </div>
    )
}

export default AllPost