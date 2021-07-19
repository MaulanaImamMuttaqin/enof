import React, {useEffect, useState} from 'react'
import firebase from "../firebase"

function Dashboard() {
    const db = firebase.database().ref('pos_1')
    const [height, setHeight] = useState("")
    const [status, setStatus] = useState("")
    const [load, setLoad] = useState(false)

    useEffect(()=>{
        setLoad(true)
        db.on('value', (data)=>{
            const result = data.val()
            setHeight(result.ketinggian_air.tinggi_air)
            setStatus(result.Status.status)
            setLoad(false)  
        })
        
    }, [db])
    
    const logout = ()=>{
        firebase.auth().signOut()
    }

    return (
        <div>
            
            {load ? <p>Loading</p>:
                <div>
                    <p>Ketinggian Air : {height}</p> 
                    <p>Status : {status}</p>
                </div>
            }

            <button onClick={logout} className="border border-gray-500 rounded-full px-5 hover:bg-gray-500 hover:text-white">LogOut</button>
        </div>
    )
}

export default Dashboard
