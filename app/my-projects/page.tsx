import Navbar from "@/components/Navbar";
import Particle from "@/components/Particle";
import ProjectSlider from "@/components/ProjectSlider";
import React from "react";

const Page = () => {
    return( 
        <div className="flex items-center justify-center gap-5 flex-col md:flex-row h-screen bg-[#f0fdf4]">
            <Navbar/>
            <div className="absolute right-0 top-0 h-full w-[100%] z-[1]"> 
                <Particle/>
            </div>
            <div className="flex flex-col gap-3 text-center md:text-left px-4 md:px-0 mt-16 md:mt-0">
                <h1 className="text-[36px] md:text-[50px] text-[#86198f] font-semibold">
                    My projects
                </h1>
                <p className="max-w-[400px] text-[16px] text-[#047857] md:text-[#047857]">
                    Please take a look at my mini projects, that using different technology 
                </p>
            </div>
            <ProjectSlider/>
        </div>
    )
}
export default Page