import React, {useState, useEffect} from 'react'
import firebase from "../firebase"
import {useLocation} from "react-router-dom";
import {useHistory} from "react-router"

export const AuthContext = React.createContext();

export function AuthProvider({children}) {
    const[currentUser, setCurrentUser] = useState(null)

    const history = useHistory()
    const location = useLocation()

    useEffect(()=>{
        firebase.auth().onAuthStateChanged((user)=>{
            if(user){
                setCurrentUser(user.email)
            }else if (!user && (location.pathname !== "/Login")){
                console.log("not logged in")
                history.push("/Login")
                
            }
            
        })

    },[])


    return (
        <AuthContext.Provider
            value={{currentUser}}
        >
            {children}
        </AuthContext.Provider>
    )
}

