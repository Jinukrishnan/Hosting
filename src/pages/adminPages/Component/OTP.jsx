import React from 'react'
import './OTP.scss'
const OTP = () => {
    return (
        <div className='OTP'>
            <div className="card">
                <div className="inp">
                    <input type="text" placeholder='OTP' name='email'  />
                </div>
                <div>
                    <button className='btn'>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default OTP
