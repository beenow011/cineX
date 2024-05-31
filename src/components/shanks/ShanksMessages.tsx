'use client';
import { trpc } from "@/app/_trpc/client"
import { MovieContext } from "@/context/MovieContext";
import service from "@/firebase/firestore";
import { Timestamp } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { Msg } from "./Msg";
import { Loader } from "lucide-react";
import Image from "next/image";
import { Skeleton } from "../ui/skeleton";

export const Messages = ({ movieID, img }: { movieID: string, img: string | undefined }) => {

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
    const [typeWritter, setTypeWritter] = useState(false)
    const { msg, msgFlag: flag, setFlag } = useContext(MovieContext)
    const { data, isLoading, isFetched } = trpc.getMessages.useQuery(
        {
            movieID,
            limit: 10,
        }
    )
    useEffect(() => {
        setMessages(undefined)
        setTypeWritter(false)
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


    useEffect(() => {
        if (msg?.length > 0 && flag) {
            const newMessage: Message = {
                text: msg,
                isUserMessage: true,  // Assuming this is a user message, set accordingly
                uId: 'user_id',  // Set user ID accordingly
                mID: 'message_id',  // Generate or set message ID accordingly
                createdAt: Timestamp.fromDate(new Date()),
                movieID: 'movie_id'
            };
            setMessages(prev => {
                if (!prev) return { messages: [newMessage], nextCursor: null };
                return { messages: [newMessage, ...prev.messages], nextCursor: prev.nextCursor };
            });
        }
    }, [msg, flag])

    useEffect(() => {
        if (flag) {
            setTypeWritter(true)
        }
    }, [flag])

    return (


        <div className="flex flex-col-reverse pb-24 md:pb-7 gap-4 h-[100vh]  md:h-[calc(100vh-198px)] overflow-scroll p-3
    ">




            {
                isLoading || flag && (
                    <div className="flex items-center space-x-4 my-2">

                        <Image priority src={'/shanks1.jpg'} alt="shanks" quality={100} width={276} height={275} className="h-8 w-8 rounded-full mb-auto" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-[250px]" />
                            <Skeleton className="h-4 w-[200px]" />
                        </div>
                    </div>
                )
            }




            {
                isFetched ? (
                    messages?.messages.map((msg, i) => (
                        <div key={msg.mID} className={` w-full gap-2 flex ${msg.isUserMessage ? 'justify-end items-end' : 'justify-start items-start'}`}>
                            {
                                !msg.isUserMessage && (
                                    <Image priority src={'/shanks1.jpg'} alt="shanks" quality={100} width={276} height={275} className="h-8 w-8 rounded-full mb-auto" />
                                )
                            }
                            <Msg text={msg.text} createdAt={msg.createdAt} isUserMessage={msg.isUserMessage} index={i} typeWritter={typeWritter} /> {msg.isUserMessage && (
                                <img src={img} alt="profile pic" className="h-8 w-8 rounded-full mb-auto" />
                            )}
                        </div>
                    ))) : <>
                    loading
                </>
            }


            {/* {
    flag ? (

        msg ? (<div className={`flex w-full flex-col justify-end items-end animate-accordion-up `}>
            <Msg text={msg} createdAt={Timestamp.fromDate(new Date())} isUserMessage={true} />
        </div>) : (
            <div className="flex w-full flex-col justify-end items-end bg-cyan-600  rounded-md border-white border p-3">
                <Loader className="animate-spin h-4 w-4 text-white" />
            </div>
        )


    ) : null
} */}


        </div>

    )
}