import { Route,BrowserRouter,Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import AdminSecurity from './pages/adminPages/AdminSecurity'
import AdminHome from './pages/adminPages/AdminHome'
import AdminForgetPWD from './pages/adminPages/AdminForgetPWD'
import EmailVerification from './pages/adminPages/Component/EmailVerification'
import OTP from './pages/adminPages/Component/OTP'
function App() {
 

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' Component={Home}/>
      <Route path='/admin' Component={AdminSecurity}/>
      <Route path='/adminhome' Component={AdminHome}/>
      <Route path='/forgetpassword' Component={AdminForgetPWD}/>
      <Route path='/emailverification' Component={EmailVerification}/>
      <Route path='/otp' Component={OTP}/>

    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
