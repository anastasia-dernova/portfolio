import { Socials } from "@/constants";
import Image from "next/image";
import React from "react";
import DownloadCV from "./DownloadCv";

const Navbar = () => {
    return(
        <div className="fixed top-0 bg-transparent z-[20] w-full flex gap-5 md:justify-between md:px-60 p-5">
            <h1 className="text-[#047857] text-[50px]">
                Anastasia <span className="font-thin"> Dernova</span>
            </h1>
            <div>
                <DownloadCV/>
            </div>
        </div>
        
    );
};
export default Navbar