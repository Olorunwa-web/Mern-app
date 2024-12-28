import React , {useEffect, useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup";
import {signInSchema} from '../lib/ValidationSchema'
import Hrlogo from '../assets/Frame 1000003286.svg';
import OR from '../assets/Frame 40643.svg';
import '../Style/signin.css'
import {Link, useNavigate} from 'react-router-dom';
import toast from "react-hot-toast"


const SignIn = () => {
    const [reveal,setReveal] = useState(false)
    const [isClicked, setIsClicked] = useState(false)
    const navigate = useNavigate();
    
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

    function handleReveal(){
        reveal ? setReveal(false) : setReveal(true)
    }

    async function onSubmit(data) {
        console.log(7);
        setIsClicked(true)
        try {
            const req = await fetch("http://localhost:9080/api/auth/signin", {
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
                localStorage.setItem("hr-token", res.user.token)
                if (res.user.role === "super-admin" || res.user.role === "admin") {
                    navigate("/admin-dashboard")
                }else{
                    navigate("/admin-employee")
                }
            }
        } catch (error) {
            
        }finally{
            setIsClicked(false)
        }
    }


    const btnText = isClicked ? "loading" : "Sign In "

    return (
        <>
          <main className = "sign-in d-flex justify-content-center align-items-center">
              <form className = "sign-in-container" onSubmit={handleSubmit(onSubmit)}>
                  <div className = "d-flex gap-2 justify-content-center align-items-center sign-in-hr pb-2">
                      <img src= {Hrlogo} alt="HR -LOGO"/>
                      <h1>HR Manager</h1>
                  </div>
                  <div className = "text-center manager py-2">
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
                          <p><Link to = "/auth/forgot-pass">Forgot Password?</Link></p>
                      </div>
                      <div className = "input-pass pb-3">
                        <input type= {reveal ? 'text' : 'password'} name="password" id="" className = "w-100 input-password" placeholder = "Enter Password" {...register("password")}/>
                        <span className = "spans">{errors.password?.message}</span>
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
