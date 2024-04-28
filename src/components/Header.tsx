'use client';
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
export const Header = () => {
    const pathname = usePathname()
    return (
        <div className=" flex justify-between items-center">
            <div className="flex-1">
                <h1 className="text-red-700 p-6  font-bold text-5xl cursor-pointer"><Link href={'/'}>CineX</Link></h1>
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
                    {pathname !== '/dashboard' && <Button >
                        <p className="font-semibold"><Link href={'/dashboard'}>Dashboard</Link></p>
                    </Button>}

                    <UserButton afterSignOutUrl="/" />
                </SignedIn>

            </div>
        </div>
    )
}