import { Plus, Share } from "lucide-react"
import { Button } from "../ui/button"


function ClubButtons() {
    return (
        <div className="w-full bg-slate-700/50  rounded-lg flex justify-between gap-3 p-2">
            <Button >
                <p className=" antialiased font-semibold">Join</p>
            </Button>
            <div>
                <Button variant={'ghost'}>
                    <Plus className="h-6 w-6 text-cyan-600" /> <p className="text-cyan-600 antialiased font-semibold">Post</p>
                </Button>
                <Button variant={'ghost'}>
                    <Share className="h-6 w-6 text-cyan-600" /> <p className="text-cyan-600 antialiased font-semibold">Share</p>
                </Button>
            </div>
        </div>
    )
}

export default ClubButtons