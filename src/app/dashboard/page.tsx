import Dashboard from "@/components/Dashboard";
import { Features } from "@/components/FeatureList";
import { currentUser } from "@clerk/nextjs/server";

export default async function Page() {
    const user = await currentUser()
    return (
        <div>
            <Dashboard name={user?.username} />
        </div>
    )
}