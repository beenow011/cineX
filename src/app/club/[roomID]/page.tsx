'use client';
import { useParams } from "next/navigation"


function Page() {
    const { roomID } = useParams()
    return (
        <div>page</div>
    )
}

export default Page