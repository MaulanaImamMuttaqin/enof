import React, {useEffect, useState} from 'react'
import firebase from "../firebase"
import Moment from 'react-moment'
import 'moment-timezone'
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

function Dashboard() {
    const db = firebase.database().ref('pos_1')
    const [height, setHeight] = useState("")
    const [status, setStatus] = useState("")
    const [waterHeight, setWaterHeight] = useState("450")
    const [waterColor, setWatercolor ] = useState("blue")
    const [load, setLoad] = useState(false)

    useEffect(()=>{
        setLoad(true)
        db.on('value', (data)=>{
            const result = data.val()
            const water_level = parseFloat(result.ketinggian_air.tinggi_air).toFixed(1);
            const water = -1 * (((water_level / 5.0) * 300)  - 550)
            const water_color = water_level < 2 ? 'blue' : (water_level > 2 && water_level <= 3) ? 'yellow': (water_level > 3 && water_level < 4) ? 'red' : 'red' 
            setWatercolor(water_color)
            setWaterHeight(water)
            setHeight(water_level)
            setStatus(result.Status.status)
            setLoad(false)  
        })
        return ()=> console.log("clean up")
    }, [db])
    
    const dateToFormat = '1976-04-19T12:59-0500';
            

    return (

        <motion.div className="h-screen relative bg-blue-200"
            variants={PageVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            <div className="absolute h-screen w-screen z-50">
                <div className="h-auto w-full grid grid-cols-2 absolute top-56">
                
                    <div className="h-20 rounded-xl border border-gray-400 shadow-2xl m-2">
                        <div className="h-full rounded-xl backdrop-filter backdrop-blur-sm"></div>
                    </div>
                    <div className="h-20 rounded-xl border border-gray-400 shadow-2xl m-2">
                        <div className="h-full rounded-xl backdrop-filter backdrop-blur-sm"></div>
                    </div>
                    <div className="h-60 rounded-xl border border-gray-400 shadow-2xl m-2 col-span-2 text-center relative">
                        <div className="h-full rounded-xl backdrop-filter backdrop-blur-sm "></div>
                        <div className="center-child">
                            <p>Ketinggian Air</p>
                            <p><span className="text-6xl">{height}</span><span className="text-3xl">m</span></p> 
                            <p>Status</p>
                            <p className="text-6xl uppercase"> {status}</p>
                        </div>
                    </div>
                </div>
                
            </div>
            <div className="h-screen w-screen m-0 overflow-hidden center relative z-0">
            
                <div className={`absolute transition-all duration-2000 ease-in-out rounded-full ${waterColor}-water opacity-100 animate-spin-slow`}   style={{width:"730px", height:"660px", top:`${waterHeight}px`}}></div>
                <div className={`absolute transition-all duration-2000 ease-in-out rounded-full ${waterColor}-water opacity-100 animate-spin-slower`}   style={{width:"730px", height:"580px", top:`${waterHeight}px`}}></div>
                <div className={`absolute transition-all duration-2000 ease-in-out rounded-full ${waterColor}-water opacity-90 animate-spin-very-slow`}   style={{width:"730px", height:"620px", top:`${waterHeight}px`}}></div>
            </div>  
        </motion.div>
    )
}

export default Dashboard
