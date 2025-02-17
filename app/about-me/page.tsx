import React from "react";
import ProjectSlider from "@/components/ProjectSlider";

const Page = () => {
    return (

        <div className="flex items-center justify-center gap-5 flex-col md:flex-row h-screen bg-[#f0fdf4]">
            <div className="flex flex-col gap-3">
                <h1 className="text-[50px] text-[#86198f] font-semibold">
                    Information about me
                </h1>
                <p className="max-w-[400px]text-[16px] text-[#047857] md:text-[#047857] ">
                    Hi! I am a young, creative, and energetic front-end developer with a passion for bringing
                    ideas to life through beautiful and interactive designs. I love the instant feedback 
                    that front-end development provides, where creativity knows no limits. 
                </p>
                <p className="max-w-[400px]text-[16px] text-[#047857] md:text-[#047857] "> 
                    Outside of coding, you will find me exploring new coffee flavors, 
                    getting lost in books and films, or traveling to new places. I thrive in friendly, 
                    collaborative environments and enjoy meeting new people. I speak English, Russian, and Czech, 
                    and I am currently learning Italian. Let us connect and create something amazing together!
                </p>
            </div>

        <ProjectSlider/>

        </div>

    )
}

export default Page; 