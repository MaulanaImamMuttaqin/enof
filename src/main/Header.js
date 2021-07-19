import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

function Header() {
    const {currentUser} = useContext(AuthContext)
    return (
        <div>
            <h1>hello {currentUser}</h1>
        </div>
    )
}

export default Header
