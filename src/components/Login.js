import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export default function Login() {
    const {currentUser} = useContext(AuthContext)
    console.log(currentUser)

    return (
        <div>
            this is login
        </div>
    )
}
