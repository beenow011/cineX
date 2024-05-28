'use client';
import { trpc } from "@/app/_trpc/client"
import { MovieContext } from "@/context/MovieContext";
import service from "@/firebase/firestore";
import { Timestamp } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { Msg } from "./Msg";
import { Loader } from "lucide-react";

export const Messages = ({ movieID }: { movieID: string }) => {

    // const fetchFn = async () => {
    //     const cursor = 'e1e19f75-4b2e-40a5-a5cf-915bf51bc627'
    //     const messages = await service.retrievePrevMsg({
    //         uId: 'user_2fiL6OmtBdCvoXUN7ZH2M9ADIe0',
    //         movieID,
    //         limit: 10,
    //         order: false,
    //         lastVisible: cursor ? cursor : undefined,
    //     });
    //     if (messages) console.log('messages', messages)
    // }
    type Message = {
        // Define the structure of a single message here
        text: string,
        isUserMessage: boolean,
        uId: string,
        mID: string,
        movieID: string,
        createdAt: Timestamp
    };
    type PrevMsgParams = {
        messages: Message[],
        nextCursor: string | null | undefined
    };
    const [messages, setMessages] = useState<PrevMsgParams | undefined>()
    const { msg, msgFlag: flag, setFlag } = useContext(MovieContext)
    const { data, isLoading, isFetched } = trpc.getMessages.useQuery(
        {
            movieID,
            limit: 10,
        }
    )
    useEffect(() => {
        setMessages(undefined)
    }, [movieID])
    useEffect(() => {
        if (isFetched && data) {
            const typedData: PrevMsgParams = {
                messages: data.messages as Message[],
                nextCursor: data.nextCursor
            };
            setFlag(false)
            setMessages(typedData);

        }
    }, [isFetched, data]);
    // console.log(flag)
    // useEffect(() => {
    //     if (msg?.length > 0 && flag) {
    //         const newMessage: Message = {
    //             text: msg,
    //             isUserMessage: true,  // Assuming this is a user message, set accordingly
    //             uId: 'user_id',  // Set user ID accordingly
    //             mID: 'message_id',  // Generate or set message ID accordingly
    //             createdAt: Timestamp.fromDate(new Date()),
    //             movieID: 'movie_id'
    //         };
    //         setMessages(prev => {
    //             if (!prev) return { messages: [newMessage], nextCursor: null };
    //             return { messages: [newMessage, ...prev.messages], nextCursor: prev.nextCursor };
    //         });
    //     }
    // }, [msg, flag])

    return (

        <div className="p-3 flex flex-col-reverse  gap-4 h-[calc(100vh-198px)] overflow-scroll
    ">

            {
                isFetched ? (
                    messages?.messages.map((msg) => (
                        <div key={msg.mID} className={`flex w-full flex-col ${msg.isUserMessage ? 'justify-end items-end' : 'justify-start items-start'}`}>
                            <Msg text={msg.text} createdAt={msg.createdAt} isUserMessage={msg.isUserMessage} />
                        </div>
                    ))) : <>
                    loading
                </>
            }
            {
                flag ? (

                    msg ? (<div className={`flex w-full flex-col justify-end items-end animate-accordion-up `}>
                        <Msg text={msg} createdAt={Timestamp.fromDate(new Date())} isUserMessage={true} />
                    </div>) : (
                        <div className="flex w-full flex-col justify-end items-end bg-cyan-600  rounded-md border-white border p-3">
                            <Loader className="animate-spin h-4 w-4 text-white" />
                        </div>
                    )


                ) : null
            }
        </div>)
}