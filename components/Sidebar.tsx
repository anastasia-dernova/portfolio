// "use client"

// import React, {useState, useEffect } from "react";
// import { AnimatePresence } from "framer-motion";
// import { usePathname } from "next/navigation";
// import { NavLinks } from "@/constants";
// import Link from "next/link";
// import Transition from "./Transition";

// const Sidebar = () => {
//     const [isRouting, setIsRouting] = useState(false);
//     const [isActive, setIsActive] = useState('Home');
//     const [prevPath, setPrevPath] = useState('/');

//     const path = usePathname();

//     useEffect(() => {
//         if(prevPath !== path){
//             setIsRouting(true)
//             setPrevPath(path);
//         }
//     }, [path])

//     useEffect(() => {
//         if(isRouting) {
//             const timeout = setTimeout(() => {
//                 setIsRouting(false)
//             }, 1200)

//             return () => clearTimeout(timeout)
//         }
//     }, [isRouting])
//     return(
//         <div className="fixed right-8 top-[40%] z-[20] h-[200px] w-[48px] rounded-full bg-gray-500 bg-opacity-50">
//             <AnimatePresence mode="wait">
//                 {isRouting && <Transition/>}
//                 <div className="flex flex-col gap-5 pb-5 justify-center items-center h-full">
//                     {NavLinks.map((link) => (
//                         <Link
//                         key={link.name}
//                         href={link.link}
//                         onClick={() => setIsActive(link.name)}
//                         > 
//                             <link.icon className={`w-[28px] h-[28px] ${isActive === link.name ? 'text-[#86198f]': 'text-white'}`} />
//                         </Link>
//                     ))}

//                 </div>

//             </AnimatePresence>
//         </div>
//     )
// }

// export default Sidebar

'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Transition from '@/components/Transition';
import { NavLinks } from '@/constants';

const Sidebar = () => {
    const [isRouting, setIsRouting] = useState(false);
    const [isActive, setIsActive] = useState('Home');
    const [prevPath, setPrevPath] = useState('/');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const path = usePathname();

    useEffect(() => {
        if(prevPath !== path){
            setIsRouting(true)
            setPrevPath(path);
        }
    }, [path]);

    useEffect(() => {
        if(isRouting) {
            const timeout = setTimeout(() => {
                setIsRouting(false)
            }, 1200)

            return () => clearTimeout(timeout)
        }
    }, [isRouting]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsMenuOpen(false);
            }
        };
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return(
        <>
            {isRouting && <Transition/>}
            
            <div className="fixed right-8 top-[40%] z-[20] h-[200px] w-[48px] rounded-full bg-gray-500 bg-opacity-50 hidden md:block">
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
            </div>
            
            <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="fixed top-4 right-4 z-50 p-2 rounded-full bg-gray-800 bg-opacity-70 md:hidden"
                aria-label="Toggle menu"
            >
                {isMenuOpen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                )}
            </button>
            
            {isMenuOpen && (
                <div 
                    className="fixed inset-0 bg-gray-900 bg-opacity-90 z-40 flex items-center justify-center md:hidden"
                >
                    <div 
                        className="flex flex-col items-center gap-8 py-10"
                    >
                        {NavLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.link}
                                onClick={() => {
                                    setIsActive(link.name);
                                    setIsMenuOpen(false);
                                }}
                                className="flex flex-col items-center"
                            > 
                                <link.icon className={`w-8 h-8 ${isActive === link.name ? 'text-[#86198f]': 'text-white'}`} />
                                <span className={`mt-1 text-sm ${isActive === link.name ? 'text-[#86198f]': 'text-white'}`}>
                                    {link.name}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default Sidebar;