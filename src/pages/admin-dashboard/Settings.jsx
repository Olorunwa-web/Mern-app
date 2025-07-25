import React, {useState, useEffect} from 'react'
import '../../Style/Setttings.css'
import profilepic from '../../assets/Mask Group.svg'
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import {settingsSchema} from "../../lib/ValidationSchema"
import axios from "axios";
import OpenContext from '../../context/OpenContext'
import { useContext } from 'react';


const Settings = () => {
    const [profile, setProfile] = useState({});

    const { open } = useContext(OpenContext)
    const token = localStorage.getItem("hr-token")
    useEffect(() => {
        async function userProfile() {
          try {
            const req = await axios.get("https://mern-backend-1-9jn6.onrender.com/api/employee/user/profile", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
    
            if (req.data.success) {
              setProfile(req.data.employee);
            } else {
              console.error(req.data.errMsg);
            }
          } catch (error) {
            console.error("Error fetching profile:", error);
          }
        }
        userProfile();
      }, [token]);



    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(settingsSchema),
      });
      const onSubmit = (data) => console.log(data)
    return (
        <>
            <main className = "px-3 md:px-0 lg:px-0 w-19/20 mx-auto max-w-full">
                <section>
                  <div className = 'my-5 flex flex-col gap-1'>
                    <h2 className = "font-sans text-xl text-[#161E54] font-medium">Settings</h2>
                    <h4 className = "font-sans text-base text-[#404040] font-medium">Dashboard/Settings</h4>
                  </div>
                  <form className = 'my-4 p-3 md:p-4 lg:p-6  border-1 border-[#EBEEF1] rounded-[10px] ' >
                     <div className = "flex flex-col  gap-4  ">
                        <div className = {`flex flex-col w-full ${open ? "md:flex-col gap-y-4 lg:flex-row ": "md:flex-row "} mt-3  md:justify-between`}>
                            <div className = {`w-full   ${open ? "lg:w-5/15 ": "md:w-5/15 "} `}>
                                <h3 className = 'font-sans font-medium text-lg text-[#0E0A2D]'>Profile Information</h3>
                                <p className = "font-sans font-medium text-[0.97rem] text-[#747474]">Edit your profile Information</p>
                           </div>
                           <div className = {`w-full flex flex-col gap-4  ${open ? "lg:w-9/15 ": " md:w-9/15"}  pt-2`}>
                             <div className = 'flex flex-col gap-2'>
                                <label htmlFor="" className = "font-sans font-medium text-sm text-[#111014] ">Full Name*</label>
                                <input type="text" name="" id="" className = "w-full bg-white border-1 border-[#959595]  focus:outline-none py-2 px-3 font-sans font-normal text-[0.97rem] text-[#878789] text rounded-[5px] " placeholder = "" disabled value = {profile.fullName || ""} /> 
                             </div>
                            <div className = "flex flex-col gap-2">
                                 <label htmlFor="" className = "font-sans font-medium text-sm text-[#111014]">Email Address*</label>
                                 <input type="email" name="" id="" className = "w-full bg-[#F3F3F3] border-1 border-[#959595]  focus:outline-none py-2 px-3 font-sans font-normal text-[0.97rem] text-[#878789] text rounded-[5px]" placeholder = "Enter Email Address" disabled  value = {profile.email || ""} />
                            </div>
                           </div>
                        </div>
                        <div className = {`flex flex-col ${open ? "md:flex-col gap-y-4 lg:flex-row ": "md:flex-row "} mt-3  md:justify-between`}>
                            <div className = {`w-full   ${open ? "lg:w-5/15 ": "md:w-5/15 "} `}>
                                <h3 className = "font-sans font-medium text-lg text-[#0E0A2D]">Security</h3>
                            </div>
                            <div className = {`w-full flex flex-col gap-4  ${open ? "lg:w-9/15 ": " md:w-9/15"} `}>
                                <div className = "flex flex-col gap-2">
                                   <label htmlFor="" className = "font-sans font-medium text-sm text-[#111014]">Password*</label>
                                   <input type="password" name="" id="" className = "w-full bg-[#FFFFFF] border-1 border-[#959595]  focus:outline-none py-2 px-3 font-sans font-normal text-[0.97rem] text-[#878789] text rounded-[5px]" placeholder = "xxxxxxxxxx" {...register("Password")} disabled value = {profile.password  || ""}  /> 
                                </div>
                            </div>
                        </div>
                        <div className = {`flex flex-col ${open ? "md:flex-col gap-y-4 lg:flex-row ": "md:flex-row "} mt-3 md:justify-between`}>
                            <div className = {`w-full  pt-2  ${open ? "lg:w-5/15 ": "md:w-5/15 "} `}>
                               <h3 className = "font-sans font-medium text-lg text-[#0E0A2D]">Upload Photo</h3>
                            </div>
                            <div className = {`w-full flex flex-col gap-2  ${open ? "lg:w-9/15 ": " md:w-9/15"}  pt-3 `}>
                                <label htmlFor = "" className = "font-sans font-medium text-sm text-[#111014]">Profile pic*</label>
                                <img src= {profile.profileImage || profilepic} alt="profile-pic" className = " mt-1 rounded-full w-22 h-22"/>
                                <p className = "font-neural font-normal text-sm text-[#878789]">Your profile pic will be visible next to your name in your profile. Your image should be at least 200x200px and must be in JPG or PNG format. </p>
                               <div className = "flex gap-3 my-3">
                                  <button className = "w-full md:w-40 bg-white rounded-sm py-[6px] px-4 border-1 border-[#DB3E3E] hover:text-[#F3F2FB] hover:bg-[#DB3E3E] font-sans font-medium text-sm text-[#DB3E3E]">Cancel</button>
                                  <button className = "w-full md:w-40 bg-[#3439CA] rounded-sm py-[6px] px-4  font-sans font-medium text-sm text-[#F3F2FB]" type = "submit">Save Changes</button>
                              </div>
                            </div>
                        </div>
                    </div>
                  </form>
                </section>
            </main>
        </>
    )
}

export default Settings
