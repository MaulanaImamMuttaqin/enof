import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion} from "framer-motion"

const routervariants = {
    hidden:{
      y:100,
      opacity:0.5
    },
    visible:{
      opacity:1,
      y:0
    }
  }

function Navigation() {
    const location = useLocation()
    const navButton = useRef({})
    useEffect(() => {
        const locate = location.pathname
        const locPath = locate.split("/")[1]
        for (const obj in navButton.current){
            navButton.current[obj].classList.remove("white-logo")
            if(obj === `/${locPath}`){
                navButton.current[obj].classList.add("white-logo")
            }
        }
    },[location])

    const clickButton = e =>{
        e.currentTarget.parentNode.childNodes.forEach(node=>{
            node.classList.remove("white-logo")
        })
        e.currentTarget.classList.add("white-logo") 
    }

    return (    
        <motion.div className="border border-gray-300 h-12 fixed w-screen bottom-0 flex justify-between rounded-t-2xl shadow-xl z-50 bg-white"
            variants={routervariants} 
            initial="hidden"
            animate="visible"
        >
            <div className="blue-logo nav-button" ref={el => navButton.current['/History'] = el} >
                <Link className="nav-button w-14" to="/History">
                    <FontAwesomeIcon icon="history"/>
                </Link>
            </div>
            <div className="blue-logo nav-button" ref={el => navButton.current['/'] = el}>
                <Link className="nav-button w-14" to="/">
                    <FontAwesomeIcon icon="home"/> 
                </Link>
                    
            </div>
            <div className="blue-logo nav-button" ref={el => navButton.current['/LiveStream'] = el}>
                <Link className="nav-button w-14" to="/LiveStream">
                <FontAwesomeIcon icon="film"/>
                </Link>
                
            </div>
            
        </motion.div> 
    )
}

export default Navigation
