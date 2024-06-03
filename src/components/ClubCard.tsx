'use client';
import Image from "next/image"
import { AspectRatio } from "./ui/aspect-ratio"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { useEffect, useState } from "react";
import { trpc } from "@/app/_trpc/client";
import { useRouter } from "next/navigation";

interface MovieResponse {
    Title: string;
    Poster: string;
    // Add other expected fields here
}

function ClubCard({ icon, banner, roomName, movie, id }: { icon: string, banner: string, roomName: string, movie: string, id: string }) {
    const [mov, setMovie] = useState<MovieResponse | null>()
    const router = useRouter()
    const { mutate: findMovie, isLoading } = trpc.retriveMoviesFromImdb.useMutation({
        onSuccess: (res) => {
            setMovie(res)
        },
        onError: (err) => {
            console.log(err)
        }
    })
    // console.log(mov)
    useEffect(() => {
        if (movie)
            findMovie({ imdbId: movie })
    }, [])
    return (
        <div className="bg-slate-600/40 hover:bg-zinc-900 w-64 lg:w-96 p-2    text-white rounded-t-lg my-1 lg:my-3" onClick={() => router.push(`/club/${id}`)}>
            <AspectRatio ratio={4 / 1} className="bg-gradient-to-r from-zinc-700 to-zinc-600">
                <Image src={banner} alt="banner" fill
                    className="rounded-md object-cover " />
            </AspectRatio>
            <div className="flex">
                <Avatar className="h-10 w-10 lg:h-16 lg:w-16 mt-2 ml-2 ">
                    <AvatarImage src={icon} alt="icon" />
                    <AvatarFallback>{roomName}</AvatarFallback>
                </Avatar>
                <div className="p-1 md:p-2 overflow-hidden">
                    <p className=" text-red-600 text-xs text-wrap md:text-sm font-bold">
                        {roomName}
                    </p>
                    <p className=" text-white text-xs  md:text-base truncate">
                        Movie: <span className="">{mov?.Title}</span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ClubCard