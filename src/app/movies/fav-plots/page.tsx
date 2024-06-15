import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { PlotInput } from "@/components/PlotInput";
import { PlotResult } from "@/components/PlotResult";
import { PlotProvider } from "@/context/PlotContext";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Page() {
    const user = await currentUser()
    if (!user || !user.id) redirect('/auth-callback?origin=movies/fav-plots')
    return (<div>
        <PlotProvider>
            <MaxWidthWrapper className="px-0 mx-auto mt-5 max-w-7xl md:p-10">
                <div className="w-full py-5 from-black  shadow-cyan-600 to-slate-700 rounded-md">

                    <PlotInput />
                    <PlotResult />
                </div>
            </MaxWidthWrapper>
        </PlotProvider>
    </div>)
}