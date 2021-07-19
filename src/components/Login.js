import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import firebase from "../firebase"
import {motion} from "framer-motion"
import { useHistory } from 'react-router';


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

    const { register, handleSubmit} = useForm();
    const [Loading, setLoading] = useState(false)
    const history = useHistory()
    
    const login =(data) =>{
        const {email, pass} = data;
        console.log(email, pass)
        setLoading(true)
        firebase
        .auth()
        .signInWithEmailAndPassword(email, pass)
        .then(()=>{
            setLoading(false)
            console.log("login success")
            history.push("/")
        })
        .catch(error =>{
            console.log(error)
        })
    }
    return (
        <motion.div 
        variants={loginVariant}
        initial="hidden"
        animate="visible" className="center h-screen">
            <div className="border border-gray-300 h-96 w-80 rounded-xl shadow-2xl ">
                <h1 className="text-center py-6 text-3xl text-gray-600 h-auto center">LOGIN</h1>
                <form onSubmit={handleSubmit(login)} className="h-3/5 center flex-col"> 
                    <input type="text" className="form-login pl-5" placeholder="Masukan email"
                        {
                            ...register('email', {
                                required: true
                            })
                        }
                    />
                    <input type="password" className="form-login pl-5" placeholder="Masukan Password"
                        {
                            ...register('pass', {
                                required: true
                            })
                        }
                    />
                    <button className="form-login bg-blue-700 text-white" type="submit">Login</button>
                    {Loading && <p className="text-center my-5 border ">Mohon tunggu Sebentar</p> }                   
                </form>
                
                
            </div>
        </motion.div>
    )
}
