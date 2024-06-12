"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { cn } from "@/utils/cn";
import { UserButton } from "@clerk/nextjs";

export function NavbarDemo() {
    return (
        <div className="relative w-full flex items-center justify-center">
            <Navbar className="top-8 " />
            <UserButton afterSignOutUrl="/" />

        </div>
    );
}

function Navbar({ className }: { className?: string }) {
    const [active, setActive] = useState<string | null>(null);
    return (
        <div
            className={cn("fixed top-32 inset-x-0 max-w-2xl mx-auto z-[100]", className)}
        >
            <Menu setActive={setActive}>
                <MenuItem setActive={setActive} active={active} item="Recommendations">
                    <div className="flex flex-col space-y-4 text-sm">
                        <HoveredLink href="/movies/fav-movies">Based on Favorite Movies</HoveredLink>
                        <HoveredLink href="/movies/fav-plots">Based on Plot</HoveredLink>
                        {/* <HoveredLink href="/seo">Search Engine Optimization</HoveredLink>
                        <HoveredLink href="/branding">Branding</HoveredLink> */}
                    </div>
                </MenuItem>
                <MenuItem setActive={setActive} active={active} item="Chatbot">
                    <div className="  text-sm grid grid-cols-2 gap-10 p-4">
                        <ProductItem
                            title="Shanks - Your CineBot"
                            href="/shanks"
                            src="/shankslogo.jpg"
                            description=" Whether you need a plot summary, an ending explained, or details about the cast and crew, Shanks has you covered."
                        />

                    </div>
                </MenuItem>
                <MenuItem setActive={setActive} active={active} item="Discussion Rooms">
                    <div className="flex flex-col space-y-4 text-sm">
                        <HoveredLink href="/clubs">Join a Room</HoveredLink>
                        <HoveredLink href="/create-club">Create a Room</HoveredLink>
                        <HoveredLink href="/dashboard">Your Rooms</HoveredLink>
                    </div>
                </MenuItem>
            </Menu>
        </div>
    );
}
