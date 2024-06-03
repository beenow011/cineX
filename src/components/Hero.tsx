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

export const Hero = () => {

    // console.log(userId)
    const navigate = useRouter()

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
                <Link className={buttonVariants({ size: 'lg', className: 'mt-5' })} href={'/dashboard'} target='_blank'>Get started <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </MaxWidthWrapper >
            <Features />
        </div>)
}