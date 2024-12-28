import React,{useContext, useEffect} from 'react'
import {sidebarLinkEmployee} from "../../db"
import Hrlogo from "../../assets/Frame 1000003286.svg"
import arrowup from '../../assets/Vector.svg'
import arrowdown from '../../assets/Vector (1).svg'
import{ NavLink, Outlet, useLocation } from 'react-router-dom'
import "../../Style/AdminDashboard.css"
import NavbarEmploy from "../../Layout/NavbarEmploy"
import Navbar from "../../Layout/Navbar"
import AuthContext from "../../context/AuthContext"





const EmployeeDashboard = () => {
  const {user} = useContext(AuthContext)
  
  const location = useLocation();
  useEffect(()=> {
    window.scrollTo(0,0);
  }, [location]);
    return (
        <>
             <main className = "container-fluid">
                <section className = "admin-dashboard-main">
                    <section className = "admin-dashboard-section-1 py-3">
                         <div className = "d-flex justify-content-between align-items-center pb-2">
                           <div className = "d-flex gap-2">
                            <div>
                                 <img src= {Hrlogo} alt="hr-logo"/>
                            </div>
                            <div>
                               <div className = "hr-manager">
                                 <h1>HR Manager</h1>
                                 <p>{user && user?.email}</p>
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
                                        <NavLink  key={id} to={path}
                      end>
                      {({ isActive, isPending }) =>(
                        <span
                          className={`d-flex gap-2 me-4 ps-2 ms- mb-3  isPending ? "pending": ${isActive ?"active" : "" 

                          }`}
                        > <img src={Icon} alt={name} />
                        <h6 className="pt-2 heading">{name}</h6>
                        </span>
                       
                      )}
                    </NavLink>
                                     )
                                 })}
                             </div>
                         </div>
                    </section>
                    {/* section-2 */}
                    <section className = "admin-dashboard-section-2">
                        <NavbarEmploy/>
                        <Outlet/>
                    </section>
                </section>
            </main>
        </>
    )
}

export default EmployeeDashboard
