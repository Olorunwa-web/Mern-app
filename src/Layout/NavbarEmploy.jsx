import React from 'react'
import arrowDown from '../assets/arrowDown.svg'
import NotificationIcon from '../assets/Bell.svg'
import searchIcon from '../assets/searchIcon.svg'
import messageIcon from '../assets/messageIcon.svg'
import ladypic from '../assets/Ellipse 2158.svg'
import '../Style/Navbar.css'
import { useState } from 'react' 
import OffcanvasEmploy from "../Components/OffcanvasEmploy"
import {Link} from 'react-router-dom'
import AuthContext from "../context/AuthContext"
import {useNavigate} from "react-router-dom"
import { useContext } from 'react'

const NavbarEmploy = () => {
    const {user, setUser} = useContext(AuthContext)
    const navigate = useNavigate()


    const logout = () => {
        localStorage.removeItem("hr-token");
        navigate("/auth/sign-in")
    };
    return (
        <>
             {/* <nav className = "d-flex justify-content-between navbar-container">
                <div className = "d-md-none">
                {['start'].map((placement, idx) => (
        <OffcanvasEmploy key={idx} placement={placement} name={placement} />
      ))}
                </div>
                <form className = "nav-form">
                    <input type="search" name="" id="" placeholder = "Search" className = "inputs"/>
                 </form>
                 <div className = "d-flex gap-4 align-items-center d-none d-md-flex">
                     <div>
                         <img src= {NotificationIcon} alt="notification-img" className = "d-none d-lg-block"/>
                     </div>
                     <div>
                         <img src= {messageIcon} alt="message-img" className = "d-none d-lg-block"/>
                     </div>
                     <div className = "d-flex gap-2 align-items-center">
                         <img src= {ladypic} alt="lady-pic" className = "d-none d-md-block "/>
                         <div className = "pt-">
                             <Dropdown className = "d-none d-lg-block dropdown">
                                 <Dropdown.Toggle variant="none" id="dropdown-basic" className = "heading-2">
                                 {user && user.firstName}
                                 </Dropdown.Toggle>
                             <Dropdown.Menu className = "w-25">
                               <Dropdown.Item href="#/action-1" className = "logout" onClick = {logout}>Logout</Dropdown.Item>
                             </Dropdown.Menu>
                           </Dropdown>
                         </div>
                     </div>
                 </div>
            </nav> */}
        </>
    )
}

export default NavbarEmploy
