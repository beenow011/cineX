import Image from "next/image"
import { AspectRatio } from "./ui/aspect-ratio"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"


function ClubCard({ icon, banner, roomName, movie }: { icon: string, banner: string, roomName: string, movie: string }) {
    return (
        <div className="bg-slate-600/40 w-64  text-white ">
            <AspectRatio ratio={4 / 1} className="bg-gradient-to-r from-zinc-700 to-zinc-600">
                <Image src={banner} alt="banner" fill
                    className="rounded-md object-cover" />
            </AspectRatio>
            <div className="flex">
                <Avatar className="h-16 w-16 mt-2 ml-2 ">
                    <AvatarImage src={icon} alt="icon" />
                    <AvatarFallback>{roomName}</AvatarFallback>
                </Avatar>

            </div>
        </div>
    )
}

export default ClubCard