'use client';
import { PinContainer } from "@/components/ui/3d-pin";
import { Button, buttonVariants } from "@/components/ui/button"
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
// import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ArrowRight, Camera, Clapperboard, Film, Move3dIcon } from "lucide-react";
import { HoverBorderGradient } from "./ui/hover-border-gradient";

import { trpc } from "@/app/_trpc/client";
// import { useNav }
import { usePathname, useRouter } from "next/navigation";
import { Features } from "./FeatureList";
import { useEffect } from "react";
import { HoverEffect } from "./ui/card-hover-effect";
import { absoluteUrl } from "@/lib/utils";
import AboutUs from "./AboutUs";

export const Hero = () => {

    // console.log(userId)
    const navigate = useRouter()
    const projects = [
        {
            title: "Shanks: The Movie Guru",
            description: ' Shanks is a chatbot designed to answer all your movie-related questions. Whether you need a plot summary, an ending explained, or details about the cast and crew, Shanks has you covered.',
            link: `${absoluteUrl('/shanks')}`,
        },
        {
            title: "Discover Movies Inspired by Your Favorite Films!",
            description: ' Discover tailored movie recommendations based on your unique taste. Explore new cinematic horizons and uncover hidden gems inspired by films you love!',
            link: `${absoluteUrl('/movies/fav-movies')}`,
        },
        {
            title: " Explore Films Based on Your Story Preferences!",
            description: 'Direct your movie-watching journey with personalized recommendations tailored to your storytelling preferences, from epic adventures to heartfelt romances and gripping mysteries. Explore cinematic masterpieces that align perfectly with your unique vision.',
            link: `${absoluteUrl('/movies/fav-plots')}`,
        },

    ];

    return (
        <div className="">

            <MaxWidthWrapper className="mb-12 mt-16 md:mt-40 flex flex-col items-center justify-center text-center">


                <HoverBorderGradient
                    containerClassName="rounded-full"
                    as="button"
                    className="dark:bg-black bg-black text-white dark:text-white flex items-center space-x-2"
                >
                    CineVerse
                </HoverBorderGradient>
                <h1 className="max-w-4xl mt-6 text-3xl font-bold md:text-6xl lg:text-7xl text-white"> Discover Your Next   <span className="text-[#72cfcf]"> Favorite Film </span>with Personalized Recommendations!</h1>
                <p className="mt-5 max-w-prose text-slate-300 sm:text-lg">Welcome to our world of cinematic exploration. We believe that every film holds a unique story, waiting to captivate and inspire. With our personalized recommendation system, powered by your <span className="text-cyan-600">favorite movies </span> , we&apos;re here to guide you to your next unforgettable cinematic experience</p>
                <Link className={buttonVariants({ size: 'lg', className: 'mt-5' })} href={'/dashboard'}>Get started <ArrowRight className="ml-2 h-5 w-5" /></Link>
                <div className="hidden my-other-step md:flex flex-col justify-between mt-10 px-8 w-full bg-gradient-to-r from-black  to-slate-900 shadow-xl  rounded-md  shadow-slate-700 ">
                    <div className="w-full">
                        <p className="text-gray-300  text-xl font-bold my-first-step mt-4">
                            Explore the features
                        </p>
                    </div>
                    <HoverEffect items={projects} target="" />
                </div>
            </MaxWidthWrapper >
            {/* <Features /> */}
            <div className="flex md:hidden flex-col justify-between px-8 w-full bg-gradient-to-r from-black  to-slate-900 shadow-xl  rounded-md  shadow-slate-700 ">
                <p className="text-gray-300  text-lg font-bold mt-4">
                    Explore the features
                </p>
                <HoverEffect items={projects} target="" />
            </div>
            <div>
                <AboutUs />
            </div>
        </div>)
}