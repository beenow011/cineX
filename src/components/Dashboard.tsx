import MaxWidthWrapper from "./MaxWidthWrapper"


function Dashboard({ name }: { name: string | null | undefined }) {
    return (

        <MaxWidthWrapper className="px-0 mx-auto mt-5 max-w-7xl md:p-10">
            <div>
                <div className="w-full bg-zinc-900 border rounded-md border-white/30 p-4">
                    <h1 className="text-white text-xl font-bold">
                        Welcome {name}.!
                    </h1>
                </div>
            </div>
        </MaxWidthWrapper>
    )
}

export default Dashboard