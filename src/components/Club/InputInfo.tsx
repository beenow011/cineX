"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button, buttonVariants } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useCallback, useContext, useEffect, useState } from "react"
import { MovieContext } from "@/context/MovieContext"
import { Film } from "lucide-react"
import { Textarea } from "../ui/textarea"
import { CldUploadButton } from 'next-cloudinary';
import service from "@/firebase/firestore"
import { useRouter } from "next/navigation"
import { toast } from "../ui/use-toast"

const formSchema = z.object({
    clubName: z.string().min(2, {
        message: "Club name must be at least 2 characters.",
    }).max(25).regex(/^[a-zA-Z0-9]+$/, {
        message: "Club name must be alphanumeric.",
    }),
    description: z.string().min(1).max(100),
    icon: z.string().min(1),
    banner: z.string().min(1)

})
function InputInfo({ user }: { user: string | undefined }) {
    const navigate = useRouter()
    const [error, setError] = useState('')
    const [movie, setMovie] = useState('')
    const [club, setClub] = useState('')
    const [userInput, setUserInput] = useState("");
    const [icon, setIcon] = useState('')
    const [banner, setBanner] = useState('')
    const { res } = useContext(MovieContext)
    useEffect(() => {
        setError('')
        setMovie('')
        setClub('')
        if (Object.keys(res).length === 0) {
            setError('First select a Movie!')
        } else {
            setError('')
            setMovie(res.imdbID + '/')
        }
    }, [res])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema), defaultValues: {
            clubName: movie,
        },
    })
    const { setValue, getValues } = form

    console.log(getValues('clubName'), getValues('description'))

    useEffect(() => {
        if (icon.length > 0) {
            setValue('icon', icon)
        }

    }, [icon])
    useEffect(() => {
        if (banner.length > 0) {
            setValue('banner', banner)
        }
    }, [banner])
    // useEffect(() => {
    //     if (userInput.length > 0 && movie.length > 0) {
    //         setValue('clubName', movie + userInput)
    //     }
    // }, [userInput])
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        if (movie) {
            console.log(1)
            service.createRoom({ movieID: movie.slice(0, movie.length - 1), roomName: movie + values.clubName, icon: values.icon, banner: values.banner, description: values.description, createdBy: user! }).then((res) => {
                console.log(res)
                navigate.push(`club/${res?.id}`)
            }).catch(err => {
                console.log(err)
                toast({
                    title: 'Club name is already taken.',
                    description: 'Club name should be unique',
                    variant: 'destructive',
                });
            })
        } else {
            toast({
                title: 'Movie is not selected',
                description: 'Select movie name before creating your club.',
                variant: 'destructive',
            });
        }
        console.log('1', values)
    }
    const handleUpload = useCallback(async (result: any) => {
        console.log(result);
        setIcon(result.info.url)
    }, []);
    const handleBannerUpload = useCallback(async (result: any) => {
        console.log(result);
        setBanner(result.info.url)
    }, []);
    return (
        <div className=" mt-5">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <p className="text-red-600 text-xl ">{error}</p>
                    <FormField
                        control={form.control}
                        name="clubName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-white">Club Name</FormLabel>
                                <FormControl>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-white bg-gray-700 p-2 rounded-l-md">{movie ? movie : (<Film className="h-6 w-6 text-red-600" />)}</span>
                                        <Input
                                            placeholder="Your Club's name"
                                            {...field}
                                            onChange={(e) => {
                                                const inputValue = e.target.value;
                                                if (inputValue.startsWith(movie)) {
                                                    const userPart = inputValue.slice(movie.length);
                                                    setUserInput(userPart);
                                                    field.onChange(userPart);
                                                } else {
                                                    setUserInput(inputValue);
                                                    field.onChange(inputValue);
                                                }
                                            }}
                                            className="flex-1 rounded-r-md"
                                        />
                                    </div>
                                </FormControl>
                                <FormDescription className="text-white">
                                    Club name should be unique.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-white">Description</FormLabel>
                                <FormControl>

                                    <Textarea
                                        placeholder="description about your club"
                                        rows={2}
                                        className="resize-none"
                                        {...field}

                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex flex-col md:flex-row">
                        <span className="text-white mr-2">Icon</span>
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

                        > <p className="truncate w-36">{icon ? icon : 'Select a image for icon'}</p></CldUploadButton>


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
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    )
}

export default InputInfo