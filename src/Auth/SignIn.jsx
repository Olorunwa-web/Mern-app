import React , {useEffect, useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
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
          <main className = "sign-in d-flex justify-content-center align-items-center">
              <form className = "sign-in-container" onSubmit={handleSubmit(onSubmit)}>
                  <div className = "d-flex gap-2 justify-content-center align-items-center sign-in-hr">
                        <img src= {Hrlogo} alt="HR -LOGO"/>
                        <h1 className = 'mt-2'>HR Manager</h1>
                  </div>
                  <div className = "text-center manager my-2">
                      <h2>Welcome to HR Manager - Where Creativity Meets Opportunity!</h2>
                  </div>
                  <div className = "mt-3">
                      <label htmlFor="email" className = "email">Email</label>
                      <input type="email" name="email"  className = "w-100" placeholder = "Enter email" {...register("email")}/>
                      <span className = "spans">{errors.email?.message}</span>
                  </div>
                  <div className = "password">
                      <div className = "d-flex WORD justify-content-between">
                          <label htmlFor="password">Password</label>
                          <p><Link to = "/auth/forgot-pass" className = 'color-forget'>Forgot Password?</Link></p>
                      </div>
                      <div className = "input-pass position-relative pb-3">
                        <input type= {reveal ? 'text' : 'password'} name="password" id="" className = "w-100  input-password" placeholder = "Enter Password" {...register("password")}/>
                        <span className = "spans">{errors.password?.message}</span>
                        <div className = 'position-absolute icon-wrapper'>
                            <img src= {reveal ? hidden : show } alt="" className = 'icon-img' onClick = {toggleReveal}/>
                        </div>
                      </div>
                  </div>
                  <div className = "py-2 sign-in-btn">
                      <button  className = "w-100 btns" type="submit" disabled = {isSubmitting}>{btnText}</button>
                  </div>
              </form>
          </main>
        </>
    )
}

export default SignIn
