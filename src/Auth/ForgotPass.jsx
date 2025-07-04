import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {forgotpasswordSchema} from '../lib/ValidationSchema'
import 'bootstrap/dist/css/bootstrap.min.css';
import Hrlogo from '../assets/Frame 1000003286.svg';
import {Link} from 'react-router-dom';
import '../Style/Signin.css'
import Loader from '../utils/Loader';



const ForgotPass = () => {
    
    const [isClicked,setIsClicked] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(forgotpasswordSchema),
    });

    const handleForgotPwd = async (data) => {
        setIsClicked(true)
       try {
        const req = await fetch("https://mern-backend-1-9jn6.onrender.com/api/auth/forgotpassword",{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify(data)
        })
        const res = await req.json();
        console.log(res);
        
        if(!res.success){
          toast.error(res.errMsg)
        }
        if(res.success){
          toast.success(res.message)
    
        }
        console.log(res);
        
       } catch (error) {
        
       }finally{
        setIsClicked(false)
    
       }
      };

    const btnText = isClicked ? <Loader/> : "Request Password Reset"

    

    return (
        <>
          <main className = "sign-in d-flex justify-content-center align-items-center">
              <section className = "sign-in-containers ">
                  <div className = "d-flex gap-2 justify-content-center align-items-center sign-in-hr">
                      <img src= {Hrlogo} alt="HR -LOGO"/>
                      <h1 className = 'mt-2'>HR Manager</h1>
                  </div>
                  <div className = "forgot-pass mt-4">
                      <h2>Forgot password</h2>
                  </div>
                  <form action="" onSubmit={handleSubmit(handleForgotPwd)}>
                  <div className = "my-2">
                      <input type="email" name="email" id="" className = "w-100" placeholder = "Enter your email address to reset your password" {...register("email")}/>
                      <span className = "spans">{errors.email?.message}</span>
                  </div>
                    <button className = "bttn w-100 mt-3" type = 'submit' disabled = {isSubmitting}>{btnText}</button>
                  </form>
              </section>
          </main>
        </>
    )
}

export default ForgotPass

