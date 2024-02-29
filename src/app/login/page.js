'use client'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import {signIn} from "next-auth/react"

const Login = () => {
    const router = useRouter();
    const [info, setInfo] = useState({username:"",password:""})
    const [error, setError] = useState("")
    const [pending, setPending] = useState(false)
    function handleInput(e){
         setInfo((prev) => ({   ...prev, [e.target.name]: e.target.value}))
    }
    async function handleSubmit(e){
        console.log("inside handlesubmit");
        e.preventDefault();
        if(!info.username || !info.password ){
            setError("Must provide all the credentials.")
        }
        console.log(info);
        try{
            setPending(true);

            const response = await signIn("credentials",{
                username: info.username,
                password: info.password,
                redirect: false
            })
            if(response.error){
                setError("Invalid Credentials.")

                setPending(false);
                return;
            }
            router.replace("/")
        
             
        } catch(error) {
            setPending(false);
            setError("Something went wrong.")
        }

    }
  return (
    <>
    <div className="login-box">
            <h1>Login </h1>
            <form onSubmit={handleSubmit} >

                <label for="">User Name</label>
                <input type="text" placeholder="Enter User Name" name='username' onChange={(e) => handleInput(e)}/>
                
                <label for="">Password</label>
                <input type="password" placeholder="Enter a password" name='password' onChange={(e) => handleInput(e)}/>

                {error && <span className='message'>{error}</span> }
                {/* <input type="button" value="Submit"/> */}
                <button disabled={pending?true:false}>{pending?"Logging in":"Login"}</button>
            </form>
            < p>By clicking the Sign Up button, you agree to our <br/>
            <a href="#">Terms and Conditions</a> and <a href="#">Privacy Policy</a></p> 
        </div>
        <p className="para-2">Don't have an account? <a href="signup.html">Signup here</a></p>
    </>
  )
}

export default Login