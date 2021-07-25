import React, {useEffect, useReducer, useState} from 'react'
import firebase from "../firebase"
import {AnimatePresence, motion} from "framer-motion"

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
    let notifSended = false
    const [state, dispatch] = useReducer(reducer, initialState)

    const showNotification =() =>{
        // console.log("notification is already sended : ", notifSended)
        if(!notifSended){
            // console.log("notification sended")
            const notification = new Notification("E-nof", {
                body : "BANJIR, SEGERA SELAMATKAN BARANG ANDA", 
                requireInteraction: true
            })
            notifSended = true

        }
        
        
    }

    const sendNotification = (water_level) =>{
        if (water_level > 3){
            if(Notification.permission === 'granted'){
                showNotification()
            }else if (Notification.permission !== 'denied'){
                Notification.requestPermission().then(permission =>{
                    if(permission === 'granted'){
                        showNotification()
                    }
                })
            }
        }else {
            notifSended = false
        }
        
    }   

    const setupData = (data)=>{
        const water_level = data.ketinggian_air && parseFloat(data.ketinggian_air.tinggi_air).toFixed(1);
        const status = data.Status && data.Status.status
        const water = -1 * (((water_level / 5.0) * 300)  - 550)
        const water_color = water_level < 2 ? 'blue' : (water_level > 2 && water_level <= 3) ? 'yellow': (water_level > 3 && water_level < 4) ? 'red' : 'red' 

        const new_data = {
            height : water_level,
            status : status,
            waterAnimationHeight : water,
            waterAnimationColor : water_color,
        }
        dispatch({type : 'update_status', payload: new_data})
        sendNotification(water_level)  
    }



    useEffect(()=>{
        db.on('value', (data)=>{
            const result = data.val()
            // console.log(result)
            localStorage.setItem("result", JSON.stringify(result))
            setupData(result)
        })
        connectedRef.on("value", (snap) => {
            if (snap.val() === false && (!navigator.onLine)) {
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

        <motion.div className="h-screen relative bg-blue-200"
            variants={PageVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            
            <div className="absolute h-screen w-screen z-20">
                <AnimatePresence>
                    {false && 
                        <Connection_Status/>
                    }
                </AnimatePresence>
                <div className="h-auto w-full grid grid-cols-2 absolute center-child">
                    
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
                            <p><span className="text-6xl">{state.height}</span><span className="text-3xl">m</span></p> 
                            <p>Status</p>
                            <p className="text-6xl uppercase"> {state.status}</p>
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
            <motion.div className="bg-yellow-400 p-3 text-xl font-bold text-gray-300 rounded-lg m-2 mt-14"
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
