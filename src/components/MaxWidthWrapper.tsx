// import { cn } from "@/lib/utility"
import { cn } from "@/lib/utils"
import { ReactNode } from "react"

const MaxWidthWrapper = ({
    className, children
}: {
    className?: string
    children: ReactNode
}) => {
    return (
        <div className={cn("mx-auto w-[90%] md:w-full max-w-screen-xl px-24 md:px-20", className)}>

            {children}
        </div>)
}

export default MaxWidthWrapper