import React, {useEffect, useState} from 'react'
import {sidebarLink} from '../../db';
import Hrlogo from '../../assets/Frame 1000003286.svg';
import arrowup from '../../assets/Vector.svg'
import arrowdown from '../../assets/Vector (1).svg'
import { Link } from 'react-router-dom';
import{ NavLink, Outlet, useLocation } from 'react-router-dom'
import '../../Style/AdminDashboard.css'
import Navbar from '../../Layout/Navbar'
import AuthContext from "../../context/AuthContext"
import { useContext } from 'react';
import Logout from "../../assets/logout_22dp_EA3323_FILL0_wght400_GRAD0_opsz24.svg";
import leftvisible from '../../assets/dock_to_left_20dp_ACACAC_FILL0_wght400_GRAD0_opsz20.svg';
import logout from '../../assets/logout_22dp_808080_FILL0_wght400_GRAD0_opsz24.svg'

const AdminDashboard = () => {
  const {user} = useContext(AuthContext)

  const [open, setOpen] = useState(true);
  const [isOpen, setisOpen] = useState(true);

  const handleToggle = () => {
    setisOpen(close => !close); // toggle open/close
  };
  
  const location = useLocation();
  useEffect(()=> {
    window.scrollTo(0,0);
  }, [location]);
    return (
        <>
            <main className = "container-flui borderss">
                <section className = "admin-dashboard-main ">
                    <section className = {`admin-dashboard-section-1 py-3 ${isOpen ? 'open ps-3' : "closed"}`}>
                      <div className = 'd-flex flex-column spacings'>
                      <div className = {`${isOpen ? "": "d-flex justify-content-center align-items-center"}`}>
                        <div className = "d-flex justify-content-between align-items-center ">
                           <div className = "d-flex gap-2 ">
                              <div className = {`hr-logo ${isOpen ? "" : " "}`} onClick = {handleToggle}>
                                 <img src= {Hrlogo} className = {` ${isOpen ? "" : "burn "}`}  alt="hr-logo"/>
                              </div>
                                <div className = {`hr-manager  ${isOpen ? "d-block" : "d-none"}`}>
                                  <h1>HR Manager</h1>
                                  <p>{user && user?.email}</p>
                               </div>
                           </div>
                            
                           <div  className = {`visible-left  ${isOpen ? "d-block visible-left" : "d-none"}`} onClick = {handleToggle}>
                              <img src= {leftvisible} alt=""/>
                            </div>
                         </div>
                      </div>
                         {/* ======================================= */}
                         <div className = "my-3">
                             <h3 className = {` main mb-4  ${isOpen ? "d-block" : "invisible pt-4"}`}>MAIN MENU</h3>
                             <div className = {`${isOpen ? "" : "d-flex justify-content-center m align-items-center "}`}>
                             <div className = {`sidebar me- d-flex flex-column ${isOpen ? "gap-2 me-3" : "gap-3  "}`}>
                                 {sidebarLink.map((sidebarLinks)=>{
                                     const {id,path,Icon,name, active} = sidebarLinks
                                     return(
                                        <NavLink  
                                        key={id} 
                                        to={path}
                                        end>
                                        {({ isActive, isPending }) =>(
                                          <span
                                             className={`d-flex gap-2  nav-link isPending ? "pending": ${isActive ? "active  " : "" 
                                          }`}>
                                          <img className={` ${isOpen ? "d-block images-active mt-1" : "images-actives my-1"}`} src={ isActive ?  active : Icon} alt={name}  />
                                          <h6 className={`mt-2 heading ${isOpen ? "d-block" : "d-none"}`}>{name}</h6>
                                        </span>
                                        )}
                                     </NavLink>
                                     )
                                  })}
                             </div>
                             </div>
                         </div>
                      </div>
                      <div>
                        {isOpen ? (
                          <button className = 'logout-btn py-1 d-flex gap-1 justify-content-center'><img src= {logout} className = 'logout-img' alt=""/>Logout</button>
                          ) : (
                            <div className = 'd-flex justify-content-center align-items-center mx-4'> 
                              <img src= {logout} alt=""/>
                            </div>
                        )}
                      </div>
                    </section>
                    {/* section-2 */}
                    <section className = {`admin-dashboard-section-2 ${isOpen ? 'is-open' : 'is-closed'}` }>
                        <Navbar/>
                        <Outlet/>
                    </section>
                </section>
            </main>
        </>
    )
}

export default AdminDashboard
