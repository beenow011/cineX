'use client';
import { trpc } from "@/app/_trpc/client";
import service from "@/firebase/firestore";
import { DocumentData } from "firebase/firestore";
import { Dispatch, SetStateAction, createContext, useEffect, useState } from "react";

interface contextParams {
    textPost: DocumentData[] | null
    mediaPost: DocumentData[] | null
    pollPost: DocumentData[] | null
    mixedPost: DocumentData[] | null
    setRoomId: Dispatch<SetStateAction<string | null>>
    field: string
    setField: Dispatch<SetStateAction<string>>
}

export const PostConext = createContext<contextParams>({
    textPost: [],
    mediaPost: [],
    pollPost: [],
    mixedPost: [],
    setRoomId: () => { },
    field: 'any',
    setField: () => { }
})

export const PostProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [field, setField] = useState('Text')
    const [textPost, setTextPost] = useState<DocumentData[] | null>([])
    const [mediaPost, setMediaPost] = useState<DocumentData[] | null>([])
    const [pollPost, setPollPost] = useState<DocumentData[] | null>([])
    const [mixedPost, setMixedPosts] = useState<DocumentData[] | null>([]);
    const [roomId, setRoomId] = useState<string | null>('')
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            if (!roomId) return;

            try {
                const [textRes, mediaRes, pollRes] = await Promise.all([
                    service.getTextPost({ roomID: roomId, limit: 10 }),
                    service.getMediaPost({ roomID: roomId, limit: 10 }),
                    service.getPollPost({ roomID: roomId, limit: 10 })
                ]);

                if (isMounted) {
                    const textPostsWithType = textRes?.map(post => ({ ...post, type: 'text' }));
                    const mediaPostsWithType = mediaRes?.map(post => ({ ...post, type: 'media' }));
                    const pollPostsWithType = pollRes?.map(post => ({ ...post, type: 'poll' }));
                    if (textPostsWithType && mediaPostsWithType && pollPostsWithType) {
                        const allPosts = [...textPostsWithType, ...mediaPostsWithType, ...pollPostsWithType];

                        setMixedPosts(allPosts);
                    } else {
                        setMixedPosts([]);
                    }
                    setTextPost(textPostsWithType || []);
                    setMediaPost(mediaPostsWithType || []);
                    setPollPost(pollPostsWithType || []);
                    setError(null); // Clear any previous error
                }
            }
            catch (err) {
                if (isMounted) {
                    console.error('Failed to fetch posts:', err);
                    setError('Failed to load posts'); // Update error state
                }
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, [roomId]);
    console.log('error', textPost, roomId)
    return (
        <PostConext.Provider value={{ textPost, mediaPost, pollPost, setRoomId, field, mixedPost, setField }}>
            {children}
        </PostConext.Provider>
    )
}