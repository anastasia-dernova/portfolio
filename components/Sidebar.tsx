"use client"

import React, {useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { NavLinks } from "@/constants";
import Link from "next/link";
import Transition from "./Transition";

const Sidebar = () => {
    const [isRouting, setIsRouting] = useState(false);
    const [isActive, setIsActive] = useState('Home');
    const [prevPath, setPrevPath] = useState('/');

    const path = usePathname();

    useEffect(() => {
        if(prevPath !== path){
            setIsRouting(true)
            setPrevPath(path);
        }
    }, [prevPath])

    useEffect(() => {
        if(isRouting) {
            const timeout = setTimeout(() => {
                setIsRouting(false)
            }, 1200)

            return () => clearTimeout(timeout)
        }
    }, [isRouting])
    return(
        <div className="fixed right-8 top-[40%] z-[20] h-[200px] w-[48px] rounded-full bg-gray-500 bg-opacity-50">
            <AnimatePresence mode="wait">
                {isRouting && <Transition/>}
                <div className="flex flex-col gap-5 pb-5 justify-center items-center h-full">
                    {NavLinks.map((link) => (
                        <Link
                        key={link.name}
                        href={link.link}
                        onClick={() => setIsActive(link.name)}
                        > 
                            <link.icon className={`w-[28px] h-[28px] ${isActive === link.name ? 'text-[#86198f]': 'text-white'}`} />
                        </Link>
                    ))}

                </div>

            </AnimatePresence>
        </div>
    )
}

export default Sidebar