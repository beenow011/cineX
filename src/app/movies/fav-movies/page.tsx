'use client';
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { MovieFound } from "@/components/MovieFound";
import { MovieInput } from "@/components/MovieInput";
import { MovieRes } from "@/components/MovieRes";
import { Button } from "@/components/ui/button";
import { MovieContext, MovieProvider } from "@/context/MovieContext";
import { useContext } from "react";

export default function Page() {
    // console.log(res)s
    // const { res, loading } = useContext(MovieContext)
    return (
        <div>
            <MovieProvider>
                <MaxWidthWrapper className="px-0 mx-auto mt-5 max-w-7xl md:p-10">
                    <h1 className="text-2xl font-semibold antialiased text-zinc-300 ">
                        Let us find your new favorite movie..!
                    </h1>

                    <MovieInput className="" />

                    <MovieRes />
                    <MovieFound />
                </MaxWidthWrapper>
            </MovieProvider>
        </div>)
}