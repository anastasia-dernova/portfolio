"use client"

import React from "react";
import {motion} from 'framer-motion';

const TransitionOptions = {
    initial: {
        x: '100%', 
        width: '100%'
    }, 
    animate: {
        x: '0%', 
        width: '0%'
    }, 
    exit: {
        x: ['0%', '100%'], 
        width: ['0%', '100%']
    }
}

const Transition = () => {
    return (
        <div>
            <motion.div
            className="fixed top-0 bottom-0 h-screen w-screen right-full z-[50] bg-[#4ade80]"
            variants={TransitionOptions}
            initial="initial"
            exit='exit'
            animate='animate'
            transition={{ delay: 0.2, duration: 0.8, ease: 'easeInOut'}}
            />
            <motion.div
            className="fixed top-0 bottom-0 h-screen w-screen right-full z-[40] bg-[#86efac]"
            variants={TransitionOptions}
            initial="initial"
            exit='exit'
            animate='animate'
            transition={{ delay: 0.3, duration: 0.8, ease: 'easeInOut'}}
            />
            <motion.div
            className="fixed top-0 bottom-0 h-screen w-screen right-full z-[30] bg-[#bbf7d0]"
            variants={TransitionOptions}
            initial="initial"
            exit='exit'
            animate='animate'
            transition={{ delay: 0.4, duration: 0.8, ease: 'easeInOut'}}
            />
            <motion.div
            className="fixed top-0 bottom-0 h-screen w-screen right-full z-[20] bg-[#dcfce7]"
            variants={TransitionOptions}
            initial="initial"
            exit='exit'
            animate='animate'
            transition={{ delay: 0.6, duration: 0.8, ease: 'easeInOut'}}
            />
            <motion.div
            className="fixed top-0 bottom-0 h-screen w-screen right-full z-[10] bg-[#f0fdf4]"
            variants={TransitionOptions}
            initial="initial"
            exit='exit'
            animate='animate'
            transition={{ delay: 0.8, duration: 0.8, ease: 'easeInOut'}}
            />

        </div>
    )
}

export default Transition