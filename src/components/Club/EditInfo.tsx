import { DocumentData } from "firebase/firestore"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import { useCallback, useState } from "react"

import { CldUploadButton } from 'next-cloudinary';
import { Button, buttonVariants } from "../ui/button"
import Image from "next/image"
import { AspectRatio } from "../ui/aspect-ratio"
import { Avatar, AvatarImage } from "../ui/avatar"
import { toast } from "../ui/use-toast"
import service from "@/firebase/firestore"
import { useRouter } from "next/navigation"
import { Loader } from "lucide-react"
export const EditInfo = ({ club, roomId }: { club: DocumentData, roomId: string }) => {
    console.log(club)
    const [des, setDes] = useState(club?.description)
    const [icon, setIcon] = useState(club?.icon)
    const [banner, setBanner] = useState(club?.banner)
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const handleUpload = useCallback(async (result: any) => {
        console.log(result);
        setIcon(result.info.url)
    }, []);
    const handleBannerUpload = useCallback(async (result: any) => {
        console.log(result);
        setBanner(result.info.url)
    }, []);

    const editPost = () => {
        if (des) {
            setLoading(true);
            service.editRoom({ roomId, description: des, icon, banner })
                .then(res => router.push(`/club/${roomId}`))
                .catch(err =>
                    toast({
                        title: "Something is wrong!",
                        description: err.message,
                        variant: 'destructive',
                    })
                ).finally(() => setLoading(false))
        } else {
            toast({
                title: "description can't be empty!",
                description: 'Complete the description field.',
                variant: 'destructive',
            });
        }
    }
    return (
        <div className="w-full bg-zinc-800 p-3 text-white">
            <h1 className="font-semibold">Edit</h1>
            <div className="flex justify-between mt-3">

                <p className=" p-2 text-xl text-neutral-600">{club?.roomName}</p>


            </div>
            <div className="  mt-3">
                <AspectRatio ratio={7.5 / 1} className="bg-gradient-to-r from-black to-zinc-600">
                    {


                        < Image
                            src={banner}
                            alt="Photo by Drew Beamer"
                            fill
                            className="rounded-md object-cover"
                        />


                    }
                </AspectRatio>
                <div className="mt-4">

                    <span className="text-white mx-2">Banner</span>
                    <CldUploadButton
                        options={{
                            maxFiles: 1,
                            resourceType: 'image',
                            clientAllowedFormats: ['jpg', 'jpeg', 'png', 'webp'], // Accept only photos
                            multiple: false
                        }}
                        onUpload={handleBannerUpload}


                        className={buttonVariants({ variant: "secondary" })}
                        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}

                    > <p className="truncate w-36">{banner ? banner : 'Select a image for banner'}</p> </CldUploadButton>
                </div>

            </div>
            <div className="flex gap-4">
                <div className="  mt-3">
                    <Avatar className="h-16 w-16 md:h-48 md:w-48 ">

                        <AvatarImage src={icon} alt="icon" className="object-contain" />

                    </Avatar>
                    <div className="mt-4">

                        <span className="text-white mx-2">Icon</span>
                        <CldUploadButton
                            options={{
                                maxFiles: 1,
                                resourceType: 'image',
                                clientAllowedFormats: ['jpg', 'jpeg', 'png', 'webp'], // Accept only photos
                                multiple: false
                            }}
                            onUpload={handleUpload}


                            className={buttonVariants({ variant: "secondary" })}
                            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}

                        > <p className="truncate w-36">{icon ? icon : 'Select a image for banner'}</p> </CldUploadButton>
                    </div>

                </div>

                <div className="flex justify-between flex-1 mt-3">
                    <Label className=" p-2 text-xl">Description</Label>
                    <Textarea value={des} onChange={(e) => setDes(e.target.value)} className="text-black " maxLength={100} />
                </div>

            </div>
            <div className="mt-3 flex justify-center items-center">
                <Button disabled={loading} onClick={editPost}>
                    {loading ? (
                        <Loader className="h-4 w-4 animate-spin" />
                    ) : (

                        <p>Edit</p>
                    )}
                </Button>
            </div>
        </div>
    )
}