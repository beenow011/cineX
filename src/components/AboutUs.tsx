import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper"
import { AnimatedTooltip } from "./ui/animated-tooltip";
import { Instagram, Linkedin, Mail, MessageCircle, Text } from "lucide-react";

function AboutUs() {
    const people = [
        {
            id: 1,
            name: "Abhinav N B",
            designation: "Full Stack Developer",
            image:
                "/logo.jpg",
        },
        {
            id: 2,
            name: "Akhil Kumar P",
            designation: "Front End Developer",
            image:
                "/akhil.jpg",
        },
        {
            id: 3,
            name: "Girish G M",
            designation: "UI Designer",
            image:
                "/giri.jpg",
        }
    ];
    return (
        <div className="w-full bg-slate-800 text-zinc-300 flex justify-center items-center p-10">
            <div>
                <h1 className="text-3xl  font-bold mb-4 text-center text-red-600">About Us</h1>
                <div className="flex flex-row items-center justify-center mt-10 mb-10 w-full">
                    <AnimatedTooltip items={people} />
                </div>
                <MaxWidthWrapper className="mb-10 mx-10 hidden md:block ">
                    <p className="text-lg leading-relaxed mb-4">
                        Welcome to our website! We are passionate about providing you with the most accurate and comprehensive information about movies. Our goal is to make it easy for you to find details about your favorite films, whether you&apos;re a casual movie-goer or a dedicated cinephile.
                    </p>
                    <p className="text-lg leading-relaxed mb-4">
                        Our team is made up of movie enthusiasts who are committed to delivering high-quality content. We understand how important it is to have reliable and up-to-date information, which is why we strive to keep our database current and accurate.
                    </p>
                    <p className="text-lg leading-relaxed mb-4">
                        If you encounter any issues or have any suggestions, please don&apos;t hesitate to reach out to us. We&apos;re always looking for ways to improve and provide the best experience for our users.
                    </p>
                    <p className="text-lg leading-relaxed">
                        Thank you for visiting our site. We hope you enjoy exploring and discovering more about the movies you love!
                    </p>
                </MaxWidthWrapper>

                <div className="md:hidden mx-10  mb-5  ">
                    <p className="text-lg leading-relaxed mb-4">
                        Welcome to our website! We are passionate about providing you with the most accurate and comprehensive information about movies. Our goal is to make it easy for you to find details about your favorite films, whether you&apos;re a casual movie-goer or a dedicated cinephile.
                    </p>
                    <p className="text-lg leading-relaxed mb-4">
                        Our team is made up of movie enthusiasts who are committed to delivering high-quality content. We understand how important it is to have reliable and up-to-date information, which is why we strive to keep our database current and accurate.
                    </p>
                    <p className="text-lg leading-relaxed mb-4">
                        If you encounter any issues or have any suggestions, please don&apos;t hesitate to reach out to us. We&apos;re always looking for ways to improve and provide the best experience for our users.
                    </p>
                    <p className="text-lg leading-relaxed">
                        Thank you for visiting our site. We hope you enjoy exploring and discovering more about the movies you love!
                    </p>
                </div>
                <div className="text-zinc-500  gap-2 flex">Contact us
                    <div className="flex gap-2">
                        <Link href="mailto:abhinavnb11@gmail.com"><Mail className="h-6 w-6" /></Link>
                        <Link href="https://www.linkedin.com/in/abhinavnb01107/" target="_blank" rel="noopener noreferrer"><Linkedin className="h-6 w-6" /></Link>
                        <Link href="https://www.instagram.com/abhinav_nb/" target="_blank" rel="noopener noreferrer"><Instagram className="h-6 w-6" /></Link>
                        <Link href="tel:+918277123450"><MessageCircle className="h-6 w-6" /></Link>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default AboutUs