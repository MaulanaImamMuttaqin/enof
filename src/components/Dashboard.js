import React, {useEffect, useState} from 'react'
import firebase from "../firebase"
import Moment from 'react-moment'
import 'moment-timezone'

function Dashboard() {
    const db = firebase.database().ref('pos_1')
    const [height, setHeight] = useState("")
    const [status, setStatus] = useState("")
    const [load, setLoad] = useState(false)

    useEffect(()=>{
        setLoad(true)
        db.on('value', (data)=>{
            const result = data.val()
            const water_level = parseFloat(result.ketinggian_air.tinggi_air).toFixed(1);
            setHeight(water_level)
            setStatus(result.Status.status)
            setLoad(false)  
        })
        
    }, [db])
    
    

    return (
            
            // {/* {load ? <p>Loading</p>:
            //     <div>
            //         <p>Ketinggian Air : {height}</p> 
            //         <p>Status : {status}</p>
            //     </div>
            // } */}
        <div className="h-screen pt-12 relative">
            <div className="absolute h-screen w-screen z-50">
                <div className="h-auto w-full grid grid-cols-2 absolute top-24">
                    <div className="h-20 rounded-xl border border-gray-400 shadow-2xl m-2"></div>
                    <div className="h-20 rounded-xl border border-gray-400 shadow-2xl m-2"></div>
                    <div className="h-60 rounded-xl border border-gray-400 shadow-2xl m-2 col-span-2 text-center relative">
                        <div className="center-child">
                            <p>Ketinggian Air</p>
                            <p className="text-6xl">{height}</p> 
                            <p>Status</p>
                            <p className="text-6xl text-red-700 "> {status}</p>
                        </div>
                    </div>
                </div>
                
            </div>
            <div className="h-screen w-screen m-0 overflow-hidden center relative z-0">
            
                <div className="absolute rounded-full opacity-80 animate-spin-slow bg-blue-500" style={{width:"700px", height:"660px", top:"350px"}}></div>
                <div className="absolute rounded-full opacity-80 animate-spin-slower bg-blue-500" style={{width:"700px", height:"580px", top:"350px"}}></div>
                <div className="absolute rounded-full opacity-80 animate-spin-very-slow bg-blue-700" style={{width:"700px", height:"620px", top:"350px"}}></div>
            </div>  
        </div>
    )
}

export default Dashboard
