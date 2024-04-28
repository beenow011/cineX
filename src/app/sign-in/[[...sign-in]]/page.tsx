import { SignIn } from "@clerk/nextjs";

export default function Page() {
    return <div className="w-full h-full flex justify-center items-center mt-32"><SignIn path="/sign-in" /></div>;
}