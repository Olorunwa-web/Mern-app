import React from 'react'
import { useState} from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

// ====================================
import {sidebarLinkEmployee} from "../db"
import Hrlogo from '../assets/Frame 1000003286.svg';
import arrowup from '../assets/Vector.svg'
import arrowdown from '../assets/Vector (1).svg'
import{ NavLink , useNavigate} from 'react-router-dom'
import '../Style/AdminDashboard.css';
import menuimg from '../assets/menu_35dp_000000_FILL0_wght400_GRAD0_opsz40.svg'
import Logout from "../assets/logout_22dp_EA3323_FILL0_wght400_GRAD0_opsz24.svg";


const OffcanvasEmploy = ({ name, ...props }) => {


    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const navigate = useNavigate()


   const logout = () => {
    localStorage.removeItem("hr-token");
    navigate("/auth/sign-in")
};

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
                             <div className = "d-flex  flex-column  gap-4 ">
                             <div className = "sidebar">
                                 {sidebarLinkEmployee.map((sidebarLinksemp)=>{
                                     const{id,path,Icon,name} = sidebarLinksemp
                                     return(
                                        <NavLink  key={id} to={path}
                      end>
                      {({ isActive, isPending }) =>(
                        <span
                          className={`d-flex gap-2 me-4 ps-2 ms- mb-3  isPending ? "pending": ${isActive ? "active" : "" 

                          }`}
                        > <img src={Icon} alt={name} />
                        <h6 className="pt-2 heading">{name}</h6>
                        </span>
                       
                      )}
                    </NavLink>
                                     )
                                 })}
                             </div>
                          <div className = "d-flex gap-1 align-items-center  space-pad" onClick = {logout}>
                             <img src= {Logout} alt=""/>
                             <h5 className = "log-out" >Logout</h5>
                         </div>
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
