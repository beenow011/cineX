import service from "@/firebase/firestore"
import { DocumentData } from "firebase/firestore"
import { useContext, useEffect, useState } from "react"
import TextPostCard from "./TextPostCard";
import NoPost from "./NoPost";
import { PostConext } from "@/context/PostContext";

function TextPost({ roomId }: { roomId: string }) {

    const { textPost: posts } = useContext(PostConext)
    return (
        <div className="mt-3">
            <ul>
                {
                    posts ? (
                        posts.map(ele => (
                            <li key={ele.id}>
                                <TextPostCard ele={ele} />
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

export default TextPost