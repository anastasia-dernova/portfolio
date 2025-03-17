import Navbar from "@/components/Navbar";
import ProjectSlider from "@/components/ProjectSlider";
import React from "react";

const Page = () => {
    return( 
        <div className="flex items-center justify-center gap-5 flex-col md:flex-row h-screen bg-[#f0fdf4]">
            <Navbar/>
            <div className="flex flex-col gap-3">
                <h1 className="text-[50px] text-[#86198f] font-semibold">
                    My projects
                </h1>
                <p className="max-w-[400px] text-[16px] text-[#047857] md:text-[#047857] ">
                    Please take a look 
                    at my mini projects, that using different technology 
                </p>
            </div>

            <ProjectSlider/>



        </div>
    )
}

export default Page