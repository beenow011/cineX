import { DocumentData } from "firebase/firestore"
import { AspectRatio } from "../ui/aspect-ratio"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import ClubPosts from "./ClubPosts"
import ClubMovie from "./ClubMovie"


function ClubPage({ club }: { club: DocumentData | undefined }) {
    const strings = club?.roomName.split('/')
    return (
        <div>
            <AspectRatio ratio={4 / 1} className="bg-gradient-to-r from-zinc-700 to-zinc-600">
                < Image
                    src={club?.banner}
                    alt="Photo by Drew Beamer"
                    fill
                    className="rounded-md object-cover"
                />
            </AspectRatio>
            <div className="mt-4 bg-zinc-900 p-4 rounded-b-lg hidden md:flex">
                <Avatar className="h-16 w-16 md:h-48 md:w-48 ">
                    <AvatarImage src={club?.icon} alt="icon" />
                    <AvatarFallback>{club?.roomName}</AvatarFallback>
                </Avatar>
                <div className="p-3">
                    <p className="text-red-600 antialiased">
                        {
                            strings && strings[0]
                        }/<span className="font-bold text-cyan-600 text-2xl">{strings && strings[1]}</span></p>
                    <p className="text-white ">
                        {club?.description}

                    </p>
                </div>
            </div>
            <div className="mt-4 bg-zinc-900 p-4 rounded-b-lg flex h-36 overflow-scroll relative md:hidden">
                <Avatar className="h-16 w-16 md:h-48 md:w-48 fixed ">
                    <AvatarImage src={club?.icon} alt="icon" />
                    <AvatarFallback>{club?.roomName}</AvatarFallback>
                </Avatar>
                <div className=" absolute right-0 w-3/4">
                    <p className="text-red-600 antialiased">
                        {
                            strings && strings[0]
                        }/<span className="font-bold text-cyan-600 text-2xl">{strings && strings[1]}</span></p>
                    <p className="text-white truncate text-wrap  ">
                        {club?.description}

                    </p>
                </div>
            </div>


            <div className="flex flex-col-reverse md:flex-row mt-3">
                <ClubPosts />
                <ClubMovie movieID={club?.movieID} />
            </div>
        </div >
    )
}

export default ClubPage