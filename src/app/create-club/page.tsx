import CreateRoom from "@/components/Club/CreateClub";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { MovieContext, MovieProvider } from "@/context/MovieContext";



export default async function Page() {

    return (
        <div>
            <MovieProvider>
                <MaxWidthWrapper className="px-0 mx-auto mt-5 max-w-7xl md:p-8">
                    <CreateRoom />
                </MaxWidthWrapper>
            </MovieProvider>
        </div>
    )
}