
import { trpc } from "@/app/_trpc/client"
import { MovieContext } from "@/context/MovieContext";
import service from "@/firebase/firestore";
import { useContext, useEffect } from "react";

export const Messages = ({ movieID }: { movieID: string }) => {

    const fetchFn = async () => {
        const cursor = 'e1e19f75-4b2e-40a5-a5cf-915bf51bc627'
        const messages = await service.retrievePrevMsg({
            uId: 'user_2fiL6OmtBdCvoXUN7ZH2M9ADIe0',
            movieID,
            limit: 10,
            order: false,
            lastVisible: cursor ? cursor : undefined,
        });
        if (messages) console.log('messages', messages)
    }

    if (movieID?.length > 0) {
        // const { data, isLoading, isFetched } =
        //     trpc.getMessages.useQuery(
        //         {
        //             movieID,
        //             limit: 10,
        //         },

        //     )
        // if (isFetched) console.log('data', data)
        fetchFn();

    }
    return (<>
        <p className="text-white">hello</p>
    </>)
}