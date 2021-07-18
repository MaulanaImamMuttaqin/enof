import React, {useEffect, useState} from 'react'
import firebase from "../firebase"

function Dashboard() {
    const db = firebase.database().ref('pos_1')
    const [value, setValue] = useState("")
    const [load, setLoad] = useState(false)

    useEffect(()=>{
        setLoad(true)
        db.on('value', (data)=>{
            const result = data.val()
            setValue(result.ketinggian_air.tinggi_air)
            setLoad(false)  
        })
    }, [])
    

    return (
        <div>
            {load ? <p>Loading</p>:
                <div>
                    value : {value}
                </div>
            }
        </div>
    )
}

export default Dashboard
