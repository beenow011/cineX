'use client';
import { CldUploadButton } from "next-cloudinary"
import { Button, buttonVariants } from "./ui/button"
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import "react-quill/dist/quill.snow.css";
import ReactQuill from 'react-quill'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { Delete, Dot, Loader2, MinusCircle } from "lucide-react"
import { useCallback, useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation";
import { DocumentData } from "firebase/firestore";
import service from "@/firebase/firestore";
import { toast } from "./ui/use-toast";
import { Avatar, AvatarImage } from "./ui/avatar";
import { count } from "console";
import { trpc } from "@/app/_trpc/client";
// import {
//     Card,
//     CardContent,
//     CardDescription,
//     CardFooter,
//     CardHeader,
//     CardTitle,
//   } from "@/components/ui/card"
interface pollOptionParams {
    text: string
}
function DialogComponent() {

    const { roomId } = useParams<{ roomId: string }>()
    const router = useRouter()
    const [club, setClub] = useState<DocumentData>()
    const [loading, setLoading] = useState<boolean>(false)
    // console.log(roomID)
    const query = trpc.getUser.useQuery()
    useEffect(() => {
        setLoading(true)
        service.retrieveRoom({ roomID: roomId }).then((res) => {

            setClub(res)
        }).catch(err => {
            toast({
                title: "Failed to load the club!",
                description: 'Check the url and try again!',
                variant: 'destructive',
            });
        }).finally(() => setLoading(false))
    }, [])
    const handleBeforeUpload = (file: File) => {
        const isValidSize = file.size / 1024 / 1024 < 20; // Convert size to MB and check if it's less than 20MB
        if (!isValidSize) {
            alert('Each file must be less than 20MB');
            return false;
        }
        return true;
    };

    const [body, setBody] = useState('');
    const [pollQuestion, setPollQuestion] = useState('');
    const [title, setTitle] = useState('')
    const [optionExtend, setOption] = useState(false)
    const [files, setFiles] = useState<string[]>([])
    const [pollTitle, setPollTitle] = useState('')
    const [pollOption, setPollOption] = useState<pollOptionParams[]>([])
    const [optionOne, setOptionOne] = useState('')
    const [optionTwo, setOptionTwo] = useState('')
    const [optionThree, setOptionThree] = useState('')
    const [postLoading, setPostLoading] = useState(false)
    const [mediaTitle, setMediaTitle] = useState('')
    const [mediaBody, setMediaBody] = useState('')
    const handleUpload = useCallback(async (result: any) => {
        console.log(result);
        // setIcon(result.info.url)
        setFiles(prev => [...prev, result.info.url])

    }, []);
    useEffect(() => {
        if (optionExtend)
            setPollOption([{ text: optionOne }, { text: optionTwo }, { text: optionThree }])
        else
            setPollOption([{ text: optionOne }, { text: optionTwo }])
    }, [optionOne, optionTwo, optionThree, optionExtend])

    const postText = () => {
        if (title && body) {
            setPostLoading(true)
            service.createTextPost({ userId: query.data?.userId!, roomId, roomName: club?.roomName as string, title, body })
                .then(res => router.push(`/club/${roomId}`))
                .catch(err => toast({
                    title: "Failed to post",
                    description: err.message,
                    variant: 'destructive',
                }))
                .finally(() => setPostLoading(false))
        } else {
            toast({
                title: "Title and Body should not be empty!",
                description: 'Fill both the fields!',
                variant: 'destructive',
            });
        }
    }

    const postMedia = () => {

        if (files.length == 0) {
            toast({
                title: "Files are not selected!",
                description: 'Atleast 1 file should be there',
                variant: 'destructive',
            });
        } else {
            if (mediaTitle && mediaBody) {
                setPostLoading(true)
                service.createMediaPost({ userId: query.data?.userId!, roomId, roomName: club?.roomName as string, title: mediaTitle, body: mediaBody, files })
                    .then(res => router.push(`/club/${roomId}`))
                    .catch(err => toast({
                        title: "Failed to post",
                        description: err.message,
                        variant: 'destructive',
                    }))
                    .finally(() => setPostLoading(false))
            } else {
                toast({
                    title: "Title and Body should not be empty!",
                    description: 'Fill both the fields!',
                    variant: 'destructive',
                });
            }
        }
    }

    const postPoll = () => {

        if (pollTitle && pollQuestion) {
            if ([pollOption[0].text, pollOption[1].text].some(ele => ele?.trim() === '')) {

                toast({
                    title: "Minimum there should be two options!",
                    description: 'Fill both the fields!',
                    variant: 'destructive',
                });
                return
            }
            if (pollOption.length === 3 && pollOption[2].text.trim() === '') {
                toast({
                    title: "Options must not be empty!",
                    description: 'Fill both the fields!',
                    variant: 'destructive',
                });
                return
            }
            setPostLoading(true)
            service.createPollPost({ userId: query.data?.userId!, roomId, roomName: club?.roomName as string, title: pollTitle, question: pollQuestion, pollOption })
                .then(res => router.push(`/club/${roomId}`))
                .catch(err => toast({
                    title: "Failed to post",
                    description: err.message,
                    variant: 'destructive',
                }))
                .finally(() => setPostLoading(false))
        } else {
            toast({
                title: "Title and Question should not be empty!",
                description: 'Fill both the fields!',
                variant: 'destructive',
            });
        }
    }
    console.log(`title:${title} body:${body} , files:${files} `)
    console.log(pollOption)
    return (
        <div className={`max-w-[325px] sm:max-w-[425px] lg:max-w-[825px] w-full relative mt-3 text-white`}>
            <div className="mb-4">
                <h1 className="text-red-600 font-bold text-2xl">Create Post</h1>
                <p>
                    Please ensure that your post is related to this specific movie. It can be memes, discussions, or fan theories—let&apos;s keep the conversation happy and focused!
                </p>

            </div>

            <div className="rounded-full w-full mb-2 h-12 flex justify-center items-center border shadow-md shadow-red-600">
                {loading ? (
                    <Loader2 className="h-4 w-4 text-white animate-spin" />
                ) : (<div className="flex justify-center items-center gap-3">
                    <Avatar className="h-10 w-10   ml-2 bg-black ">
                        <AvatarImage src={club?.icon} alt="icon" className="object-contain" />
                    </Avatar>
                    <h1 className="text-sm">{club?.roomName}</h1>
                </div>)}
            </div>

            <Tabs defaultValue="text" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="text">Text</TabsTrigger>
                    <TabsTrigger value="media">Media</TabsTrigger>
                    <TabsTrigger value="poll">Poll</TabsTrigger>
                </TabsList>
                <TabsContent value="text">
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Title
                            </Label>
                            <Input id="name" placeholder="Title of your post" className="col-span-3 text-black " onChange={(e) => setTitle(e.target.value)} value={title} />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                                Body
                            </Label>
                            {/* <Textarea
                                placeholder="Body of your post"
                                rows={10}

                                className="resize-none w-full col-span-3"


                            /> */}
                            <div className="w-full col-span-3 mb-16 md:mb-10">
                                <ReactQuill
                                    theme="snow"
                                    value={body}
                                    onChange={setBody}
                                    className="h-24 md:h-36 "
                                    modules={{
                                        toolbar: [
                                            [{ header: [1, 2, false] }],
                                            ["bold", "italic", "underline", "strike"],
                                            [{ list: "ordered" }, { list: "bullet" }],
                                            ["link"],
                                            ["clean"],
                                        ],
                                    }}

                                />
                            </div>
                        </div>
                        <div className="absolute right-1 bottom-32 md:bottom-10">
                            <Button type="submit" onClick={postText} disabled={postLoading}>{postLoading ? (<Loader2 className="h-6 w-6 text-white animate-spin" />) : 'Post'}</Button>
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value="media">
                    <div className="grid gap-4 py-4 h-full">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Title
                            </Label>
                            <Input id="name" placeholder="Title of your post" className="col-span-3 text-black " onChange={(e) => setMediaTitle(e.target.value)} value={mediaTitle} />
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-4 items-center gap-4">
                            <p className="font-bold">Choose media</p>

                            <Button variant={"secondary"} disabled={files.length >= 2}>
                                <CldUploadButton
                                    options={{
                                        maxFiles: 2,
                                        resourceType: 'auto', // Accept both images and videos
                                        clientAllowedFormats: ['jpg', 'jpeg', 'png', 'webp', 'mp4', 'mov'], // Accept images and videos
                                        multiple: true
                                    }}

                                    onUpload={handleUpload}


                                    uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}


                                >
                                    <p>Image or video</p>
                                </CldUploadButton>
                            </Button>


                            <p className="cols-span-3">It&apos;s optional.</p>
                            <ul>
                                <li className="flex">
                                    <Dot className="h-6 w-6" />Max files : 2
                                </li>
                                <li className="flex">
                                    <Dot className="h-6 w-6" />file size not exceeding 25mb
                                </li>
                            </ul>
                            {files && files.map((ele, i) => (
                                <div className="flex gap-2" key={i}>
                                    <a href={ele} target="_blank" className="text-red-600">File {i + 1}</a>
                                    <Delete className="h-5 w-6 mt-1 text-red-600" onClick={() => setFiles(prev => prev.filter(e => e !== ele))} />
                                </div>
                            ))}
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                                Body
                            </Label>
                            {/* <Textarea
                                placeholder="Body of your post"
                                rows={10}

                                className="resize-none w-full col-span-3"


                            /> */}
                            <div className="w-full col-span-3 mb-16 md:mb-10">
                                <ReactQuill
                                    theme="snow"
                                    value={mediaBody}
                                    onChange={setMediaBody}
                                    className="h-24 md:h-36 "
                                    modules={{
                                        toolbar: [
                                            [{ header: [1, 2, false] }],
                                            ["bold", "italic", "underline", "strike"],
                                            [{ list: "ordered" }, { list: "bullet" }],
                                            ["link"],
                                            ["clean"],
                                        ],
                                    }}

                                />
                            </div>
                        </div>
                        <div className="absolute right-1 bottom-10">
                            <Button type="submit" onClick={postMedia} disabled={postLoading}>{postLoading ? (<Loader2 className="h-6 w-6 text-white animate-spin" />) : 'Post'}</Button>
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value="poll">
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Title
                            </Label>
                            <Input id="name" placeholder="Title of your Poll" className="col-span-3 text-black" required value={pollTitle} onChange={(e) => setPollTitle(e.target.value)} />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                                Question
                            </Label>
                            {/* <Textarea
                                placeholder="Body of your post"
                                rows={10}

                                className="resize-none w-full col-span-3"


                            /> */}
                            <div className="w-full col-span-3 mb-10">
                                <ReactQuill
                                    theme="snow"
                                    value={pollQuestion}
                                    onChange={setPollQuestion}
                                    className="h-36 "
                                    modules={{
                                        toolbar: [
                                            [{ header: [1, 2, false] }],
                                            ["bold", "italic", "underline", "strike"],
                                            [{ list: "ordered" }, { list: "bullet" }],
                                            ["link"],
                                            ["clean"],
                                        ],
                                    }}

                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4 text-black">
                            <Label htmlFor="name" className="text-right">
                                Options
                            </Label>
                            <div className="col-span-3 flex flex-col gap-2" >
                                <Input id="name" placeholder="Option 1" className="col-span-3" onChange={(e) => setOptionOne(e.target.value)} />
                                <Input id="name" placeholder="Option 2" className="col-span-3" onChange={(e) => setOptionTwo(e.target.value)} />
                                {optionExtend ? (<div className="col-span-3 relative">
                                    <Button onClick={() => { setOption(false) }} className="absolute right-0"><MinusCircle className="h-5 w-5 text-white" /></Button>
                                    <Input id="name" placeholder="Option 3" onChange={(e) => setOptionThree(e.target.value)} /></div>) : (<Button onClick={() => { setOption(true) }} variant={'secondary'}>Add another option</Button>)}

                            </div>
                        </div>
                        <div className="absolute right-1 bottom-20 md:bottom-10">
                            <Button type="submit" onClick={postPoll} disabled={postLoading}>{postLoading ? (<Loader2 className="h-6 w-6 text-white animate-spin" />) : 'Post'}</Button>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>







        </div>
    )
}

export default DialogComponent