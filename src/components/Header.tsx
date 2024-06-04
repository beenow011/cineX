'use client';
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname, useRouter } from "next/navigation";
import { Menu, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
export const Header = () => {
    const [menu, setMenu] = useState(false)
    const pathname = usePathname()
    const router = useRouter()

    useEffect(() => {
        setMenu(false)
    }, [pathname])

    return (
        <div className=" flex justify-between items-center">
            <div className="flex-1">
                <h1 className="text-red-700 p-6  font-semibold font-mono text-xl md:text-4xl cursor-pointer"><Link href={'/'}>Cine<span className="text-xl md:text-4xl font-mono text-cyan-600">verse</span></Link></h1>
            </div>
            <div className="md:flex gap-6  m-6 flex-2 hidden ">
                <SignedOut>

                    <Button onClick={() => router.push('/sign-in')}>
                        <p className="md:font-semibold">  Sign In</p>
                    </Button>

                    <Button onClick={() => router.push('/sign-up')}>
                        <p className="md:font-semibold">Sign Up</p>
                    </Button>

                </SignedOut>
                <SignedIn>
                    {
                        pathname !== '/create-club' && <Button onClick={() => router.push('/create-club')}><PlusCircle className="h-7 w-7 bg-red-600" /> <p className="font-semibold ml-2">Room</p></Button>
                    }
                    {pathname !== '/dashboard' && <Button >
                        <p className="font-semibold"><Link href={'/dashboard'}>Dashboard</Link></p>
                    </Button>}

                    <UserButton afterSignOutUrl="/" />
                </SignedIn>

            </div>
            <div className="md:hidden relative mr-5 flex gap-4 z-[99]">
                <SignedIn>
                    <UserButton afterSignOutUrl="/" />
                </SignedIn>
                <Menu className="h-6 w-6 text-red-600 " onClick={() => setMenu(prev => !prev)} />
                {
                    menu && (
                        <div className="absolute flex flex-col gap-4 right-4 top-5 bg-white shadow-lg rounded-lg w-36 mt-2 p-4">
                            <SignedOut>

                                <Button className="w-full" onClick={() => router.push('/sign-in')}>
                                    <p className="font-semibold">Sign In</p>
                                </Button>

                                <Button className="w-full" onClick={() => router.push('/sign-up')}>
                                    <p className="font-semibold">Sign Up</p>
                                </Button>

                            </SignedOut>
                            <SignedIn>
                                {
                                    pathname !== '/create-club' && (

                                        <Button className="w-full" onClick={() => router.push('/reate-club')}>
                                            <PlusCircle className="h-7 w-7 bg-red-600" />
                                            <p className="font-semibold ml-2">Room</p>
                                        </Button>

                                    )
                                }
                                {
                                    pathname !== '/dashboard' && (
                                        <Button className="w-full">
                                            <p className="font-semibold">
                                                <Link href={'/dashboard'}>Dashboard</Link>
                                            </p>
                                        </Button>
                                    )
                                }

                            </SignedIn>
                        </div>
                    )
                }

            </div>
        </div>
    )
}