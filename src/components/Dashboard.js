import React, {useEffect, useReducer, useState} from 'react'
import firebase from "../firebase"
import {AnimatePresence, motion} from "framer-motion"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
        opacity:0,  
        transition:{
            ease: "easeInOut"
        }
    }
  }
const connectionVariant = {
    hidden: {
        opacity: 0,
        y: 50   
    },
    visible:{
        opacity:1,
        y:0,
        transition : {
            ease : "easeInOut",
            delay:0.3
        }
    },
    exit:{
        y:-50,
        opacity:0,  
        transition:{
            ease: "easeInOut"
        }
    }
}

const initialState = {
    height : "",
    status : "",
    waterAnimationHeight : "450",
    waterAnimationColor : "blue",
    
}

function reducer(state, action){
    switch (action.type){
        case "update_status":
            return action.payload
        default:
            throw new Error();
    }
}
function Dashboard() {
    const db = firebase.database().ref('pos_1')
    const connectedRef = firebase.database().ref(".info/connected");

    const [disConnected, setDisConnected] = useState(false)
    // const [notifSended, setNotifSended] = useState(false)
    let notifSended = true
    const [state, dispatch] = useReducer(reducer, initialState)

    const showNotification =() =>{
        if(!notifSended){
            notifSended = true
            navigator.serviceWorker.getRegistration()
            .then(reg =>{
                reg.showNotification("E-nof", {
                    body : "BANJIR, SEGERA SELAMATKAN DIRI ANDA", 
                    icon : "public/logo e-nof.jpeg",
                    vibrate: [100, 50, 100],
                    requireInteraction: true
                })
                
            })
            
        }
       
        
    }

    const sendNotification = (water_level) =>{
        
        if (water_level >= 3){
            if(Notification.permission === 'granted'){
                console.log("send Notification")
                showNotification()
            }else if (Notification.permission !== 'denied'){
                Notification.requestPermission().then(permission =>{
                    if(permission === 'granted'){
                        showNotification()
                    }
                })
            }
        }else if (water_level < 3){
            notifSended = false
        }
        console.log(water_level)
        console.log(notifSended)
    }   
    const decideStatus = (level) =>{
        switch (level) {
            case 0:
                return "AMAN";
            case 1:
                return "WASPADA";
            case 2:
                return "BAHAYA";
            case 3:
                return "BANJIR!";
            default:
                return null;
        }
    }

    const decideWaterColor = (level) =>{
        switch (level) {
            case 0:
                return "blue";
            case 1:
                return "yellow";
            case 2:
                return "red";
            case 3:
                return "red";
            default:
                return null;
        }
    }

    const setupData = (data)=>{
        const water_level = data.ketinggian_air && parseFloat(data.ketinggian_air.tinggi_air).toFixed(2);
        const status = data.Status && data.Status.status
        const water = -1 * (((water_level / 5.0) * 300)  - 550)

        const new_data = {
            height : water_level,
            status : decideStatus(status),
            waterAnimationHeight : water,
            waterAnimationColor : decideWaterColor(status),
        }

        dispatch({type : 'update_status', payload: new_data})
        sendNotification(water_level)  
    }



    useEffect(()=>{
        
        db.on('value', (data)=>{
            const result = data.val()
            localStorage.setItem("result", JSON.stringify(result))
            setupData(result)
        })
        connectedRef.on("value", (snap) => {
            if (snap.val() === false || (!navigator.onLine)) {
                let Data =  localStorage.getItem("result")
                setupData(JSON.parse(Data))
                setDisConnected(true)
            } else { 
                setDisConnected(false)
            }
          });

        return ()=> console.log("clean up")
    }, [])


    return (

        <motion.div className={`h-auto relative bg-gradient-to-t from-blue-500 to-${state.waterAnimationColor}-600`}
            variants={PageVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            
            <div className="absolute h-screen w-screen z-20">
                <AnimatePresence>
                    {disConnected && 
                        <Connection_Status/>
                    }
                </AnimatePresence>
                <div className="h-auto w-full grid grid-cols-2 absolute center-child text-gray-100">
                    
                    <div className="h-40 rounded-xl border border-gray-400 shadow-2xl m-2 col-span-2">
                        <div className="h-full rounded-xl backdrop-filter backdrop-blur-sm center flex-col">
                            <p className="text-5xl border-b-2 p-5">12:00 AM</p>
                            <p className="text-xl p-2"><span><FontAwesomeIcon icon="map-marker-alt"/></span> Banda Aceh, Aceh</p>
                        </div>
                    </div>

                    <div className="h-20 rounded-xl border border-gray-400 shadow-2xl m-2 relative">
                        <div className="h-full rounded-xl backdrop-filter backdrop-blur-sm absolute"></div>
                        <div className="center flex flex-col text-xs p-1 center">
                            <div className=" w-full flex py-2">
                                    <span className="border-r-2 px-1 flex-1">Suhu</span>
                                    <span className="px-1 flex-1"><FontAwesomeIcon icon="temperature-high"/> 34 &#8451;</span> 
                            </div>
                            <div className=" w-full flex py-2">
                                <span className="border-r-2 px-1 flex-1">Kelembapan</span>
                                <span className="px-1 flex-1"><FontAwesomeIcon icon="tint"/> 50 %</span> 
                            </div>
                        </div>  
                    </div>

                    <div className="h-20 rounded-xl border border-gray-400 shadow-2xl m-2 relative center">
                        <div className="h-full rounded-xl backdrop-filter backdrop-blur-sm absolute"></div>
                        <div className=" w-full flex p-2 text-sm">
                            <span className="border-r-2 px-1 flex-1">Cuaca</span>
                            <span className="px-1 flex-1"><FontAwesomeIcon icon="sun"/> Cerah</span> 
                        </div>
                    </div>

                    <div className="h-40 rounded-xl border border-gray-400 shadow-2xl m-2 col-span-2 text-center relative">
                        <div className="h-full rounded-xl backdrop-filter backdrop-blur-sm "></div>
                        <div className="h-full center-child flex ">
                            <div className="w-40 my-4 border-r-2 border-white rounded-lg center flex-col ">
                                <p className="border-b-2 px-2 pb-1 mb-2">Ketinggian Air</p>
                                <p><span className="text-4xl mx-1"><FontAwesomeIcon icon="arrows-alt-v"/></span><span className="text-4xl">{state.height}</span><span className="text-3xl"> m</span></p>
                                </div>
                            <div className="w-40 my-4 border-l-2 border-white rounded-lg center flex-col" >
                                <p className="border-b-2 px-2 pb-1 mb-2">Status</p>
                                <p className="text-4xl uppercase"> {state.status}</p>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
            <div className="h-screen w-screen m-0 overflow-hidden center relative z-0">
            
                <div className={`absolute transition-all duration-2000 ease-in-out rounded-full ${state.waterAnimationColor}-water opacity-100 animate-spin-slow`}   style={{width:"730px", height:"660px", top:`${state.waterAnimationHeight}px`}}></div>
                <div className={`absolute transition-all duration-2000 ease-in-out rounded-full ${state.waterAnimationColor}-water opacity-100 animate-spin-slower`}   style={{width:"730px", height:"580px", top:`${state.waterAnimationHeight}px`}}></div>
                <div className={`absolute transition-all duration-2000 ease-in-out rounded-full ${state.waterAnimationColor}-water opacity-90 animate-spin-very-slow`}   style={{width:"730px", height:"620px", top:`${state.waterAnimationHeight}px`}}></div>
            </div>  
        </motion.div>
    )
}

function Connection_Status(){
    return (
            <motion.div className="bg-yellow-400 p-3 text-xl font-bold text-gray-300 rounded-lg m-1 mt-14 relative z-10 shadow-xl"
                variants={connectionVariant}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                <h1>Anda tidak terhubung ke internet</h1>
            </motion.div>
    )
}
export default Dashboard
