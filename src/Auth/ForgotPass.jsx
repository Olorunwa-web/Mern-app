import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {forgotpasswordSchema} from '../lib/ValidationSchema'
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
        <section className = 'bg-none sign-in md:bg-cover min-h-screen w-full flex justify-center items-center'>
          <main className = 'bg-white w-full md:w-[430px] rounded-lg p-6'>
              <section className = "">
                   <div className = " mb-2 flex gap-2 items-center">
                       <img src= {Hrlogo} className ="w-[32px] h-[32px]"/>
                       <h1 className = 'font-san-sef text-xl text-[#343536] font-bold '>HR Manager</h1>
                  </div>
                  <div className = "mt-6">
                      <h2 className = 'text-[#28282B] text-xl font-medium font-inter '>Forgot password</h2>
                  </div>
                  <form action="" className = '' onSubmit={handleSubmit(handleForgotPwd)}>
                  <div className = "mt-2 mb-3">
                      <input type="email" name="email" id="" className = " w-full bg-[#F3F3F3] rounded-sm py-2 outline-none font-inter text-base font-normal text-[#111014] px-4" placeholder = "Enter your email address to reset your password" {...register("email")}/>
                      <span className = "text-xs font-inter font-medium text-[#EC5E5E]">{errors.email?.message}</span>
                  </div>
                    <button className = "w-full bg-[#3439CA] rounded-sm border-none text-white text-base font-medium  py-2 font-neural mt-3" type = 'submit' disabled = {isSubmitting}>{btnText}</button>
                  </form>
              </section>
          </main>
        </section>
        </>
    )
}

export default ForgotPass

