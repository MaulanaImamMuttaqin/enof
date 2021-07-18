import React, {useState} from 'react'
import firebase from "../firebase"

export const AuthContext = React.createContext();

export function AuthProvider({children}) {
    const [currentUser, setCurrentuser] = useState("Maulana")

    return (
        <AuthContext.Provider
            value={{currentUser}}
        >
            {children}
        </AuthContext.Provider>
    )
}

