import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import firebase from "../firebase"


function Header() {
    const {currentUser} = useContext(AuthContext)
    const [clickMenu, setClickMenu] = useState(12)
    const logout = ()=>{
        firebase.auth().signOut()
    }
    const menuClicked = ()=>{
        if(clickMenu === 64){
            setClickMenu(12)
        }else{
            setClickMenu(64)
        }
    }
    return (
        <div className={`h-${clickMenu} transition-all duration-300 ease-in-out fixed bg-white w-screen z-50 border border-gray-300  rounded-b-xl overflow-hidden shadow-xl`}>
            <div className="rounded-b-xl flex justify-end border border-b-2">
                <div className="h-11 w-12 inline-block center mr-2 blue-logo " onClick={()=> menuClicked()}>
                    <Menu />
                </div>
            </div>
            {clickMenu === 64 &&
                <div className="h-48 flex my-2">
                    <div className="border-r-2 border-gray-300 h-full flex-1 center flex-col">
                        <div className="border border-gray-400 h-24 w-24 center text-5xl rounded-full text-blue-500 ">
                            <FontAwesomeIcon icon="user"/>
                        </div>
                        <p className="text-gray-400 my-2 text-sm">Halo, {currentUser}</p>
                    </div>
                    <div className="h-full flex-1 text-blue-500 grid grid-cols-2 grid-rows-2 gap-2 p-2 text-sm">
                        <div className="border border-gray-400 w-full p-3 center flex-col rounded-lg hover:bg-gray-300">
                            <FontAwesomeIcon icon="question"/><span className="mx-2">Bantuan</span>
                        </div>
                        <div className="border border-gray-400 w-full p-3 center flex-col rounded-lg hover:bg-gray-300">
                            <FontAwesomeIcon icon="cog"/><span className="mx-2">Pengaturan</span>
                        </div>
                        <div className="border border-gray-400 w-full p-3 center flex-col rounded-lg hover:bg-gray-300">
                            <FontAwesomeIcon icon="comment-alt"/><span className="mx-2">Masukan</span>
                        </div>
                        <div className="border border-gray-400 w-full p-3 center flex-col rounded-lg hover:bg-gray-300"
                            onClick={()=>logout()}
                        >
                            <FontAwesomeIcon icon="sign-out-alt"/><span className="mx-2">LogOut</span>
                        </div>
                    </div>
                </div>
            }
            
            
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
