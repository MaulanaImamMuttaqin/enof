import React from 'react'
import {motion} from "framer-motion"
import {HeaderTitle, SubHeaderTitle} from '../reusable/HeaderTitle'
import {Line} from "react-chartjs-2"
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
    const history = [
        {jam : "01:00", air : "0.35", status: "Aman"},
        {jam : "01:00", air : "0.12", status: "Aman"},
        {jam : "01:00", air : "0.16", status: "Aman"},
        {jam : "01:00", air : "0.17", status: "Aman"},
        {jam : "01:00", air : "0.20", status: "Aman"},
        {jam : "01:00", air : "0.30", status: "Aman"},
        {jam : "01:00", air : "0.26", status: "Aman"},
        {jam : "01:00", air : "0.19", status: "Aman"},
        {jam : "01:00", air : "0.20", status: "Aman"},
    ]
    return (
        <motion.div className="h-screen w-screen  p-2 pt-16 pb-16   overflow-y-scroll border-black border"
            variants={PageVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            <HeaderTitle><span>History</span></HeaderTitle>
            <div className="h-96 w-full border border-gray-400 mb-4 rounded-lg p-2 overflow-y-auto">
                
                <SubHeaderTitle><span>Bandung, 26-Juli-2020</span></SubHeaderTitle>
                {history.map((hist, index)=>
                    <SubHistory data={hist} ind={index+1} key={index}/>
                )}
                
            </div>
            <HeaderTitle><span>Metric</span></HeaderTitle>
            <div className="h-auto w-full border border-gray-400 mb-4 rounded-lg overflow-auto p-2">
                <Line
                    data={{
                        labels: ['01:00', '02:00', '03:00', '04:00', '05:00', '07:00', '08:00', '09:00', '10:00', ],
                        datasets: [{
                            label : '26-juli-2021',
                            data : ['0.35','0.12','0.16','0.17','0.20','0.30','0.26','0.19','0.20' ],
                            fill: true,
                            borderColor: 'rgb(75, 192, 192)',
                            tension: 0.1
                        }]
                    }}
                    height={70}
                    width={100}
                    options={{  
                        responsive: true
                        
                    }}
                />
            </div>
        </motion.div>
    )
}

function SubHistory({data, ind}){
    return (
        <div className="w-full border border-gray-400 h-16 rounded-lg flex items-center justify-evenly text-white text-xl font-semibold bg-blue-500 my-2">
            <p>{ind}:00 wib</p>
            <p className="">{data.air} m</p>
            <p className="">{data.status}</p>
        </div>
    )
}
export default History;