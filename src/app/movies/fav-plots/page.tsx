import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { PlotInput } from "@/components/PlotInput";

export default function Page() {
    return (<div>
        <MaxWidthWrapper className="px-0 mx-auto mt-5 max-w-7xl md:p-10">
            <div className="w-full bg-slate-800/60 rounded-md">

                <PlotInput />
            </div>
        </MaxWidthWrapper>
    </div>)
}