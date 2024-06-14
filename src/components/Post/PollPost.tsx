import service from "@/firebase/firestore"
import { DocumentData } from "firebase/firestore"
import { useContext, useEffect, useState } from "react"
import TextPostCard from "./TextPostCard";
import MediaPostCard from "./MediaPostCard";
import NoPost from "./NoPost";
import PollPostCard from "./PollPostCard";
import { PostConext } from "@/context/PostContext";

function PollPost({ roomId }: { roomId: string }) {
    const { pollPost: posts } = useContext(PostConext)
    return (
        <div className="mt-3">
            <ul>
                {
                    posts && posts.length > 0 ? (
                        posts.map((ele, i) => (
                            <li key={i}>
                                <PollPostCard ele={ele} />
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

export default PollPost