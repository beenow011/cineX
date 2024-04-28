import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "./ui/button";
export const Header = () => {
    return (
        <div className=" flex justify-between items-center">
            <div className="flex-1">
                <h1 className="text-red-700 p-6  font-bold text-5xl">CineX</h1>
            </div>
            <div className="flex gap-6  m-6 flex-2">
                <SignedOut>
                    <Button >
                        <p className="font-semibold">  <Link href={'/sign-in'}>Sign In</Link></p>
                    </Button>
                    <Button >
                        <p className="font-semibold"><Link href={'/sign-up'}>Sign Up</Link></p>
                    </Button>

                </SignedOut>
                <SignedIn>
                    <UserButton afterSignOutUrl="/" />
                </SignedIn>

            </div>
        </div>
    )
}