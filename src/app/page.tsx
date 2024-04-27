import { Button } from "@/components/ui/button";
import { WavyBackground } from "@/components/ui/wavy-background";
import { Hero } from "@/components/Hero";
import Image from "next/image";

export default function Home() {
  return (


    <div>
      <WavyBackground className=" pb-40 justify-start items-start">
        <div className=" flex justify-between items-center">
          <div className="flex-1">
            <h1 className="text-red-700 p-6  font-bold text-5xl">CineX</h1>
          </div>
          <div className="flex gap-6  m-6 flex-2">
            <Button >
              <p className="font-semibold">Login</p>
            </Button>
            <Button >
              <p className="font-semibold">Signup</p>
            </Button>
          </div>
        </div>
        {/* <MovieRoll src2={1} side="left-0 " /> */}
        <Hero />
        {/* <MovieRoll src2={3} side="right-0" /> */}


      </WavyBackground>

    </div>
  );
}
