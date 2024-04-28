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
import { useRouter } from "next/navigation";
import { absoluteUrl } from "@/lib/utils";
export const Features = () => {
    return (
        <div> <ul className="flex flex-col gap-96 md:gap-56">

            <li>
                <PinContainer
                    title="/fav-movies"
                    href={`${absoluteUrl}/movies/fav-movies`}
                    className="w-[300px] md:w-[800px] border-2 border-[#D50000] p-3 flex rounded-md shadow-2xl shadow-[#D50000] flex-col-reverse md:flex-row"
                    containerClassName="mt-32"
                >
                    <div className="flex-1">
                        <h1 className="text-cyan-400 font-bold text-3xl m-3">
                            Discover Movies Inspired by Your Favorite Films!
                        </h1>
                        <p className="text-white text-justify truncate md:overflow-visible md:text-wrap">
                            Dive into a world of cinematic wonders where each movie recommendation is tailored to your unique taste. Our platform analyzes your favorite films and suggests captivating titles that share similar themes, genres, or storytelling elements. Whether you're a die-hard fan of action-packed blockbusters, heartwarming dramas, or mind-bending thrillers, our curated selection ensures that every viewing experience is an adventure waiting to unfold. Get ready to explore new cinematic horizons and uncover hidden gems inspired by the movies you already love!
                        </p>
                    </div>
                    <div className="flex-1 ">
                        <Clapperboard className="h-full w-full text-cyan-600" />
                    </div>
                </PinContainer>
            </li>
            <li>
                <PinContainer
                    title="/fav-plots"
                    href="/movies/fav-plots"
                    className="w-[300px] md:w-[800px] border-2 border-cyan-400 p-3 rounded-md shadow-xl shadow-cyan-600 flex flex-col-reverse md:flex-row"
                    containerClassName=""
                >
                    <div className="flex-1 ">
                        <h1 className="text-[#D50000] font-bold text-3xl m-3">
                            Explore Films Based on Your Story Preferences!
                        </h1>
                        <p className="text-white truncate  md:overflow-visible md:text-wrap">
                            Step into the director's chair and shape your movie-watching experience like never before. With our personalized recommendation system, you can describe your ideal plot or story elements, and we'll handpick a selection of films that match your narrative preferences. Whether you crave epic adventures in distant realms, heartfelt romances that tug at the heartstrings, or gripping mysteries that keep you on the edge of your seat, our platform curates a diverse array of movies tailored to your storytelling desires. Let your imagination run wild as we guide you to cinematic masterpieces that resonate with your unique vision.
                        </p>
                    </div>
                    <div className="flex-1  ">
                        <Film className="h-full w-full text-red-600" />
                    </div>
                </PinContainer>
            </li>
        </ul>
        </div>)

}