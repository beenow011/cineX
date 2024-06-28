import { Button } from "@/components/ui/button";
import { WavyBackground } from "@/components/ui/wavy-background";
import { Hero } from "@/components/Hero";
import Image from "next/image";
import { UserProvider } from "@/context/AuthContext";
import Joyride from 'react-joyride';

export default function Home() {

  return (


    <div className=" ">

      <UserProvider>
        {/* <MovieRoll src2={1} side="left-0 " /> */}
        <Hero />

        {/* <MovieRoll src2={3} side="right-0" /> */}

      </UserProvider>

    </div>
  );
}
