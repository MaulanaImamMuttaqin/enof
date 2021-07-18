import React, { useContext } from 'react'
import { useForm } from 'react-hook-form';
// import { AuthContext } from '../context/AuthContext'
import {motion} from "framer-motion"


const loginVariant = {
    hidden: {
        opacity: 0,
        y: -20
    },
    visible:{
        opacity:1,
        y:0,
        transition : {
            ease : "easeInOut",
            delay:0.3
        }
    }
}

export default function Login() {
    // const {currentUser} = useContext(AuthContext)
    // console.log(currentUser)

    const { register, handleSubmit} = useForm();

    const login =(data) =>{
        const {username, password} = data;
        console.log(username, password)
    }
    return (
        <motion.div 
        variants={loginVariant}
        initial="hidden"
        animate="visible" className="center h-screen">
            <div className="border border-gray-300 h-96 w-80 rounded-xl shadow-2xl ">
                <h1 className="text-center py-6 text-3xl text-gray-600 h-auto center">LOGIN</h1>
                <form onSubmit={handleSubmit(login)} className="h-3/5 center flex-col"> 
                    <input type="text" className="form-login pl-5" placeholder="Masukan Username"
                        {
                            ...register('username', {
                                required: true
                            })
                        }
                    />
                    <input type="password" className="form-login pl-5" placeholder="Masukan Password"
                        {
                            ...register('password', {
                                required: true
                            })
                        }
                    />
                    <button className="form-login bg-blue-700 text-white" type="submit">Login</button>                    
                </form>
                
                
            </div>
        </motion.div>
    )
}
