import React, { useEffect, useState } from 'react'
import './AdminSecurity.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
const AdminSecurity = () => {
  const navigator=useNavigate();
  const [login,setLogin]=useState({
    email:"",
    password:""
  })
  const [register,setRegister]=useState({
username:"",
email:"",
phone:"",
password:"",
cpassword:""
  })
  // register state
  const handleRegister=(e)=>{
console.log(e.target.value);
setRegister((pre)=>({...pre,[e.target.name]:e.target.value}))
  }
  // registration
  const Registration=async(e)=>{
    e.preventDefault();
  
   try {
    const res=await axios.post("http://localhost:3001/api/adminregister",register)
    console.log(res);
    if (res.status==201)
      {
        console.log(res.data.msg);
        toast(res.data.msg);
      }
    
   } catch (error) {
    console.log(error);
   }

  }
  // login state
const handleLogin=(e)=>{
// console.log(e.target.value);
setLogin((pre)=>({...pre,[e.target.name]:e.target.value}))
}

  // login
  const Login=async(e)=>{
e.preventDefault();
if (!(login.email&&login.password)) {
  return toast("Fields are empty")
}
const res=await axios.post("http://localhost:3001/api/adminlogin",login)
console.log(res);
if (res.status==200) {
  console.log(res.data.token);
  localStorage.setItem('adminToken',res.data.token)
  toast(res.data.msg)
  setTimeout(()=>{
    navigator("/adminhome");
  },3000)
}
  }
  // design
  const customjs=()=>{
    const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});
    
  }
  useEffect(()=>{
    customjs()
  })

  return (
   

    <div className="container" style={{ width:"100vw", overflow: "hidden", position: "relative", minHeight: "100vh"}}>
        <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" transition: Bounce/>
      <div className="forms-container">
        <div className="signin-signup">
          {/* login form */}
          <form  onSubmit={Login} className="sign-in-form">
            <h2 className="title">Sign in</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Email" onChange={handleLogin} name='email' />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" onChange={handleLogin} name='password' />
            </div>
          
            <input type="submit" value="Login" className="btn solid" />
           <Link to={'/emailverification'}> <p className="social-text">Forget Password</p>  </Link>
           
          </form>
          {/* register form */}
          <form  onSubmit={Registration} className="sign-up-form">
            <h2 className="title">Sign up</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Username" onChange={handleRegister}  name='username' />
            </div>
   
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input type="email" placeholder="Email" onChange={handleRegister}   name='email' />
            </div>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input type="text" placeholder="Phone Number" onChange={handleRegister}   name='phone' />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" onChange={handleRegister}   name='password' />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Confirm Password" onChange={handleRegister}   name='cpassword' />
            </div>
            <input type="submit" className="btn" value="Sign up" />
            <p className="social-text">Or Sign up with social platforms</p>
            
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here ?</h3>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
              ex ratione. Aliquid!
            </p>
            <button className="btn transparent" id="sign-up-btn">
              Sign up
            </button>
          </div>
          <img src="img/log.svg" className="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>One of us ?</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
              laboriosam ad deleniti.
            </p>
            <button className="btn transparent" id="sign-in-btn">
              Sign in
            </button>
          </div>
          <img src="img/register.svg" className="image" alt="" />
        </div>
      </div>
    
    </div>


  )
}

export default AdminSecurity
