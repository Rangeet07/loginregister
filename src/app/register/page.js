'use client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const Register = () => {
    const router = useRouter();
    const [info, setInfo] = useState({firstname:"",lastname:"",username:"",college:"", email:"",phone:"",birthday:"",password:""})
    const [error, setError] = useState("")
    const [pending, setPending] = useState(false)
    function handleInput(e){
         setInfo((prev) => ({   ...prev, [e.target.name]: e.target.value}))
    }

   async function handleSubmit(e){
        console.log("inside handlesubmit");
        e.preventDefault();
        if(!info.username || !info.email || !info.firstname || !info.lastname || !info.college || !info.phone || !info.birthday || !info.password ){
            setError("Must provide all the credentials.")
        }
        try{
            setPending(true);
            const response = await fetch("/api/register",{
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(info),
            });
            if(response.ok){
                setPending(false);
                const form = e.target;
                form.reset();
                router.push("/login")
                console.log("user registered");
            }else{
                const errorData = await res.json();
                setError(errorData.message)
                setPending(false)
            }
        } catch(error) {
            setPending(false);
            setError("Something went wrong.")
        }

    }

  return (
    <>
            <div className="signup-box">
            <h1>Sign Up</h1>
            <h4>It's free and only takes a minute </h4>
            <form onSubmit={handleSubmit}>
                <label for="">First Name</label>
                <input type="text"  name='firstname' placeholder="Enter First Name" onChange={(e) => handleInput(e)}/>

                <label for="">Last Name</label>
                <input type="text"  name='lastname' placeholder="Enter Last Name" onChange={(e) => handleInput(e)}/>

                <label for="">User Name</label>
                <input type="text" name='username'  placeholder="Enter User Name" onChange={(e) => handleInput(e)}/>

                <label for="">College Name</label>
                <input type="text" name='college' placeholder="Enter College Name" onChange={(e) => handleInput(e)}/>

                <label for="">Email</label>
                <input type="email" name='email' placeholder="Enter your email" onChange={(e) => handleInput(e)}/>

                <label for="">Phone Number</label>
                <input type="tel" name='phone'
                placeholder="Enter phone number"  onChange={(e) => handleInput(e)}/>

                <label for="birthday">Date of Birth</label>
                <input type="date" name='birthday' id="birthday" onChange={(e) => handleInput(e)}/> 
                
                <label for="">Password</label>
                <input type="password" name='password' placeholder="Enter a password" onChange={(e) => handleInput(e)}/>

                <label for="">Confirm Password</label>
                <input type="password" name='password' placeholder="Enter confirmed password" onChange={(e) => handleInput(e)}/>
                {error && <span className='message'>{error}</span> }
                {/* <input type="button" value="Submit"/> */}
                <button disabled={pending?true:false}>{pending?"Registering":"Register"}</button>
            </form>
            <p>By clicking the Sign Up button, you agree to our <br/>
            <a href="#">Terms and Conditions</a> and <a href="#">Privacy Policy</a></p>
        </div>
        <p className="para-2">Already have an account? <a href="login.html">Login here</a></p>

    </>
  )
}

export default Register;