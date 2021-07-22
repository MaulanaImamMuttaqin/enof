import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

function Navigation() {
    const location = useLocation()
    const [loc, setLoc] = useState("")
    const navButton = useRef({})
    useEffect(() => {
        const locate = location.pathname
        setLoc(locate.split("/")[1])
        for (const obj in navButton.current){
            navButton.current[obj].classList.remove("white-logo")
            if(obj == `/${loc}`){
                navButton.current[obj].classList.add("white-logo")
            }
        }

    })

    const clickButton = e =>{
        e.currentTarget.parentNode.childNodes.forEach(node=>{
            node.classList.remove("white-logo")
        })
        e.currentTarget.classList.add("white-logo") 
    }

    return (    
        <div className="border border-gray-300 h-12 fixed w-screen bottom-0 flex justify-between rounded-t-2xl shadow-xl z-50 bg-white">
            <div className="blue-logo nav-button" onClick={(e)=>clickButton(e)}>
                <a className="nav-button w-14" href="#">
                    <Account_Logo/>
                </a>
            </div>
            <div className="blue-logo nav-button" ref={el => navButton.current['/'] = el}>
                <Link className="nav-button w-14" to="/">
                    <Home_logo/>
                </Link>
                    
            </div>
            <div className="blue-logo nav-button" ref={el => navButton.current['/History'] = el}>
                <Link className="nav-button w-14" to="/History">
                    <History_Logo />
                </Link>
                
            </div>
            <div className="blue-logo nav-button" onClick={(e)=>clickButton(e)}>
                <a className="nav-button w-14" href="#">
                    <Setting_Logo />
                </a>
            </div>
            
        </div>
    )
}

function Home_logo(){
 return(
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
 )
}

function Setting_Logo(){
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
    )
}

function Account_Logo(){
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
    )
}
function History_Logo(){
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    )
}
export default Navigation
