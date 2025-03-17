import React from "react";
import Image from "next/image";
import DownloadCV from "./DownloadCv";
import { Socials } from "@/constants";

const Navbar = () => {
    return(
        <div className="fixed top-0 bg-transparent z-[10] w-full flex flex-col sm:flex-row gap-2 sm:gap-5 justify-between p-3 sm:p-5 md:px-10 lg:px-20 xl:px-40">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">

                <h1 className="text-[#047857] text-[30px] sm:text-[40px] md:text-[50px] leading-tight flex flex-col sm:flex-row">
                    <span className="font-thin sm:sl-2">Anastasia</span>DERNOVA 
                </h1>
                <div className="flex items-center gap-3 ml-1 sm:ml-4">
                    {Socials.map((social) => (
                        <a 
                            key={social.name} 
                            href={social.link} 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:opacity-80 transition-opacity"
                        >
                            <Image
                                src={social.src}
                                alt={social.name}
                                width={34}
                                height={34}
                            />
                        </a>
                    ))}
                </div>

            </div>    
                <div className="self-start sm:self-center">
                    <DownloadCV/>
                </div>
            
        </div>
        
    );
};
export default Navbar