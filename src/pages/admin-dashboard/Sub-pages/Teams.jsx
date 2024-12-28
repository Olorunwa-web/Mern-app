import React from 'react'
import {ProductTeam} from '../../../employ'
import {MarketingTeam} from '../../../employ'
import {AdministrationTeam} from '../../../employ'
import {OperationsTeam} from '../../../employ'
import '../../../Style/Team.css'
import {Link, NavLink, Outlet } from 'react-router-dom'
import { useMatch } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {productTeam} from '../../../employ'
import {marketingTeam } from '../../../employ'
import { administrationTeam } from '../../../employ'
import {operationsTeam} from '../../../employ'
import Table from 'react-bootstrap/Table';
import { useState, useEffect } from 'react'
import temilade from '../../../assets/Frame 23.svg'
import axios from "axios"
import arrowRightImg from "../../../assets/Stockholm-icons (1).svg";
import "../../../Style/newteamstyle.css"
import NewTeam from "../Sub-pages/NewTeam"



function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
            <div className = "d-flex  justify-content-between align-items-center product-team">
                <h1>Product Team</h1>
                <Link to = "/admin-dashboard/employees/teams/editteam"><button>Edit Team</button></Link>
            </div>
        </Modal.Header>
        <Modal.Body>
         <div className = "borderd-line">
         <Table responsive = "lg" hover >
                      <thead className = "threadd">
                        <tr>
                          <th>
                              <span className = "dash-bar ms-2">Team Members</span>
                          </th>
                          <th>
                              <span className = "dash-bar ">Role</span>
                          </th>
                          <th className = 'text-center'>
                              <span className = "dash-bar">Status</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                      {productTeam.map((products) =>{
                          const{id,Image,name,position,Status} = products
                          return(   
                         <tr key= {id} className = "">
                           <td>
                              <div className = "d-flex align-items-center gap-2">
                                   
                                       <img src= {Image} alt="image-employ" className = "image-div pt-2"/>
                                   
                                   <span className = "names">{name}</span>
                               </div>
                           </td>
                           <td>
                               <div className = "mt-2 pt-1">
                                 <span className = "heading-task">{position}</span> 
                               </div>
                           </td>
                           <td className = "text-center">
                               <div className = "mt-3 text-center">
                                 <p className = {`action-status ${Status.replace(/\s+/, "-").toLowerCase()}`} >{Status}</p>
                               </div>
                           </td>
                         </tr>
                          )
                      })}
                     </tbody>
                    </Table>

         </div>
        </Modal.Body>
        
      </Modal>
    );
  }





function MyVerticallyCenteredModal1(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
            <div className = "d-flex  justify-content-between align-items-center product-team">
                <h1>Marketing Team</h1>
                <Link to = "/admin-dashboard/employees/teams/editteam"><button>Edit Team</button></Link>
            </div>
        </Modal.Header>
        <Modal.Body>
         <div className = "borderd-line">
         <Table responsive = "lg">
                      <thead className = "threadd">
                        <tr>
                          <th>
                              <span className = "dash-bar ms-2">Team Members</span>
                          </th>
                          <th>
                              <span className = "dash-bar ">Role</span>
                          </th>
                          <th className = 'text-center'>
                              <span className = "dash-bar">Status</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                      {marketingTeam.map((products) =>{
                          const{id,Image,name,position,Status} = products
                          return(   
                         <tr key= {id} className = "">
                           <td>
                              <div className = "d-flex align-items-center gap-2">
                                   
                                       <img src= {Image} alt="image-employ" className = "image-div pt-2"/>
                                   
                                   <span className = "names">{name}</span>
                               </div>
                           </td>
                           <td>
                               <div className = "mt-2 pt-1">
                                 <span className = "heading-task">{position}</span> 
                               </div>
                           </td>
                           <td className = "text-center">
                               <div className = "mt-3 text-center">
                                 <p className = {`action-status ${Status.replace(/\s+/, "-").toLowerCase()}`} >{Status}</p>
                               </div>
                           </td>
                         </tr>
                          )
                      })}
                     </tbody>
                    </Table>

         </div>
        </Modal.Body>
        
      </Modal>
    );
  }





 function MyVerticallyCenteredModal2(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
            <div className = "d-flex  justify-content-between align-items-center product-team">
                <h1>Administration Team</h1>
                <Link to = "/admin-dashboard/employees/teams/editteam"><button>Edit Team</button></Link>
            </div>
        </Modal.Header>
        <Modal.Body>
         <div className = "borderd-line">
         <Table responsive = "lg">
                      <thead className = "threadd">
                        <tr>
                          <th>
                              <span className = "dash-bar ms-2">Team Members</span>
                          </th>
                          <th>
                              <span className = "dash-bar ">Role</span>
                          </th>
                          <th className = 'text-center'>
                              <span className = "dash-bar">Status</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                      {administrationTeam.map((products) =>{
                          const{id,Image,name,position,Status} = products
                          return(   
                         <tr key= {id} className = "">
                           <td>
                              <div className = "d-flex align-items-center gap-2">
                                   
                                       <img src= {Image} alt="image-employ" className = "image-div pt-2"/>
                                   
                                   <span className = "names">{name}</span>
                               </div>
                           </td>
                           <td>
                               <div className = "mt-2 pt-1">
                                 <span className = "heading-task">{position}</span> 
                               </div>
                           </td>
                           <td className = "text-center">
                               <div className = "mt-3 text-center">
                                 <p className = {`action-status ${Status.replace(/\s+/, "-").toLowerCase()}`} >{Status}</p>
                               </div>
                           </td>
                         </tr>
                          )
                      })}
                     </tbody>
                    </Table>

         </div>
        </Modal.Body>
        
      </Modal>
    );
  }


 


  function MyVerticallyCenteredModal3(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
            <div className = "d-flex  justify-content-between align-items-center product-team">
                <h1>Operation Team</h1>
                <Link to = "/admin-dashboard/employees/teams/editteam"><button>Edit Team</button></Link>
            </div>
        </Modal.Header>
        <Modal.Body>
         <div className = "borderd-line">
         <Table responsive = "lg">
                      <thead className = "threadd">
                        <tr>
                          <th>
                              <span className = "dash-bar ms-2">Team Members</span>
                          </th>
                          <th>
                              <span className = "dash-bar ">Role</span>
                          </th>
                          <th className = 'text-center'>
                              <span className = "dash-bar">Status</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                      {operationsTeam.map((products) =>{
                          const{id,Image,name,position,Status} = products
                          return(   
                         <tr key= {id} className = "">
                           <td>
                              <div className = "d-flex align-items-center gap-2">
                                   
                                       <img src= {Image} alt="image-employ" className = "image-div pt-2"/>
                                   
                                   <span className = "names">{name}</span>
                               </div>
                           </td>
                           <td>
                               <div className = "mt-2 pt-1">
                                 <span className = "heading-task">{position}</span> 
                               </div>
                           </td>
                           <td className = "text-center">
                               <div className = "mt-3 text-center">
                                 <p className = {`action-status ${Status.replace(/\s+/, "-").toLowerCase()}`} >{Status}</p>
                               </div>
                           </td>
                         </tr>
                          )
                      })}
                     </tbody>
                    </Table>

         </div>
        </Modal.Body>
        
      </Modal>
    );
  }



function MyVerticallyCenteredModal4(parrams) {
  const newTeam = parrams.newTeam;

    return (
      <Modal
        {...parrams}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <h1 className = "profile-h1 ps-3">Employee's Profile</h1>
          </Modal.Title>
        </Modal.Header>
        {newTeam && (

        <Modal.Body>
          <section className = " w-100 padd px-3">
            <div className = "d-flex justify-content-between align-items-center">
              <div className = "d-flex gap-2 align-items-center">
                <div className = "image-temi">
                    <img src= {newTeam.Image} alt="" className = "imgg"/>
                </div>
                <div className = "temilade pt-3">
                  <h2>{newTeam.name}</h2>
                  <p>temixalade@gmail.com</p>
                </div>
              </div>
              <Link to = "/admin-dashboard/employees/teams/editteam"><button className = "edit-profile">Edit Profile</button></Link>
            </div>
            <h4 className = "personal mt-3">Personal Information</h4>
            <div className = " d-lg-flex justify-content-between mb-3 temi-flex ">
              <div className = "mobile-number">
                <h3 className = "mobile-num">Mobile Number</h3>
                <h6 className = "mobile-numm">08163549087</h6>
              </div>
              <div className = "mobile-number">
                <h3 className = "mobile-num">Date of Birth</h3>
                <h6 className = "mobile-numm">06/07/1999</h6>
              </div>
              <div className = "mobile-number">
                <h3 className = 'mobile-num'>Martial Status</h3>
                <h6 className = "mobile-numm">Single</h6>
              </div>
            </div>
            <div className = "d-lg-flex  justify-content-between">
            <div className = "mobile-numbers">
                <h3 className = "mobile-num">Gender</h3>
                <h6 className = "mobile-numm">Female</h6>
              </div>
              <div className = "mobile-numberss">
                <h3 className = "mobile-num">Address</h3>
                <h6 className = "mobile-nummm">No 1 Ogunlesi Street,Onipan, Lagos</h6>
              </div>
            </div>
            <hr/>
            <h4 className = "personal mt-3">Personal Information</h4>
            <div className = "d-lg-flex justify-content-between mt-3">
              <div className = "mobile-number">
                <h3 className = "mobile-num">Office of Employment</h3>
                <h6 className = "mobile-numm">Head Office, Onipan</h6>
              </div>
              <div className = "mobile-number">
                <h3 className = "mobile-num">Job Title</h3>
                <h6 className = "mobile-numm">{newTeam.position}</h6>
              </div>
              <div className = "mobile-number">
                <h3 className = 'mobile-num'>Department</h3>
                <h6 className = "mobile-numm">Product</h6>
              </div>
            </div>
            <div className = "my-3 mobile-number">
                <h3 className = 'mobile-num'>Employee Type</h3>
                <h6 className = "mobile-numm">Hybrid</h6>
            </div>
          </section>
        </Modal.Body>
        )}
          
      </Modal>
    );
  }
  




  



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
          "http://localhost:9080/api/department/all-departments",
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
        const res = await axios.get(`http://localhost:9080/api/department/departments/${id}`, {
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
            <main className = "">
                {match ? (
                     <section className = "">
                     <div className = "employ-tags">
                         <h1>Employee</h1>
                         <h4>Dashboard/Employee</h4>
                     </div>
                     <div className = 'd-flex justify-content-between align-items-center line mt-3'>
                     <div className = "d-flex gap-4 spacess">
                        <NavLink
                        to = "/admin-dashboard/employees"
                        className = "admin-employees-nav-link all-employees"
                      end>
                      {({ isActive}) =>(
                        <span
                          className={`d-flex gap-2 align-items-center pt-3 nav-link-header   ${isActive ? "is-Active" : "" 
                          }`}
                        > 
                        All Employees
                        </span>
                      )}
                    </NavLink>

                      <NavLink
                        to = "/admin-dashboard/employees/teams"
                        className = "admin-employees-nav-link all-employees"
                      end>
                      {({ isActive}) =>(
                        <span
                          className={`d-flex gap-2 align-items-center pt-3 nav-link-header  ${isActive ? "is-Active" : "" 

                          }`}
                        > 
                        Teams
                        </span>
                      )}
                    </NavLink>
                        </div>
                         
                         <div>
                             <button className = "buttonsss" onClick={() => setModalShow12(true)}>New Team</button>
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
        <Modal show={showModal} onHide={() => setShowModal(false)} centered  size="md">
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
        </Modal>
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




