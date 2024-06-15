import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { MovieFound } from "@/components/MovieFound";
import { MovieInput } from "@/components/MovieInput";
import { MovieRes } from "@/components/MovieRes";
import RecmMovies from "@/components/RecmMovies";
import { Button } from "@/components/ui/button";
import { MovieContext, MovieProvider } from "@/context/MovieContext";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { useContext } from "react";

export default async function Page() {
    // console.log(res)s
    // const { res, loading } = useContext(MovieContext)
    const user = await currentUser()
    if (!user || !user.id) redirect('/auth-callback?origin=movies/fav-movies')
    return (
        <div>
            <MovieProvider>
                <MaxWidthWrapper className="px-0 mx-auto mt-5 max-w-7xl md:p-10">
                    <h1 className="text-2xl font-semibold antialiased text-zinc-300 ">
                        Let us find your new favorite movie..!
                    </h1>

                    <MovieInput className="" />

                    <MovieRes />
                    {/* <MovieFound /> */}
                    <RecmMovies />
                </MaxWidthWrapper>
            </MovieProvider>
        </div>)
}