import React, {useEffect, useState , useContext} from 'react'
import {useNavigate} from "react-router-dom";
import {sidebarLink} from '../../db';
import Hrlogo from '../../assets/Frame 1000003286.svg';
import arrowup from '../../assets/Vector.svg';
import arrowdown from '../../assets/Vector (1).svg';
import{ NavLink, Outlet, useLocation } from 'react-router-dom';
import '../../Style/AdminDashboard.css';
import Navbar from '../../Layout/Navbar';
import AuthContext from "../../context/AuthContext";
import leftvisible from '../../assets/dock_to_left_20dp_ACACAC_FILL0_wght400_GRAD0_opsz20.svg';
import Logout from '../../assets/logout_20dp_ACACAC_FILL0_wght400_GRAD0_opsz20.svg';

const AdminDashboard = () => {
  const {user} = useContext(AuthContext)

  const [open, setOpen] = useState(true);
  // const [isOpen, setisOpen] = useState(true);

  const [isTrue, setisTrue] = useState(false)

  const [showWelcomeModal, setShowWelcomeModal] = useState(false);


  const navigate = useNavigate()

  const handleToggle = () => {
    setisOpen(close => !close); 
  };

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
                <section className = "admin-dashboard- flex min-h-screen w-full  ">
                    <aside className = {`fixed top-0 left- bg-white h-screen ${open ? "w-67 p-4 " : "w-17 px-3 py-4  "} transition-all duration-300 md:block hidden overflow-hidden border-r-1 border-[#EBEEF1] `}>
                      <div className = 'flex flex-col  gap-12 h-9/10 '>
                        <div className = {`flex items-center ${open ? 'justify-between' : 'justify-center'}  py-1`}>
                           <div className = {`flex gap-1 items-center ${open ? "block" : "hidden"}   `}>
                                <img src= {Hrlogo} className = 'w-[34px] h-[34px]' alt="hr-logo"/>
                                  <h1 className = ' font-medium font-san-sef text-[0.96rem] text-[#343536]'>HR Manager</h1>
                                  {/* <p className = 'mt-[-5px] font-normal font-sans text-xs text-[#ACACAC]'>{user && user?.email}</p> */}
                           </div>
                           <div   onClick = {()=> setOpen(!open)} >
                             {open ? (
                               <div className = 'w-[23px] h-[23px]'>
                                 <img src= {leftvisible} className = 'w-full h-full' alt=""/>
                               </div>
                               ) : (
                                 <div className = 'w-[38px] h-[38px] '>
                                   <img src= {Hrlogo} alt="" className = 'w-full h-full '/>
                                 </div>
                             )}
                            </div>
                         </div>
                         {/* ======================================= */}
                         <div className = "my-2 flex flex-col gap-5">
                             <h3 className = {`font-medium text-xs font-sans text-[#9A9FA5] ${open ? 'opacity-100' : 'opacity-0'}`}>MAIN MENU</h3>
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
                                             className={`flex gap-2 items-center  duration-300 ${open ? 'ps-4 mr-5': ""}  isPending ? "pending": ${isActive ? "active  bg-[#EDF5FF]  py-[6px] rounded-lg " : "" 
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
                      <div className = {`h-1/10  flex flex-col  ${open ? 'justify-around rounded-lg bg-[#F1F2F3]' : 'justify-center items-center'} `} onClick = {logout}>
                        {open ? (
                          <div className = {`flex items-center gap-1 ${open ? 'ps-4' : ''}`}>
                            <img src= {Logout} className = 'w-7 h-7' alt=""/>
                            <p className = 'font-sans font-normal text- text-[#343536]'>Logout</p>
                          </div>
                          ) : (
                            <div className = ' flex justify-center rounded-md bg-[#F1F2F3] p-1 mx-1 items-center'> 
                              <img src= {Logout} alt="" className = 'w-7 h-7'/>
                            </div>
                        )}
                      </div>
                    </aside>
                    {/* section-2 */}
                    <section className = {`admin-dashboard-section- max-w-full flex-1  border-red-400 ${open ? 'md:ml-67 ' : 'md:ml-17'}`}>
                        <Navbar/>
                        <Outlet/>
                    </section>
             </section>
        </>
    )
}

export default AdminDashboard
