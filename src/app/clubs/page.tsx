
import Explore from "@/components/ExploreClubs";
import { Features } from "@/components/FeatureList";
import { currentUser } from "@clerk/nextjs/server";

export default async function Page() {
    const user = await currentUser()

    return (
        <div>
            <Explore name={user?.username} user={user?.id} />
        </div>
    )
}