import React from 'react'
import { useState} from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

// ====================================
import {sidebarLinkEmployee} from "../db"
import Hrlogo from '../assets/Frame 1000003286.svg';
import arrowup from '../assets/Vector.svg'
import arrowdown from '../assets/Vector (1).svg'
import{ NavLink} from 'react-router-dom'
import '../Style/AdminDashboard.css';
import menuimg from '../assets/menu_35dp_000000_FILL0_wght400_GRAD0_opsz40.svg'


const OffcanvasEmploy = ({ name, ...props }) => {


    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <main  className = "">
             <div  className = "hide" onClick={handleShow}>
               <img src= {menuimg} alt="menu-img" className = "menu-icon"/>
             </div>
      <Offcanvas show={show} onHide={handleClose} {...props} className = "w-75">
        <Offcanvas.Body>
         <section className = "admin-dashboard-section- py-3">
                         <div className = "d-flex justify-content-between align-items-center pb-2">
                           <div className = "d-flex gap-2">
                              <div>
                                 <img src= {Hrlogo} alt="hr-logo"/>
                              </div>
                              <div>
                                <div className = "hr-manager">
                                  <h1>HR Manager</h1>
                                  <p>hrmanager@yahoo.com</p>
                               </div>
                              </div>
                           </div>
                            <div className = "arrow">
                                <div>
                                   <img src= {arrowup} alt="" className = "arrow-up"/>
                                </div>
                                <div>
                                   <img src= {arrowdown} alt="" className = "arrow-down"/>
                                </div>
                            </div>
                         </div>

                         {/* ======================================= */}
                         <div className = "my-3">
                             <h3 className = "main pt-4">MAIN MENU</h3>
                             <div>
                                 {sidebarLinkEmployee.map((sidebarLinksemp)=>{
                                     const{id,path,Icon,name} = sidebarLinksemp
                                     return(
                                        
                                            <section key = {id} className =  "my-3  ">
                                                <NavLink className = {({isActive, isPending }) => isPending ? "pending" : isActive ? "active" : ""} to= {path} end className =  "d-flex gap-2 me-3 ps-2 ms-1 " >
                                                      <img src= {Icon} alt= {name} className = ""/>
                                                      <h6 className = "h6 pt-2">{name}</h6>
                                                </NavLink>
                                            </section>
                                     )
                                 })}
                             </div>
                         </div>
                    </section>
        </Offcanvas.Body>
      </Offcanvas>
            </main> 
        </>
    )
}

export default OffcanvasEmploy
