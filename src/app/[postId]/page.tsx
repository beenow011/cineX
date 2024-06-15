import { useParams } from "next/navigation"

function page() {
    const { postId } = useParams()

    return (
        <div>page</div>
    )
}

export default page