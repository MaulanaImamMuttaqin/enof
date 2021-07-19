import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import firebase from "../firebase"

function Header() {
    const {currentUser} = useContext(AuthContext)

    const logout = ()=>{
        firebase.auth().signOut()
    }
    return (
        <div className="h-12 fixed bg-white w-screen z-50 border border-gray-500  rounded-b-xl flex justify-end">
            {/* <h1>hello {currentUser}</h1>
            <button onClick={logout} className="border border-gray-500 rounded-full px-5 hover:bg-gray-500 hover:text-white">LogOut</button> */}
            <div className="w-12 inline-block center mr-2 blue-logo">
                <Menu/>
            </div>
            
        </div>
    )
}

function Menu(){
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
    )
}
export default Header
