import React from 'react'
import {sidebarLink} from '../../db';
import Hrlogo from '../../assets/Frame 1000003286.svg';
import arrowup from '../../assets/Vector.svg'
import arrowdown from '../../assets/Vector (1).svg'
import { Link } from 'react-router-dom';
import{ NavLink, Outlet } from 'react-router-dom'
import '../../Style/AdminDashboard.css'
import Navbar from '../../Layout/Navbar'


const AdminDashboard = () => {
    
    return (
        <>
            <main className = "container-fluid">
                <section className = "admin-dashboard-main">
                    <section className = "admin-dashboard-section-1 py-3">
                         <div className = "d-flex gap-2 pb-2">
                            <div>
                                 <img src= {Hrlogo} alt="hr-logo"/>
                            </div>
                            <div className = "d-flex justify-content-between gap-5 ">
                               <div className = "hr-manager">
                                 <h1>HR Manager</h1>
                                 <p>hrmanager@yahoo.com</p>
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
                        </div>

                         {/* ======================================= */}
                         <div className = "my-3">
                             <h3 className = "main pt-4">MAIN MENU</h3>
                             <div>
                                 {sidebarLink.map((sidebarLinks)=>{
                                     const{id,path,Icon,name} = sidebarLinks
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
                        <Navbar/>
                        <Outlet/>
                    </section>
                </section>
            </main>
        </>
    )
}

export default AdminDashboard
