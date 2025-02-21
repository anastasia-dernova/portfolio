import Image from "next/image";
import Particle from "@/components/Particle";
import { Socials } from "@/constants";
import Navbar from "@/components/Navbar";


export default function Home() {
  return (
    <main className="flex items-center h-screen relative bg-cover bg-[#f0fdf4]">
      <Navbar/>
      <div className="absolute right-0 top-0 h-full w-[100%] z-[2]"> 
        <Particle/>
      </div>
      <div className="absolute right-10 md:right-40 bottom-0 z-[10]">
        {/* <Image
          src="/assets/MoustacheMan.png"
          alt="MoustacheMan"
          width={560}
          height={560}
          className="w-[300px] h-[300px] z-[1] md:h-[560px] md:w-[560px]"
        /> */}
      </div>
      

      <div className="flex flex-col gap-3 z-[10] pl-40 pt-20">
        <h1 className="text-[24px] text-[#047857] max-w-[500px]">
          Hi, I am Anastasia Dernova 
          Frontend Developer
          <span className="text-[#86198f]">JavaScript, React, and Next.js Enthusiast  </span>
        </h1>
        <p className="text-[16px] text-[#047857] md:text-[#047857] mb-10 md:pb-2 max-w-[400px]">
          I love building sleek, user-friendly web applications that deliver great experiences.  
          Check out my projects below or get in touch to collaborate!
        </p>
        <p className="text-[20px] text-[#047857] md:text-[#047857] mb-10 md:pb-2 max-w-[400px]">
          Check my LinkedIn account
          <div className="flex flex-row gap-5">
            {Socials.map((social) => (
              <a 
                key={social.name} 
                href={social.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:opacity-80 transition-opacity"
              >
              <Image
                key={social.name}
                src={social.src}
                alt={social.name}
                width={24}
                height={24}
              />
              </a>
            ))}

          </div>
        </p>

      </div>


    </main>
  );
}
