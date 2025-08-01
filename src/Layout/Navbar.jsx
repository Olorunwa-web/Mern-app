import React from 'react'
import NotificationIcon from '../assets/Bell.svg'
import messageIcon from '../assets/messageIcon.svg'
import ladypic from '../assets/lady.svg'
import'../Style/Navbar.css'
import { useState } from 'react';
import {Link, Navigate} from 'react-router-dom';
import AuthContext from "../context/AuthContext";
import {useNavigate , NavLink} from "react-router-dom";
import { useContext, useEffect, useRef } from 'react';
import  menu from '../assets/Menu Button.svg';
import close from '../assets/close_20dp_B2B2B2_FILL0_wght400_GRAD0_opsz20.svg';
import searchbtn from '../assets/searchIcon.svg';
import closemenu from '../assets/close_32dp_000000_FILL0_wght400_GRAD0_opsz40.svg'
import Hrlogo from '../assets/Frame 1000003286.svg';
import handwave from '../assets/waving-hand-svgrepo-com.svg';
import Logout from '../assets/logout_20dp_ACACAC_FILL0_wght400_GRAD0_opsz20.svg';
import {sidebarLink} from '../db';
import 'simplebar-react/dist/simplebar.min.css';
import SimpleBar from 'simplebar-react';
import axios from "axios";




const Navbar = () => {
    const [isTrue, setisTrue] = useState(false)
    const {user, setUser} = useContext(AuthContext)
    const navigate = useNavigate()

    const [isOpen, setIsOpen] = useState(false);
    const sidebarRef = useRef();

    const [show, setShow] = useState(false);


    const [searchText, setSearchText] = useState("");

    const [profile, setProfile] = useState({});
    const token = localStorage.getItem("hr-token")

    function handleReveal(){
        isTrue ? setisTrue(false) : setisTrue(true)
    }

    const logout = () => {
        localStorage.removeItem("hr-token");
        navigate("/auth/sign-in")
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
          if (
            sidebarRef.current &&
            !sidebarRef.current.contains(event.target)
          ) {
            setIsOpen(false);
            setShow(false);
          }
        };
    
        if (isOpen, show) {
          document.addEventListener("mousedown", handleClickOutside);
        } else {
          document.removeEventListener("mousedown", handleClickOutside);
        }
    
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [isOpen, show]);
    
      

      const handleClear = () => {
        setSearchText("");
      };

      
    
      const toggleBox = () => setShow(prev => !prev);


 
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
      

    return (
        <>
            <nav className = "sticky top-0 left-0 z-40 mt-1 bg-white border-b-1 border-[#F1F1F1]  navbar-contai ">
                <div className = ' flex justify-between  items-center px-3 md:px-0 lg:px-0 w-19/20 mx-auto max-w-full py-3 md:py-3 '>
                <div className = 'flex items-center gap-1 hidden lg:flex'>
                    <img src= {handwave} className = 'w-6 h-6' alt=""/>
                    <div>
                        <span className = 'font-sans font-medium text-[#161E54] text-lg'>Welcome Back, <span className = 'font-sans font-medium text-[#161E54] text-lg'>{user && user?.firstName?.charAt(0).toUpperCase() + user.firstName.slice(1) }</span></span>
                    </div>
                </div>
                <div className = "flex md:hidden">
                    <div onClick={() => setIsOpen(true)} className = 'w-full h-full '>
                       <img src= {menu}  alt=""  className = 'w-11 h-11 transform  scale-y-[-1] transition-all duration-300 ' />
                    </div>
                    {isOpen && (
                       <div className="fixed inset-0 z-40 transition-opacity duration-200"></div>
                     )}
                     <div
                      ref = {sidebarRef}
                      className={`fixed top-0 left-0 min-h-screen  overflow-y-auto border-l-1 border-[#F1F1F1] w-[80%] bg-white z-50 transform transition-transform duration-200 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
                        <SimpleBar style={{ maxHeight: '100vh'}}>
                         <div className = 'py-4 h-full flex flex-col justify-between gap-10 '>
                             <div className = 'flex flex-col gap-8'>
                              <div className = 'flex flex-col z-999 bg-white sticky top-0 gap-3'>
                               <div className = 'border-b-1 border-[#EBEEF1]  pb-3'>
                                  <div className = 'flex justify-between items-center px-4 '>
                                    <div className = 'flex gap-1 items-center '>
                                       <img src= {Hrlogo} className = 'w-[35px] h-[35px]' alt="hr-logo"/>
                                       <h1 className = 'mt-[-1px] font-medium font-san-sef text-base text-[#343536]'>HR Manager</h1>
                                   </div>
                                    <div onClick={() => setIsOpen(false)}>
                                       <img src= {closemenu} className = 'w-6 h-6' alt=""/>
                                   </div>
                                </div>
                             </div>
                             <form className = "relative px-4">
                               <input type="search" name="" id="" value = {searchText} onChange={(e) => setSearchText(e.target.value)} placeholder = "Search" className = "w-full bg-[#F7F9FA] border-1 border-[#E0E0E0] py-2 pl-3 pr-8 rounded-lg outline-none appearance-none font-poppins font-normal text-base "/>
                                 {!searchText && (
                                   <div className = 'absolute right-7 top-1/2 transform -translate-y-1/2 w-5 h-5'>
                                      <img src= {searchbtn} alt=""/>
                                   </div>
                                 )}
                                {searchText && (
                                   <div onClick = {handleClear} className = 'absolute right-6 top-1/2 transform -translate-y-1/2'>
                                     <img src= {close} alt=""/>
                                  </div>
                               )}
                            </form>
                           </div>
                           <div className = "px-4 my-2 flex flex-col gap-5">
                             <h3 className = 'font-medium text-xs font-sans text-[#9A9FA5]'>MAIN MENU</h3>
                               <div className = {`flex flex-col gap-[1.4rem]`}>
                                 {sidebarLink.map((sidebarLinks)=>{
                                     const {id,path,Icon,name, active} = sidebarLinks
                                     return(
                                        <NavLink   
                                        key={id} 
                                        to={path}
                                        end 
                                        onClick={() => setIsOpen(false)}
                                        >
                                        {({ isActive, isPending }) =>(
                                          <span
                                             className={`flex gap-2 items-center m duration-300  ps-4 mr-7  isPending ? "pending": ${isActive ? "active  bg-[#EDF5FF]  py-2 rounded-lg " : "" 
                                          }`}>
                                          <img className= 'w-6 h-6' src={ isActive ?  active : Icon} alt={name}  />
                                          <h6 className=  {`font-medium font-sans text-[0.92rem] hover:text-[#3439CA] ${ isActive ? "text-[#3439CA]" : "text-[#343536]"}`}>{name}</h6>
                                        </span>
                                        )}
                                     </NavLink>
                                     )
                                  })}
                               </div>
                            </div>
                         </div>
                         {/*  */}
                         <div className = 'px-4 bg-[#F1F2F3] py-4 overflow-y-auto' >
                          <div className = {`flex flex-col h-full gap-6 `}>
                             <div  className = {` flex items-center`}>
                               <div onClick = {logout} className = 'cursor-pointer ps-5  flex items-center gap-1'>
                                 <img src= {Logout} className = 'w-6 h-6' alt=""/>
                                 <p className = 'font-sans font-normal text-base text-[#8C8C8C]'>Logout</p>
                               </div>
                             </div>
                             <div className = ''>
                             <div className = 'flex gap-2 items-center h bg-white border-1 border-[#E0E0E0] rounded-2xl py-2 px-2'>
                               <div className = " w-7 h-7 hover:border-3 hover:border-[#78808A] md:w-7 md:h-7 flex justify-center bg-[#3439CA] rounded-full items-center ">
                                 <span className = 'font-sans text-white font-medium text-xs'>{user && user?.email?.slice(0,2).toUpperCase()}</span>
                               </div>
                               <div className = 'flex flex-col gap-[3px]'>
                                 <div className = ' mb-[-3px]'>
                                   <span className = 'font-sans font-medium text-[#161E54] text-[0.94rem]'>{user && user?.firstName?.charAt(0).toUpperCase() + user?.firstName?.slice(1) }</span>
                                   {/* <span className = 'font-sans font-medium text-[#161E54] text-[0.94rem]'>{user && user?.lastName?.charAt(0).toUpperCase() + user?.lastName?.slice(1) }</span> */}
                                 </div>
                                 <p className = 'mt-[-5px] font-normal font-sans text-xs text-[#ACACAC]'>{user && user?.email}</p>
                               </div>
                              </div>
                             </div>
                           </div>
                         </div>
                         </div>

                        </SimpleBar>
                     </div>
                   
                </div>
                <form className = "relative md:block hidden">
                    <input type="search" name="" id="" value = {searchText} onChange={(e) => setSearchText(e.target.value)} placeholder = "Search" className = "w-ful xl:w-[320px] bg-[#F7F9FA] border-1 border-[#E0E0E0] py-1 pr-4 pl-4 xl:pr-8 xl:pl-5 rounded-sm outline-none appearance-none font-poppins font-normal text-base "/>
                    {!searchText && (
                      <div className = 'absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5'>
                        <img src= {searchbtn} alt=""/>
                     </div>
                    )}
                    {searchText && (
                        <div onClick = {handleClear} className = 'absolute right-3 top-1/2 transform -translate-y-1/2'>
                            <img src= {close} alt=""/>
                        </div>
                    )}
                </form>
                 <div className = "flex gap-4 items-center ">
                     <div className = 'flex gap-4 bg-[#F7F9FA] py-[3px] px-[7px] border-1 border-[#E0E0E0]  rounded-full'>
                       <div className = ' hidde md:bloc '>
                          <img src= {NotificationIcon} alt="notification-img" className = "w-6 h-6 md:w-5 md:w-5"/>
                       </div>
                        <div className = ' hidde md:bloc '>
                          <img src= {messageIcon} alt="message-img" className = "w-6 h-6 md:w-5 md:w-5"/>
                        </div>
                     </div>
                     <div className = "flex gap-2 group relative px- rel items-center">
                         {/* <div className = " w-8 h-8 hover:border-3 hover:border-[#78808A] md:w-9 md:h-9 flex justify-center bg-[#3439CA] rounded-full items-center ">
                             <span className = 'font-sans text-white font-normal text-sm'>{user && user?.email.slice(0,2).toUpperCase()}</span>
                         </div> */}
                         <div onClick = {toggleBox} className = " w-full cursor-pointer  h-full" >
                            <img src= {profile.profileImage || ladypic} alt="lady-pic" className = " w-10 h-10  md:w-9 md:h-9 rounded-full" />
                         </div>
                            <div className = 'w-2 h-2 p-1 border-2 border-white absolute right-0 bottom-0 bg-[#61ca53] rounded-full'></div>
                            {(show || false )&& (
                              <div className =  {`${show ? "block lg:hidden": "hidden"} group-hover:block lg:hidden block absolute w-40 bg-white top-11 right-0 border-1 border-[#F1F2F3] rounded-md`}>
                                <div className = 'p-3 flex  items-center gap-2'>
                                  <div className = 'relative borde'>
                                    <div className = 'w-full flex relative h-full'>
                                       <img src= {profile.profileImage || ladypic} alt="lady-pic" className = " w-9 h-9  md:w-9 md:h-9 rounded-full" />
                                    </div>
                                    <div className = 'w-2 h-2 p-1 border-2 border-white absolute left-8 top-7 transform -translate-x-1/2 -translate-y-1/2 bg-[#61ca53] rounded-full'></div>
                                  </div>
                                  <div className = 'flex flex-col'>
                                    <div className = 'flex flex-col  '>
                                      <span className = 'font-sans font-medium text-[#161E54] text-[0.97rem] '>{user && user?.firstName?.charAt(0).toUpperCase() + user.firstName?.slice(1) }</span>
                                      <p className = 'mt-[-4px] font-normal font-sans text-sm text-[#78808A]'>{user && user.role}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                         {/* <div className = 'flex flex-col lg:flex hidden'>
                             <div className = 'flex gap-1 mb-[-3px]'>
                                <span className = 'font-sans font-medium text-[#161E54] text-[0.94rem]'>{user && user?.firstName?.charAt(0).toUpperCase() + user.firstName?.slice(1) }</span>
                                <span className = 'font-sans font-medium text-[#161E54] text-[0.94rem]'>{user && user?.lastName?.charAt(0).toUpperCase() + user.lastName?.slice(1)}</span>
                             </div>
                             <div className = 'mt-[-4px]'>
                                <span className = 'font-normal font-sans text-sm text-[#78808A]'>{user && user.role}</span>
                             </div>
                         </div> */}
                     </div>
                 </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
