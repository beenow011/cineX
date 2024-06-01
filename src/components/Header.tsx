'use client';
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { PlusCircle } from "lucide-react";
export const Header = () => {
    const pathname = usePathname()
    return (
        <div className=" flex justify-between items-center">
            <div className="flex-1">
                <h1 className="text-red-700 p-6  font-semibold font-mono text-4xl cursor-pointer"><Link href={'/'}>Cine<span className="text-4xl font-mono text-cyan-600">verse</span></Link></h1>
            </div>
            <div className="flex gap-6  m-6 flex-2">
                <SignedOut>
                    <Link href={'/sign-in'}>
                        <Button >
                            <p className="font-semibold">  Sign In</p>
                        </Button>
                    </Link>
                    <Link href={'/sign-up'}>
                        <Button >
                            <p className="font-semibold">Sign Up</p>
                        </Button>
                    </Link>
                </SignedOut>
                <SignedIn>
                    {
                        pathname !== '/create-club' && <Link href={'/create-club'}><Button><PlusCircle className="h-7 w-7 bg-red-600" /> <p className="font-semibold ml-2">Room</p></Button></Link>
                    }
                    {pathname !== '/dashboard' && <Button >
                        <p className="font-semibold"><Link href={'/dashboard'}>Dashboard</Link></p>
                    </Button>}

                    <UserButton afterSignOutUrl="/" />
                </SignedIn>

            </div>
        </div>
    )
}