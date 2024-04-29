import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { MovieInput } from "@/components/MovieInput";

export default function Page() {
    return (
        <div>
            <MaxWidthWrapper className="px-0 mx-auto mt-10 max-w-7xl md:p-10">
                <h1 className="text-2xl font-semibold antialiased text-zinc-300 ">
                    Let us find your new favorite movie..!
                </h1>
                <MovieInput />
            </MaxWidthWrapper>
        </div>)
}