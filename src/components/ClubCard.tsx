'use client';
import Image from "next/image"
import { AspectRatio } from "./ui/aspect-ratio"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { useEffect, useState } from "react";
import { trpc } from "@/app/_trpc/client";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import Skeleton from "react-loading-skeleton";

interface MovieResponse {
    Title: string;
    Poster: string;
    // Add other expected fields here
}

function ClubCard({ icon, banner, roomName, movie, id, index }: { icon: string, banner: string, roomName: string, movie: string, id: string, index: number }) {
    const [mov, setMovie] = useState<MovieResponse | null>()
    const router = useRouter()
    const [load, setLoad] = useState(true)
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
    useEffect(() => {
        setLoad(isLoading)
    }, [isLoading])
    return (
        load ? (
            <div className="w-full justify-center items-center">
                {/* <Loader className="h-5 w-5 text-white animate-spin" /> */}
                <Skeleton height={150} className="my-2 h-full" count={1} baseColor="#52525b" highlightColor="#555" />
            </div>
        ) : (
            <div className="bg-slate-600/40 hover:bg-zinc-900 w-80     lg:w-96 p-2    text-white rounded-t-lg my-1 lg:my-3 transition" onClick={() => router.push(`/club/${id}`)}>

                <AspectRatio ratio={4 / 1} className="bg-gradient-to-r from-black to-zinc-600">
                    <Image src={banner} alt="banner" fill
                        className="rounded-md object-cover  " />
                </AspectRatio>
                <div className="flex">
                    <Avatar className="h-10 w-10 lg:h-12 lg:w-12 mt-2 ml-2 ">
                        <AvatarImage src={icon} alt="icon" className="object-contain" />
                        <AvatarFallback>{roomName}</AvatarFallback>
                    </Avatar>
                    <div className="p-1 md:p-2 overflow-hidden">
                        <p className=" text-neutral-600 text-xs text-wrap md:text-sm font-bold cursor-pointer">
                            {roomName}
                        </p>
                        <p className=" text-white text-xs  md:text-base truncate cursor-pointer ">

                            Movie: <span className="">{mov?.Title}</span>
                        </p>
                    </div>
                </div>
            </div>)
    )
}

export default ClubCard