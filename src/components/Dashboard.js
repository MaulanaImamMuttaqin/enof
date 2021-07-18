import React, {useContext, useEffect, useState} from 'react'
import { AuthContext } from '../context/AuthContext'
import firebase from "../firebase"

function Dashboard() {
    const db = firebase.database().ref('pos_1')
    const [value, setValue] = useState("")
    const [load, setLoad] = useState(false)
    const {currentUser} = useContext(AuthContext)

    useEffect(()=>{
        setLoad(true)
        db.on('value', (data)=>{
            const result = data.val()
            setValue(result.ketinggian_air.tinggi_air)
            setLoad(false)  
        })
    }, [])
    
    const logout = ()=>{
        firebase.auth().signOut()
    }

    return (
        <div>
            <h1>hello {currentUser}</h1>
            {load ? <p>Loading</p>:
                <div>
                    value : {value}
                </div>
            }
            <button onClick={logout} className="border border-gray-500 rounded-full px-5 hover:bg-gray-500 hover:text-white">LogOut</button>
        </div>
    )
}

export default Dashboard
