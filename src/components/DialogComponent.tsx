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
import { Dot } from "lucide-react"
import { useCallback, useState } from "react"
// import {
//     Card,
//     CardContent,
//     CardDescription,
//     CardFooter,
//     CardHeader,
//     CardTitle,
//   } from "@/components/ui/card"

function DialogComponent() {
    const handleBeforeUpload = (file: File) => {
        const isValidSize = file.size / 1024 / 1024 < 20; // Convert size to MB and check if it's less than 20MB
        if (!isValidSize) {
            alert('Each file must be less than 20MB');
            return false;
        }
        return true;
    };

    const [value, setValue] = useState('');
    const [props, setProps] = useState('z-50')

    const handleUpload = useCallback(async (result: any) => {
        console.log(result);
        // setIcon(result.info.url)
        setProps('z-50')
    }, []);
    console.log(props)
    return (
        <DialogContent className={`max-w-[325px] sm:max-w-[425px] lg:max-w-[825px] `} >
            <DialogHeader>
                <DialogTitle>Create Post</DialogTitle>
                <DialogDescription>
                    Please ensure that your post is related to this specific movie. It can be memes, discussions, or fan theories—let&apos;s keep the conversation happy and focused!
                </DialogDescription>
            </DialogHeader>


            <Tabs defaultValue="account" className="w-full">
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
                            <Input id="name" placeholder="Title of your post" className="col-span-3" />
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
                                    value={value}
                                    onChange={setValue}
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
                    </div>
                </TabsContent>
                <TabsContent value="media">
                    <div className="grid gap-4 py-4 h-full">
                        <p className="font-bold">Choose media</p>
                        {/* <CldUploadButton
                            options={{
                                maxFiles: 2,
                                resourceType: 'auto', // Accept both images and videos
                                clientAllowedFormats: ['jpg', 'jpeg', 'png', 'webp', 'mp4', 'mov', 'avi', 'mkv'], // Accept images and videos
                                multiple: true
                            }}

                            // Add the beforeUpload handler to check file size
                            onUpload={handleUpload}

                            className={buttonVariants({ variant: "secondary" })}
                            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                        ><p>
                                Select an image or video for the post</p>
                        </CldUploadButton> */}
                        <input type="file" name="" id="" className={buttonVariants({ variant: "secondary" })} />
                        <CldUploadButton
                            options={{
                                maxFiles: 2,
                                resourceType: 'auto', // Accept both images and videos
                                clientAllowedFormats: ['jpg', 'jpeg', 'png', 'webp', 'mp4', 'mov'], // Accept images and videos
                                multiple: true
                            }}
                            onClick={() => { setProps('z-[-1]') }}
                            onUpload={handleUpload}

                            className={buttonVariants({ variant: "secondary" })}
                            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}


                        >
                            <p>Select an image or video for the post</p>
                        </CldUploadButton>
                        <p>It&apos;s optional.</p>
                        <ul>
                            <li className="flex">
                                <Dot className="h-6 w-6" />Max files : 2
                            </li>
                            <li className="flex">
                                <Dot className="h-6 w-6" />file size not exceeding 25mb
                            </li>
                        </ul>
                    </div>
                </TabsContent>
                <TabsContent value="poll">
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Title
                            </Label>
                            <Input id="name" placeholder="Title of your post" className="col-span-3" />
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
                                    value={value}
                                    onChange={setValue}
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
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Options
                            </Label>
                            <div className="col-span-3 flex flex-col gap-2" >
                                <Input id="name" placeholder="Title of your post" className="col-span-3" />
                                <Input id="name" placeholder="Title of your post" className="col-span-3" />
                                <Input id="name" placeholder="Title of your post" className="col-span-3" />
                            </div>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>






            <DialogFooter>
                <Button type="submit">Save changes</Button>
            </DialogFooter>
        </DialogContent>)
}

export default DialogComponent