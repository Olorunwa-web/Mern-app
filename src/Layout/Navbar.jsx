import React from 'react'
import arrowDown from '../assets/arrowDown.svg'
import NotificationIcon from '../assets/Bell.svg'
import searchIcon from '../assets/searchIcon.svg'
import messageIcon from '../assets/messageIcon.svg'
import ladypic from '../assets/lady.svg'
import'../Style/Navbar.css'
import { useState } from 'react' 
import Offcanvas from '../Components/Offcanavas'
import {Link, Navigate} from 'react-router-dom'
import AuthContext from "../context/AuthContext"
import {useNavigate} from "react-router-dom";
import { useContext } from 'react';


const Navbar = () => {
    const [isTrue, setisTrue] = useState(false)
    const {user, setUser} = useContext(AuthContext)
    const navigate = useNavigate()

    function handleReveal(){
        isTrue ? setisTrue(false) : setisTrue(true)
    }
    
    
    return (
        <>
            {/* <nav className = "d-flex justify-content-between navbar-container ">
                <div className = "d-md-none">
                {['start'].map((placement, idx) => (
        <Offcanvas key={idx} placement={placement} name={placement} />
      ))}
                </div>
                <form className = "nav-form">
                    <input type="search" name="" id="" placeholder = "Search" className = "inputs"/>
                 </form>
                 <div className = "d-flex gap-4 align-items-center d-none d-md-flex">
                     <div>
                         <img src= {NotificationIcon} alt="notification-img" className = "note-icon d-none d-lg-block"/>
                     </div>
                     <div>
                         <img src= {messageIcon} alt="message-img" className = "message-icon d-none d-lg-block"/>
                     </div>
                     <div className = "d-flex nav-space gap-2 align-items-center">
                         <img src= {ladypic} alt="lady-pic" className = "lady-pic d-none d-md-block "/>
                         <div className = "d-none d-md-block ">
                              <span className = 'user-name'>{user && user.firstName}</span>
                         </div>
                     </div>
                 </div>
            </nav> */}
        </>
    )
}

export default Navbar
