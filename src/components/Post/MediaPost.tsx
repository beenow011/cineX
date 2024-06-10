import service from "@/firebase/firestore"
import { DocumentData } from "firebase/firestore"
import { useEffect, useState } from "react"
import TextPostCard from "./TextPostCard";
import MediaPostCard from "./MediaPostCard";

function MediaPost({ roomId }: { roomId: string }) {
    const [posts, setPosts] = useState<DocumentData[] | null>()
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        let isMounted = true;

        service.getMediaPost({ roomID: roomId, limit: 10 })
            .then(res => {
                if (isMounted) {
                    setPosts(res);
                    setError(null); // Clear any previous error
                }
            })
            .catch(err => {
                if (isMounted) {
                    console.error('Failed to fetch posts:', err);
                    setError('Failed to load posts'); // Update error state
                }
            });
        return () => {
            isMounted = false;
        };
    }, [roomId]);
    return (
        <div className="mt-3">
            <ul>
                {
                    posts?.map(ele => (
                        <li key={ele.id}>
                            <MediaPostCard ele={ele} />
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default MediaPost