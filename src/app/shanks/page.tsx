import { ChatBox } from "@/components/ChatBox";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { MovieSelect } from "@/components/ShanksMovieSelect";
import { MovieContext, MovieProvider } from "@/context/MovieContext";
import { ShanksProvider } from "@/context/ShanksContext";

const Page = () => {
    return (
        <div className="mx-10">
            <MovieProvider>
                <div className="flex flex-col md:flex-row justify-center items-center">
                    <MovieSelect />
                    <ChatBox />

                </div>
            </MovieProvider>
        </div>
    )
}

export default Page;