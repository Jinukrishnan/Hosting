import React, { useState } from 'react'
import './EmailVerification.scss'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const EmailVerification = () => {
    const navigate=useNavigate()
    // http://localhost:3001/api/verification
    const [val,setVal]=useState({
        email:""
    });
    const handleChange=(e)=>{
        setVal((pre)=>({...pre,[e.target.name]:e.target.value}))
    }

    const verifyEmail=async()=>{
        console.log(val);
        const res=await axios.post("http://localhost:3001/api/verification",{...val})
        console.log(res);
        if(res.status==200){
            navigate('/otp')
        }
    }

  return (

    <div className='emailverification '>
      <div className="card">
        <div className="inp">
        <input type="text" placeholder='Verified Email' name='email' onChange={handleChange}  />
        </div>
        <div>
            <button className='btn' onClick={verifyEmail}>Verify</button>
        </div>
      </div>
    </div>
  )
}

export default EmailVerification
