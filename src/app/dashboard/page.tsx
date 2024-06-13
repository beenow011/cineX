import Dashboard from "@/components/Dashboard";
import { Features } from "@/components/FeatureList";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Page() {
    const user = await currentUser()
    if (!user || !user.id) redirect('/auth-callback?origin=dashboard')
    return (
        <div>
            <Dashboard name={user?.username} user={user?.id} />
        </div>
    )
}