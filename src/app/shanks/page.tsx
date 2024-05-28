import { ChatBox } from "@/components/ChatBox";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { MovieSelect } from "@/components/ShanksMovieSelect";
import { MovieContext, MovieProvider } from "@/context/MovieContext";
import { ShanksProvider } from "@/context/ShanksContext";

const Page = () => {
    return (
        <div className="mx-10 h-[calc(100vh-96px)] ">
            <MovieProvider>
                <div className="flex flex-col md:flex-row justify-center items-center overflow-hidden">
                    <MovieSelect />
                    <ChatBox />

                </div>
            </MovieProvider>
        </div>
    )
}

export default Page;