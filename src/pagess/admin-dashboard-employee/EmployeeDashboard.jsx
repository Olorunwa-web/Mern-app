import React,{useContext, useEffect} from 'react'
import { sidebarLinkEmployee } from "../../db"
import Hrlogo from "../../assets/Frame 1000003286.svg"
import arrowup from '../../assets/Vector.svg'
import arrowdown from '../../assets/Vector (1).svg'
import{ NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import "../../Style/AdminDashboard.css"
import NavbarEmploy from "../../Layout/NavbarEmploy"
import Navbar from "../../Layout/Navbar"
import AuthContext from "../../context/AuthContext";
import leftvisible from '../../assets/dock_to_left_20dp_ACACAC_FILL0_wght400_GRAD0_opsz20.svg';
import Logout from '../../assets/logout-04-stroke-rounded.svg';
import 'simplebar-react/dist/simplebar.min.css';
import SimpleBar from 'simplebar-react';
import OpenContext from '../../context/OpenContext';
import { useAuth } from '../../context/AuthContext'





const EmployeeDashboard = () => {
  const {user} = useAuth()

  const { open, setOpen } = useContext(OpenContext);

  const navigate = useNavigate()

   // logout
   const logout = () => {
    localStorage.removeItem("hr-token");
    navigate("/auth/sign-in")
};

  
  const location = useLocation();
  useEffect(()=> {
    window.scrollTo(0,0);
  }, [location]);
    return (
        <>
                <section className = "flex  min-h-screen">
                <section className = {`fixed top-0  h-full  overflow-y-auto bg-white min-h-scree ${open ? "lg:w-67 md:w-64 p-4 flex  " : "w-17 px-3 py-4  "} transition-all duration-300 md:block hidden overflow-hidden border-r-1 border-[#EBEEF1] `}>
                      <div className = 'flex flex-col justify-between h-full'>
                      <div className = 'flex flex-col  gap-12  '>
                        <div className = {`flex items-center  bg-white z-999 sticky top-0 ${open ? 'justify-between' : 'justify-center'}  py-1`}>
                           <div className = {`flex gap-1 items-center  ${open ? "block" : "hidden"}   `}>
                                <img src= {Hrlogo} className = 'w-[34px] h-[34px]' alt="hr-logo"/>
                                  <h1 className = ' font-medium font-san-sef text-[0.96rem] text-[#343536]'>HR Manager</h1>
                                  {/* <p className = 'mt-[-5px] font-normal font-sans text-xs text-[#ACACAC]'>{user && user?.email}</p> */}
                           </div>
                           <div   onClick = {()=> setOpen(!open)} >
                             {open ? (
                               <div className = 'cursor-pointer w-[23px] h-[23px]'>
                                 <img src= {leftvisible} className = 'w-full h-full' alt=""/>
                               </div>
                               ) : (
                                 <div className = 'cursor-pointer w-[38px] h-[38px] '>
                                   <img src= {Hrlogo} alt="" className = 'w-full h-full '/>
                                 </div>
                             )}
                            </div>
                         </div>
                         {/* ======================================= */}
                         <div className = "my-2 flex flex-col gap-5">
                             <h3 className = {`font-medium text-xs font-sans text-[#9A9FA5] ${open ? 'opacity-100' : 'opacity-0'}`}>MAIN MENU</h3>
                               <div className = {`flex flex-col gap-5`}>
                                 {sidebarLinkEmployee.map((sidebarLinks)=>{
                                     const {id,path,Icon,name, active} = sidebarLinks
                                     return(
                                        <NavLink   
                                        key={id} 
                                        to={path}
                                        end 
                                        >
                                        {({ isActive, isPending }) =>(
                                          <span
                                             className={`flex gap-2 items-center  duration-300 ${open ? 'ps-3 mr-5': ""}  isPending ? "pending": ${isActive ? "active  bg-[#EDF5FF]  py-[6px] rounded-lg " : "" 
                                          }`}>
                                          <img className= {`${open ? 'w-[22px] h-[22px]' : "w-[31px] h-[31px] p-1 mx-auto"}`} src={ isActive ?  active : Icon} alt={name}  />
                                          <h6 className=  {`font-medium font-sans text-sm hover:text-[#3439CA] ${open ? "block" : "hidden"} ${ isActive ? "text-[#3439CA]" : "text-[#343536]"}`}>{name}</h6>
                                        </span>
                                        )}
                                     </NavLink>
                                     )
                                  })}
                             </div>
                         </div>
                      </div>
                      <div className = {`flex flex-col  ${open ? 'justify-start items-cente rounded-lg bg-[#F1F2F3 lg:pY- md:py' : 'justify-center items-center'} `} >
                        {open ? (
                          <div className = {`flex flex-col gap-5 h-full justify-between `}>
                             <div  className = {` flex items-center  ${open ? '' : ''}`}>
                               <div onClick = {logout} className = 'cursor-pointer bg-[#DCDCDC] rounded-xl p-2 flex items-center gap-1'>
                                 <img src= {Logout} className = 'w-4 h-4' alt=""/>
                                 <p className = 'font-sans font-normal text-sm text-[#696969]'>Logout</p>
                               </div>
                             </div>
                             <div className = ' flex justify-start items-end'>
                             <div className = 'flex gap-2 w-full items-center h bg-white border-1 border-[#E0E0E0] rounded-xl py-2 px-3'>
                               <div className = " w-7 h-7 hover:border-3 hover:border-[#78808A] md:w-8 md:h-8 flex justify-center bg-[#3439CA] rounded-full items-center ">
                                 <span className = 'font-sans text-white font-medium text-xs'>{user && user?.email?.slice(0,2).toUpperCase()}</span>
                               </div>
                               <div className = 'flex flex-col gap-[3px]'>
                                 <div className = ' flex gap-1 mb-[-1px]'>
                                   <span className = 'font-sans font-medium text-[#161E54] text-[0.94rem]'>{user && user?.firstName?.charAt(0).toUpperCase() + user?.firstName?.slice(1) }</span>
                                   <span className = 'font-sans font-medium text-[#161E54] text-[0.94rem]'>{user && user?.lastName?.charAt(0).toUpperCase() + user?.lastName?.slice(1) }</span>
                                 </div>
                                 <p className = 'mt-[-5px] font-normal font-sans text-xs text-[#78808A]'>{user && user.role}</p>
                                 {/* <p className = 'mt-[-5px] font-normal font-sans text-xs text-[#ACACAC]'>{user && user?.email}</p> */}
                               </div>
                              </div>
                             </div>
                           </div>
                          
                          ) : (
                            <div className = 'flex flex-col gap-4 justify-center items-center mb-2'>
                              <div onClick = {logout} className = ' flex justify-center rounded-md bg-[#F1F2F3] p-2 mx-1 items-center'> 
                                <img src= {Logout} alt="" className = 'w-5 h-5'/>
                              </div>
                              <div className = " w-7 h-7 hover:border-3 hover:border-[#78808A] md:w-8 md:h-8 flex justify-center bg-[#3439CA] rounded-full items-center ">
                                <span className = 'font-sans text-white font-medium text-xs'>{user && user?.email?.slice(0,2).toUpperCase()}</span>
                              </div>
                             </div>
                        )}
                      </div>
                      </div>
                    </section>
                   
                    {/* section-2 */}
                    <section className = {`admin-dashboard-section- max-w-full flex-1  ${open ? 'md:ml-64 lg:ml-67  ' : 'md:ml-17'}`}>
                        <NavbarEmploy/>
                        <Outlet/>
                    </section>
                </section>
        </>
    )
}

export default EmployeeDashboard
