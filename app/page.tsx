import Particle from "@/components/Particle";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import Image from "next/image";


export default function Home() {
  return (
    <main className="flex items-center h-screen relative bg-cover bg-[#f0fdf4]">
      <Navbar/>
      <div className="absolute right-0 top-0 h-full w-[100%] z-[2]"> 
        <Particle/>
      </div>
      <div className="flex flex-col gap-3 z-[10] px-4 pt-20 sm:px-8 md:px-12 lg:px-20 xl:px-40">
        <h1 className="text-[24px] text-[#047857] max-w-[500px]">
          Hi, I am Anastasia Dernova 
          Frontend Developer
          <span className="text-[#86198f]"> JavaScript, React, and Next.js Enthusiast  </span>
        </h1>
        <p className="text-[18px] text-[#047857] md:text-[#047857] mb-10 md:pb-2 max-w-[400px]">
          I love building sleek, user-friendly web applications that deliver great experiences.  
          Check out <Link href="/my-projects" className="text-[#86198f] hover:underline"> my projects here</Link> or get in touch to collaborate!
        </p>

      </div>


    </main>
  );
}
