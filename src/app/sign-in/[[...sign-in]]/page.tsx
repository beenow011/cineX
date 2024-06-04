import { SignIn } from "@clerk/nextjs";

export default function Page() {
    return <div className="w-full h-full flex justify-center items-center mt-16"><SignIn path="/sign-in" /></div>;
}