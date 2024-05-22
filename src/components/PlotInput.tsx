'use client';

import { useContext, useState } from "react";
import { PlaceholdersAndVanishInput } from "./ui/placeholders-and-vanish-input";
import { PlotContext } from "@/context/PlotContext";

export const PlotInput = () => {
    "use client";

    // import { PlaceholdersAndVanishInput } from "../ui/placeholders-and-vanish-input";

    const placeholders = [
        "Imagine a story where secrets unravel in the shadows of a small town. What's the mystery you'd like to see unfold?",
        "Think about a protagonist on a journey of self-discovery against the backdrop of a bustling city. What challenges do they face?",
        "Picture a world where unexpected alliances form in the midst of chaos. What unlikely companionship intrigues you?",
        "Envision a tale of redemption set in a post-apocalyptic wasteland. What's the hero's path to salvation?",
        "Consider a narrative where love transcends time and space. What obstacles stand in the way of true connection?"
    ];

    const [plot, setPlotLocal] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
        setPlot(e.target.value)
    };
    const { Plot, setPlot, searchPlot } = useContext(PlotContext)
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("submitted");
        searchPlot();

    };

    return (
        <div className=" flex flex-col justify-center  items-center px-4">
            <h2 className="text-xl mb-4 text-center font-semibold antialiased  sm:text-5xl text-red-400 ">
                What&apos;s on your mind today?
            </h2>
            <p className="text-cyan-600 text-xl    font-bold mb-10 sm:mb-20">
                Describe the kind of movie plot you&apos;re in the mood for, and I&apos;ll find you a similar movie!
            </p>

            <PlaceholdersAndVanishInput
                placeholders={placeholders}
                onChange={handleChange}
                onSubmit={onSubmit}
            />
        </div>
    );
}


