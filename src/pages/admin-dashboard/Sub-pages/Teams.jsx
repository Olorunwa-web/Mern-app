import React from 'react'
import '../../../Style/Team.css'
import {Link, NavLink, Outlet } from 'react-router-dom'
import { useMatch } from "react-router-dom"
import { useState, useEffect } from 'react'
import temilade from '../../../assets/Frame 23.svg'
import axios from "axios"
import arrowRightImg from "../../../assets/Stockholm-icons (1).svg";
import "../../../Style/newteamstyle.css"
import NewTeam from "../Sub-pages/NewTeam"



  

const Teams = () => {
    const match = useMatch("/admin-dashboard/employees/teams")

    const [selectedTeam , setselectedTeam] = useState(null)
    const [selectedDept, setSelectedDept] = useState(null);
    const [showModal, setShowModal] = useState(false);
    

    
    const [modalShow12, setModalShow12] = React.useState(false);


    const [dept, setDept] = useState([])
    const token = localStorage.getItem("hr-token");



    
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
        <div className="container-fluid teams-wrapper-div">
          <div className=" x row justify-content-between gap-5">
            {dept?.map((dept) => {
              return (
                <div className="col-lg-5  border p-3 teams-wrapper-map">
                  <div className="d-flex justify-content-between align-items-center border-bottom border-1">
                    <div className = "product">
                      <h1> {dept?.name} Team </h1>
                      <p> {dept.members.length} Members</p>
                    </div>
                      <Link onClick = {()=> getDeptById(dept._id)} className = "view-all" >View All</Link>
                  </div>
                  <div className = "mt-3">
                  {dept.manager && (
                    <div className="manager-info d-flex gap-2 ">
                      <div className="teams-wrapper-employees-profile-pic">
                        <img
                          src={dept.manager.profileImage}
                          alt={`${dept.manager.fullName}'s profile`}
                          />
                      </div>
                      <div>
                        <div className="d-flex flex-column aisha">
                          <h3 className="teams-wrapper-employees-span-">{dept.manager.fullName}</h3>
                          <p className="teams-wrapper-employees-span-">Manager</p>
                        </div>
                      </div>
                    </div>
                  )}
                  </div>
                  <div>
                    <div className="teams-wrapper-employees">
                      {dept?.members.map((employee) => {
                        return (
                          <div
                            key={employee._id}
                            className="d-flex justify-content-between"
                          >
                            <div className="d-flex align-items-center gap-2 my-">
                              <div className="teams-wrapper-employees-profile-pic">
                                <img
                                  src={employee?.profileImage}
                                  alt=""
                                  className=""
                                />
                              </div>
                              <div className="d-flex flex-column aishas">
                                <h3 className="teams-wrapper-employees-span-">
                                  {" "}
                                  {employee?.fullName}
                                </h3>
                                <p className="teams-wrapper-employees-span-">
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
        </div>
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




