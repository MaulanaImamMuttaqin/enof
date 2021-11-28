import React from 'react'
import { motion} from "framer-motion"
import {HeaderTitle} from '../reusable/HeaderTitle'


const PageVariant = {
    hidden: {
        opacity: 0,
        x: 50
    },
    visible:{
        opacity:1,
        x:0,
        transition : {
            ease : "easeInOut",
            delay:0.3
        }
    },
    exit:{
        x:-50,
        opacity:0,  
        transition:{
            ease: "easeInOut"
        }
    }
  }

function LiveStreaming() {
    const ytSource = "https://www.youtube.com/embed/gF8FYYppHtE"
    return (
        <motion.div
        variants={PageVariant}
        initial="hidden"
        animate="visible"
        exit="exit"
        >
            <div className="w-screen h-screen center flex-col p-2">
                <HeaderTitle>Tampilan Langsung</HeaderTitle>
                <div className="w-full m-2">
                    <iframe width="100%" height="315" src={`${ytSource}?autoplay=1&mute=1`} title="YouTube video player" frameBorder="0" allow="autoplay" allowFullScreen></iframe>
                </div>
            </div>
        </motion.div>
    )
}

export default LiveStreaming
