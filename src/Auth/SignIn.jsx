import React , {useEffect, useState} from 'react'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup";
import {signInSchema} from '../lib/ValidationSchema'
import Hrlogo from '../assets/Frame 1000003286.svg';
import OR from '../assets/Frame 40643.svg';
import '../Style/Signin.css'
import {Link, useNavigate} from 'react-router-dom';
import toast from "react-hot-toast";
import { useAuth } from '../context/AuthContext';
import Loader  from '../utils/Loader';
import show from '../assets/visibility_24dp_111014_FILL0_wght400_GRAD0_opsz24.svg';
import hidden from '../assets/visibility_off_24dp_111014_FILL0_wght400_GRAD0_opsz24.svg';
import Homebackground from '../assets/1881 1.svg'




const SignIn = () => {
    const [reveal,setReveal] = useState(false)
    const [isClicked, setIsClicked] = useState(false)
    const navigate = useNavigate();
    const [isError,setIsError] = useState(null)
    const {login} = useAuth() 
    
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
      } = useForm({
        resolver: yupResolver(signInSchema),
        defaultValues: {
            email: "molikiolorunwa@gmail.com",
            password: "Tinuadeola12",
        },
        signInSchema,
      });
    //   const onSubmit = (data) => console.log(data)
  
    useEffect(()=>{
        document.title = 'Sign In'
    })

   
    async function onSubmit(data) {
        console.log(7);
        setIsClicked(true)
        try {
            const req = await fetch("https://mern-backend-1-9jn6.onrender.com/api/auth/signin", {
                method: "POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(data)
            })
            const res = await req.json();
            console.log(res);

            if (!res.success) {
                toast.error(res.errMsg)
            }

            if (res.success) {
                toast.success(res.message)
                login(res.user)
                localStorage.setItem("hr-token", res.user.token)
                if (res.user.role === "super-admin" || res.user.role === "admin") {
                    navigate("/admin-dashboard")
                }else{
                    navigate("/admin-employee")
                }
            }
        } catch (error) {
            if (error.message === "Failed to fetch") {
                setIsError("Unable to connect to the server. Please check your network.");
              } else if (error.message.startsWith("HTTP Error")) {
                setIsError(error.message);  
              } else {
                setIsError("An unexpected error occurred. Please try again.");
              }
              toast.error(isError);
              console.log("Error details:", error);
            
        }finally{
            setIsClicked(false)
        }
    }

    function toggleReveal() {
        if (reveal) {
          setReveal(false);
        } else {
          setReveal(true);
        }
      }

    const btnText = isClicked ? <Loader/> : "Sign In "

    return (
        <>
          <section className = 'bg-none sign-in md:bg-cover min-h-screen w-full flex justify-center items-center'>
              <main className = 'bg-white w-full md:w-[430px] rounded-lg p-6'>
              <form className = "" onSubmit={handleSubmit(onSubmit)}>
                  <div className = " mb-2 flex gap-2 justify-center items-center">
                        <img src= {Hrlogo} className ="w-[32px] h-[32px]"/>
                        <h1 className = 'font-san-sef text-xl text-[#343536] font-bold '>HR Manager</h1>
                  </div>
                  <div className = "text-center mt-3 mb-5 ">
                      <h2 className = 'font-inter text-[#4D4D4D] font-bold text-lg '>Welcome to HR Manager - Where Creativity Meets Opportunity!</h2>
                  </div>
                  <div className = "my-3">
                      <label htmlFor="email" className = "text-gray-800 font-inter text-sm font-medium">Email*</label>
                      <input type="email" name="email"  className = "mt-1 w-full bg-[#F3F3F3] rounded-sm py-2 outline-none font-inter text-base font-normal text-[#111014] px-4" placeholder = "Enter email" {...register("email")}/>
                      <span className = "text-sm font-inter font-medium text-[#EC5E5E]">{errors.email?.message}</span>
                  </div>
                  <div className = "mt-4">
                      <div className = "flex justify-between">
                          <label htmlFor="password" className = "text-gray-800 text-sm font-inter font-medium ">Password*</label>
                          <p><Link to = "/auth/forgot-pass" className = 'text-sm font-inter font-medium text-[#3439CA]'>Forgot Password?</Link></p>
                      </div>
                      <div className = "input-pass relative pb-5">
                        <input type= {reveal ? 'text' : 'password'} name="password" id="" className = "mt-1 w-full bg-[#F3F3F3] rounded-sm py-2 outline-none font-inter text-base font-normal text-[#111014] px-4" placeholder = "Enter Password" {...register("password")}/>
                        <span className = "text-sm font-inter font-medium text-[#EC5E5E]">{errors.password?.message}</span>
                        <div className = 'absolute top-4 right-4'>
                            <img src= {reveal ? hidden : show } alt="" className = 'w-[17px] h-[17px]' onClick = {toggleReveal}/>
                        </div>
                      </div>
                  </div>
                  <div className = "mt-3 ">
                      <button  className = "w-full bg-[#3439CA] rounded-sm border-none text-white text-base font-medium  py-2 font-neural" type="submit" disabled = {isSubmitting}>{btnText}</button>
                  </div>
              </form>

              </main>
          </section>
        </>
    )
}

export default SignIn
