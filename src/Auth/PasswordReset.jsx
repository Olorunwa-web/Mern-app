import React, {useState, useEffect} from 'react'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup";
import {passwordSchema} from '../lib/ValidationSchema'
import Hrlogo from '../assets/Frame 1000003286.svg';
import {Link, useNavigate, useParams} from 'react-router-dom';
import '../Style/Signin.css';
import toast from 'react-hot-toast';
import Loader  from '../utils/Loader';
import show from '../assets/visibility_24dp_111014_FILL0_wght400_GRAD0_opsz24.svg';
import hidden from '../assets/visibility_off_24dp_111014_FILL0_wght400_GRAD0_opsz24.svg';


const PasswordReset = () => {
    const [isClicked, setisClicked] = useState(false);
    const [isReveal, setIsReveal] = useState(false);
    const [isReveal2, setIsReveal2] = useState(false);
    const navigate = useNavigate()
    const {resetToken} = useParams()

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(passwordSchema),
        defaultValues: {
          password: "",
          confirmpassword: "",
        }
    });
    
      useEffect(() => {
        document.title = "Reset Password";
      });

      async function onSubmit(data) {
          setisClicked(true)
        try {
          const req = await fetch(`https://mern-backend-1-9jn6.onrender.com/api/auth/resetpassword/${resetToken}`, {
            method : "PUT",
            headers : {
              "Content-type": "application/json",
            }, 
            body : JSON.stringify(data)
          })
          const res = await req.json()
          if (!res.success){
            toast.error(res.message)
          }
          if (res.success){
            toast.success(res.message);
            navigate("/auth/sign-in")
          }
          console.log(res);
          
        } catch (error) {
          
        }finally{
            setisClicked(false)
        }
      };

      function toggleReveal1() {
        if (isReveal) {
          setIsReveal(false);
        } else {
          setIsReveal(true);
        }
      }
      function toggleReveal2() {
        if (isReveal2) {
          setIsReveal2(false);
        } else {
          setIsReveal2(true);
        }
      }

      const btnText = isClicked ? <Loader /> : "Reset Password";
    return (
        <>
        <section className = 'bg-none sign-in md:bg-cover min-h-screen w-full flex justify-center items-center'>
          <main className = "bg-white w-full md:w-[430px] rounded-lg p-6">
              <form className = " " onSubmit={handleSubmit(onSubmit)}>
                  <div className = " mb-2 flex gap-2 justify-center items-center">
                      <img src= {Hrlogo} className ="w-[32px] h-[32px]"/>
                      <h1 className = 'font-san-sef text-xl text-[#343536] font-bold '>HR Manager</h1>
                  </div>
                  <div className = "mt-4">
                      <h2 className = 'text-[#28282B] text-xl font-medium font-inter'>Check your Email</h2>
                      <p className = 'text-[#878789] text-sm font-medium font-inter '>We have sent a password recovery instruction to your email.</p>
                  </div>
                  <div className = "my-3">
                      <label htmlFor="password" className = "text-gray-800 font-inter text-sm font-medium">Password *</label>
                      <div className = 'relative'>
                      <input type= {isReveal ? 'text' : 'password'} name="password" id="" className = "mt-1 w-full bg-[#F3F3F3] rounded-sm py-2 outline-none font-inter text-base font-normal text-[#111014] px-4" placeholder = "Enter Password" {...register("password")}/>
                      <span className = "text-xs font-inter font-medium text-[#EC5E5E]">{errors.password?.message}</span>
                      <div className = 'absolute top-4 right-4 '>
                         <img src= {isReveal ? hidden : show } alt=""  className = 'w-[17px] h-[17px]' onClick = {toggleReveal1}/>
                       </div>
                      </div>
                  </div>
                  <div className = "mt-3 ">
                      <label htmlFor="password" className = "text-gray-800 font-inter text-sm font-medium">Confirm Password *</label>
                      <div className = 'relative'>
                      <input type= {isReveal2 ? 'text' : 'password'} name="password" id="" className = "mt-1 w-full bg-[#F3F3F3] rounded-sm py-2 outline-none font-inter text-base font-normal text-[#111014] px-4" placeholder = "Re-enter Password" {...register("confirm password")}/>
                      <span className = "text-xs font-inter font-medium text-[#EC5E5E]">{errors.confirmpassword?.message}</span>
                      <div className = 'absolute  top-4 right-4'>
                         <img src= {isReveal2 ? hidden : show } alt=""  className = 'w-[17px] h-[17px]' onClick = {toggleReveal2}/>
                       </div>
                      </div>
                  </div>
                  <div className = " mt-4 ">
                      <button  className = "w-full bg-[#3439CA] rounded-sm border-none text-white text-base font-medium  py-2 font-neural mt-3" disabled = {isSubmitting}>{btnText}</button>
                  </div>
              </form>
          </main>
        </section>
        </> 
    )
}

export default PasswordReset
