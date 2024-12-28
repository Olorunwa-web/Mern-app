import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Hrlogo from '../assets/Frame 1000003286.svg';
import {Link} from 'react-router-dom';
import '../Style/signin.css'




const ForgotPass = () => {
    
    return (
        <>
          <main className = "sign-in d-flex justify-content-center align-items-center">
              <section className = "sign-in-containers ">
                  <div className = "d-flex gap-2 justify-content-center align-items-center sign-in-hr pb-2">
                      <img src= {Hrlogo} alt="HR -LOGO"/>
                      <h1>HR Manager</h1>
                  </div>
                  <div className = "forgot-pass mt-3">
                      <h2>Forgot password</h2>
                  </div>
                  <div className = "my-3">
                      <input type="email" name="email" id="" className = "w-100" placeholder = "Enter your email address to reset your password"/>
                  </div>
                  <Link to = "/auth/password-reset"><button className = "bttn w-100 mt-3">Request password reset</button></Link>
              </section>
          </main>
        </>
    )
}

export default ForgotPass

