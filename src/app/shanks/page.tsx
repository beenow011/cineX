import { ChatBox } from "@/components/shanks/ChatBox";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { MovieSelect } from "@/components/shanks/ShanksMovieSelect";
import { Skeleton } from "@/components/ui/skeleton";
import { MovieContext, MovieProvider } from "@/context/MovieContext";
import { ShanksProvider } from "@/context/ShanksContext";
import { currentUser } from "@clerk/nextjs/server";

const Page = async () => {
    const user = await currentUser()
    console.log(user?.imageUrl)
    return (
        <div className="mx-3 md:mx-10 h-[calc(100vh-96px)] ">
            <MovieProvider>
                <div className="flex flex-col md:flex-row justify-center items-center overflow-hidden">
                    <MovieSelect />

                    <ChatBox img={user?.imageUrl} />

                </div>
            </MovieProvider>
        </div>
    )
}

export default Page;