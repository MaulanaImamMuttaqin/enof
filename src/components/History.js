import React from 'react'
import {motion} from "framer-motion"

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
function History() {
    return (
        <motion.div className="pt-24"
            variants={PageVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            this is history
        </motion.div>
    )
}

export default History;