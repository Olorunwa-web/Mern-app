import React, {useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
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
          <main className = "sign-in d-flex justify-content-center align-items-center">
              <form className = "sign-in-containers " onSubmit={handleSubmit(onSubmit)}>
                  <div className = "d-flex gap-2 justify-content-center align-items-center sign-in-hr pb-2">
                      <img src= {Hrlogo} alt="HR -LOGO"/>
                      <h1 className = 'mt-2'>HR Manager</h1>
                  </div>
                  <div className = "forgot-pass mt-4">
                      <h2>Check your Email</h2>
                      <p>We have sent a password recovery instruction to your email.</p>
                  </div>
                  <div className = "my-3 position-relative">
                      <label htmlFor="password" className = "pb-1">Password</label>
                      <input type= {isReveal ? 'text' : 'password'} name="password" id="" className = "w-100 input-password" placeholder = "Enter Password" {...register("password")}/>
                      <span className = "spans">{errors.password?.message}</span>
                      <div className = 'position-absolute icon-wrappers'>
                         <img src= {isReveal ? hidden : show } alt="" className = 'icon-img' onClick = {toggleReveal1}/>
                       </div>
                  </div>
                  <div className = "mt-3 position-relative">
                      <label htmlFor="password" className = "pb-1">Confirm Password</label>
                      <input type= {isReveal2 ? 'text' : 'password'} name="password" id="" className = "w-100 input-password" placeholder = "Re-enter Password" {...register("confirm password")}/>
                      <span className = "spans">{errors.confirmpassword?.message}</span>
                      <div className = 'position-absolute icon-wrappers'>
                         <img src= {isReveal2 ? hidden : show } alt="" className = 'icon-img' onClick = {toggleReveal2}/>
                       </div>
                  </div>
                  <div className = "py-2 mt-3 sign-in-btn">
                      <button  className = "w-100 btns" disabled = {isSubmitting}>{btnText}</button>
                  </div>
              </form>
          </main>
        </> 
    )
}

export default PasswordReset
