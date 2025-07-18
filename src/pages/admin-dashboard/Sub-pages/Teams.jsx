import React from 'react'
import '../../../Style/Team.css'
import {Link, NavLink, Outlet } from 'react-router-dom'
import { useMatch } from "react-router-dom"
import { useState, useEffect, useRef } from 'react'
import temilade from '../../../assets/Frame 23.svg'
import axios from "axios"
import arrowRightImg from "../../../assets/Stockholm-icons (1).svg";
import "../../../Style/newteamstyle.css"
import NewTeam from "../Sub-pages/NewTeam"
import OpenContext from '../../../context/OpenContext'
import { useContext } from 'react'
import 'simplebar-react/dist/simplebar.min.css';
import SimpleBar from 'simplebar-react';
import cancel from '../../../assets/Stockholm-icons (11).svg';

  

const Teams = () => {
    const match = useMatch("/admin-dashboard/employees/teams")

    const [selectedTeam , setselectedTeam] = useState(null)
    const [selectedDept, setSelectedDept] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const modalRef = useRef();

    
    const { open } = useContext(OpenContext)

    
    const [modalShow12, setModalShow12] = React.useState(false);


    const [dept, setDept] = useState([])
    const token = localStorage.getItem("hr-token");

    useEffect(() => {
      function handleClickOutside(event) {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
          setShowModal(false);
        }
      }
  
      if (showModal) {
        document.addEventListener("mousedown", handleClickOutside);
      } else {
        document.removeEventListener("mousedown", handleClickOutside);
      }
  
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [showModal]);


    
    const getDepts = async () => {
      try {
        const req = await axios.get(
          "https://mern-backend-1-9jn6.onrender.com/api/department/all-departments",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(req.data.departments);
        setDept(req.data.departments);
      } catch (error) {
        console.log(error);
      }
    };
  
    
    useEffect(() => {
      getDepts();
    }, []);
    
    const getDeptById = async (id) => {
      try {
        const res = await axios.get(`https://mern-backend-1-9jn6.onrender.com/api/department/departments/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSelectedDept(res.data.department);
        setShowModal(true); 
        console.log(res.data.department);
        
      } catch (error) {
        console.log(error);
      }
    };


    const OpenModal = () => {
      setShowModal(true);
      getDeptById(dept._id)
    };
    
    

    return (
        <>
            <main className = "b ">
                {match ? (
                     <section className = "">
                     <div className = "flex flex-col gap-1">
                         <h1 className = 'font-sans font-medium text-xl text-[#161E54]'>Employee</h1>
                         <h4 className = 'font-sans font-medium text-base text-[#404040]'>Dashboard/Employee</h4>
                     </div>
                     <div className = 'flex justify-between items-center pb-2 border-b-2 border-[#F3F3F3] line my-7'>
                      <div className = "flex gap-4 ">
                        <NavLink
                          to = "/admin-dashboard/employees"
                          className = ""
                          end>
                          {({ isActive}) =>(
                          <span
                            className={` font-sans font-medium text-[0.97rem] pb-4   ${isActive ? "is-Active text-[#111014] border-b-2 border-[#6D5DD3]" : "text-[#878789]" 
                             }`}> 
                              All Employees
                           </span>
                           )}
                         </NavLink>

                          <NavLink
                            to = "/admin-dashboard/employees/teams"
                            className = ""
                            end>
                            {({ isActive}) =>(
                              <span
                                 className={`font-sans font-medium text-[0.97rem] pb-4  ${isActive ? "is-Active text-[#111014] border-b-2 border-[#6D5DD3] " : "text-[#878789]" }`}> 
                                 Teams
                              </span>
                             )}
                           </NavLink>
                        </div>
                         
                         <div>
                             <button className = "bg-[#3439CA] p-2 rounded-sm text-[#F3F2FB] text-neural text-sm font-medium" onClick={() => setModalShow12(true)}>New Team</button>
                             <NewTeam
        show={modalShow12}
        onHide={() => setModalShow12(false)}
      />
                         </div>
                     </div>

                     <main className="teams-wrapper my-4">
          <div className={`w-full grid grid-cols-1 lg:grid-cols-2 gap-5 ${open ? "md:grid-cols-1" : "md:grid-cols-2"}  `}>
            {dept?.map((dept) => {
              return (
                <div className="w-full h-full  border-1 border-[#EEEEEE] p-[1rem] rounded-md">
                  <div className="flex justify-between pb-3 items-center border-b-1 border-[#0000001A]">
                    <div className = "flex flex-col  ">
                      <h1 className = 'font-sans font-semibold text-[#404040] text-[1.05rem]'> {dept?.name} Team </h1>
                      <p className = 'font-sans font-medium text-sm text-[#7F7F7F] '> {dept.members.length} Members</p>
                    </div>
                      <p onClick = {()=> {getDeptById(dept._id); setShowModal(true);}} className = "font-sans font-medium text-sm text-[#3439CA]" >View All</p>
                  </div>
                  <div className = "my-4">
                  {dept.manager && (
                    <div className="flex gap-2  items-center">
                      <div>
                        <img
                          src={dept.manager.profileImage}
                          alt={`${dept.manager.fullName}'s profile`}
                          className = 'w-8 h-8 rounded-full border-1 border-[#7F7F7F]'
                          />
                      </div>
                      <div>
                        <div className="flex flex-col ">
                          <h3 className=" font-sans font-medium text-[0.93rem] text-[#050505]">{dept.manager.fullName}</h3>
                          <p className="mt-[-3px] font-sans font-medium text-xs text-[#7F7F7F]">Manager</p>
                        </div>
                      </div>
                    </div>
                  )}
                  </div>
                  <div>
                    <div className="flex flex-col gap-4">
                      {dept?.members.map((employee) => {
                        return (
                          <div
                            key={employee._id}
                            className="flex justify-between items-center"
                          >
                            <div className="flex items-center gap-2 ">
                              <div className="">
                                <img
                                  src={employee?.profileImage}
                                  alt=""
                                  className="w-8 h-8  rounded-full border-1 border-[#7F7F7F]"
                                />
                              </div>
                              <div className="flex flex-col ">
                                <h3 className="font-sans font-medium text-[0.93rem] text-[#050505]">
                                  {" "}
                                  {employee?.fullName}
                                </h3>
                                <p className="mt-[-3px] font-sans font-medium text-xs text-[#7F7F7F]">
                                  {" "}
                                  {employee?.jobTitle}{" "}
                                </p>
                              </div>
                            </div>
                            <img
                              className="teams-wrapper-employees-arrow-right"
                              src={arrowRightImg}
                              alt="arrow-right-img"
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {showModal && (
            <div  className="fixed inset-0 px-4 md:px-0 bg-black/30 flex items-center justify-center z-50">
               <div ref={modalRef} onClick={(e) => e.stopPropagation()} className="bg-white rounded-xl  shadow-lg transform transition-all duration-100 ease-in-out  opacity-100 animate-modalFade w-full max-w-xl ">
                 <div className = " py-4 px-4 flex justify-between items-center">
                   <h2 className = ' font-sans font-semibold text-lg text-[#292929]'>{selectedDept?.name}</h2>
                   <img src= {cancel} onClick={() => setShowModal(false)} alt="" className =  'w-7 h-7'/>
                </div>
                <SimpleBar forceVisible="x" autoHide={false} style={{ maxWidth: '100%' }}>
                  <div className = "min-w-[650px] md:min-w-full   pb-4 w-full">
                    <table className = 'table-auto w-full '>
                      <thead className = " ">
                        <tr className = 'text-left bg-[#F7F9FB]   '>
                          <th className = 'whitespace-nowra py-2 ps-4 font-inter font-medium text-base text-[#292929]'>
                              Team Members
                          </th>
                          <th className = "whitespace-nowra py-2  font-inter font-medium text-base text-[#292929]">
                             Role
                          </th>
                          <th className = "whitespace-nowra py-2 font-inter font-medium text-base text-[#292929]">
                              Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className = ' divide-y divide-[#E4E8ED] '>
                         {selectedDept?.members?.map((depts)=>{
                             return(
                                    <tr key= {dept?._id} className = "">
                                      <td className = 'ps-4 py-2 flex items-center gap-2'> 
                                         <img src= {depts.profileImage} alt="image-employ" className = "w-8 h-8 rounded-full  "/>
                                         <span className = "font-sans font-medium text-[0.93rem] text-[#292929]">{depts.fullName}</span>
                                      </td>
                                      <td>
                                         <span className = "font-sans font-medium text-[0.93rem] text-[#292929] ">{depts?.jobTitle}</span> 
                                      </td>
                                      <td className = "">
                                       <span className = {` font-inter font-regular text-sm rounded-full px-4 py-1
                                              ${depts?.status.toLowerCase() === "hybrid"  ? "bg-[#E2E3F8] text-[#3439CA]  " :
                                                depts?.status.toLowerCase() === "remote" ? "bg-[#F6ECDC] text-[#F29B07]" :
                                                depts?.status.toLowerCase() === "on-site" ? "bg-[#E7F9F3]  text-[#0D805D] " :
                                                ""
                                                }`}>{depts?.status}</span>
                                         {/* <span className = {`action-status ${depts.status.replace(/\s+/, "-").toLowerCase()}`} >{depts?.status}</span> */}
                                      </td>
                                    </tr>
                                  )
                              })}
                       </tbody>
                    </table>
                  </div>

                </SimpleBar>
               </div>
            </div>
          )}
        {/* <div className="  teams-wrapper-di">
        </div> */}
        {/* modal fro single dept */}
        {/* <Modal show={showModal} onHide={() => setShowModal(false)} centered  size="md">
          <Modal.Header closeButton >
            <div className = "d-flex justify-content-between align-items-center product-team product-tea">
                <h2>{selectedDept?.name}</h2>
                <Link to = "/admin-dashboard/employees/teams/editteam"><button>Edit Team</button></Link>
            </div>
          </Modal.Header>
          <Modal.Body>
            <div className = "borderd-line">
              <Table responsive = "lg" hover>
              <thead>
                 <tr className = "bg-light">
                   <th className = "bg-light"><span className = "dash-b">Team Members</span></th>
                   <th className = "bg-light"><span className = "dash-b">Role</span></th>
                   <th className = "text-center bg-light"><span className = "dash-b">Status</span></th>
                </tr>
              </thead>
              <tbody>
           {selectedDept?.members?.map((depts)=>{
            return(
              <tr key= {dept?._id} className = "">
              <td>
                 <div className = "d-flex align-items-center gap-2 team-div ">
                    <img src= {depts.profileImage} alt="image-employ" className = " pt-2  image-wrapper "/>
                    <span className = "names">{depts.fullName}</span>
                  </div>
              </td>
              <td>
                  <div className = "mt-2 ">
                    <span className = "heading-task">{depts?.jobTitle}</span> 
                  </div>
              </td>
              <td className = "text-center">
                  <div className = "mt-2 text-center">
                    <span className = {`action-status ${depts.status.replace(/\s+/, "-").toLowerCase()}`} >{depts?.status}</span>
                  </div>
              </td>
            </tr>
             
            )
           })}

              </tbody>

              </Table>
            </div>
          </Modal.Body>
        </Modal> */}
      </main>

                   
 
                 </section>

                ) : (
                   <Outlet/>
                )}
            </main>
        </>
    )
}

export default Teams




