import React from 'react'
import arrowDown from '../assets/arrowDown.svg'
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
import {sidebarLink} from '../db';




const Navbar = () => {
    const [isTrue, setisTrue] = useState(false)
    const {user, setUser} = useContext(AuthContext)
    const navigate = useNavigate()

    const [isOpen, setIsOpen] = useState(false);
    const sidebarRef = useRef();

    const [searchText, setSearchText] = useState("");


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
          }
        };
    
        if (isOpen) {
          document.addEventListener("mousedown", handleClickOutside);
        } else {
          document.removeEventListener("mousedown", handleClickOutside);
        }
    
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [isOpen]);
    
      const handleLinkClick = () => {
        setIsOpen(false);
      };


      const handleClear = () => {
        setSearchText("");
      };
      

    return (
        <>
            <nav className = "sticky w-full top-0 z-999 mt-1 border-b-1 border-[#F1F1F1]  navbar-contai ">
                <div className = ' flex justify-between items-center px-4 md:px-[2rem] py-3 md:py-3 '>
                <div className = "flex md:hidden">
                    <div onClick={() => setIsOpen(true)} className = 'w-full h-full'>
                       <img src= {menu}  alt=""  className = 'w-9 h-9 transform  scale-y-[-1] transition-all duration-300 ' />
                    </div>
                    {isOpen && (
                       <div className="fixed inset-0 z-40 transition-opacity duration-200"></div>
                     )}
                     <div
                      ref = {sidebarRef}
                      className={`fixed top-0 right-0 min-h-screen border-l-1 border-[#F1F1F1] w-[80%] bg-white z-50 transform transition-transform duration-200 ${isOpen ? "-translate-x-0" : "translate-x-full"}`}>
                         <div className = 'py-4 '>
                             <div className = 'flex flex-col gap-8'>
                              <div className = 'flex flex-col gap-3'>
                               <div className = 'border-b-1 border-[#EBEEF1] pb-3'>
                                  <div className = 'flex justify-between items-center px-4 '>
                                    <div className = 'flex gap-1 '>
                                       <div className = 'w-full h-full'>
                                          <img src= {Hrlogo} className = 'w-[34px] h-[34px]' alt="hr-logo"/>
                                      </div>
                                      <div>
                                         <h1 className = 'mt-[-1px] font-medium font-san-sef text-[0.93rem] text-[#343536]'>HR Manager</h1>
                                         <p className = 'mt-[-5px] font-normal font-sans text-xs text-[#ACACAC]'>{user && user?.email}</p>
                                      </div>
                                   </div>
                                    <div onClick={() => setIsOpen(false)}>
                                       <img src= {closemenu} className = 'w-6 h-6' alt=""/>
                                   </div>
                                </div>
                             </div>
                             <form className = "relative px-4">
                               <input type="search" name="" id="" value = {searchText} onChange={(e) => setSearchText(e.target.value)} placeholder = "Search" className = "w-full bg-[#F7F9FA] border-1 border-[#E0E0E0] py-2 pl-3 pr-8 rounded-lg outline-none appearance-none font-poppins font-normal text-sm "/>
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
                               <div className = {`flex flex-col gap-5`}>
                                 {sidebarLink.map((sidebarLinks)=>{
                                     const {id,path,Icon,name, active} = sidebarLinks
                                     return(
                                        <NavLink   
                                        key={id} 
                                        to={path}
                                        end 
                                        >
                                        {({ isActive, isPending }) =>(
                                          <span
                                             className={`flex gap-2 items-center m duration-300  ps-4 mr-7  isPending ? "pending": ${isActive ? "active  bg-[#EDF5FF]  py-[6px] rounded-lg " : "" 
                                          }`}>
                                          <img className= 'w-5 h-5'  src={ isActive ?  active : Icon} alt={name}  />
                                          <h6 className=  {`font-medium font-sans text-sm hover:text-[#3439CA] ${ isActive ? "text-[#3439CA]" : "text-[#343536]"}`}>{name}</h6>
                                        </span>
                                        )}
                                     </NavLink>
                                     )
                                  })}
                             </div>
                         </div>

                             </div>

                         </div>
                     </div>
                   
                </div>
                <form className = "relative md:block hidden">
                    <input type="search" name="" id="" value = {searchText} onChange={(e) => setSearchText(e.target.value)} placeholder = "Search" className = "w-full bg-[#F7F9FA] border-1 border-[#E0E0E0] py-2 px-4 rounded-sm outline-none appearance-none font-poppins font-normal text-sm "/>
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
                     <div className = 'w-5 h-5 '>
                         <img src= {NotificationIcon} alt="notification-img" className = "note-icon d-none d-lg-block"/>
                     </div>
                     <div className = 'w-5 h-5 '>
                         <img src= {messageIcon} alt="message-img" className = "message-icon d-none d-lg-block"/>
                     </div>
                     <div className = "flex gap-2  items-center">
                         <img src= {ladypic} alt="lady-pic" className = " w-8 h-8 md:w-9 md:h-9 "/>
                         <div className = " ">
                              <span className = 'font-sans font-medium text-[0.94rem]'>{user && user.firstName}</span>
                         </div>
                     </div>
                 </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
