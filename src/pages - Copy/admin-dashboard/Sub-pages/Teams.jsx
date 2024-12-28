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
import { useState } from 'react'
import temilade from '../../../assets/Frame 23.svg'


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
         <div>
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
         <div>
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
         <div>
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
         <div>
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



function MyVerticallyCenteredModal4(paramss) {
  const newTeam = paramss.newTeam;

    return (
      <Modal
        {...paramss}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <h1 className = "profile-h1 ps-3">Employee's Profile</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <section className = " w-100 padd px-3">
            <div className = "d-flex justify-content-between align-items-center">
              <div className = "d-flex gap-2 align-items-center">
                <div className = "image-temi">
                    <img src= {temilade} alt="" className = "imgg"/>
                </div>
                <div className = "temilade pt-3">
                  <h2>Temilade Openiyi</h2>
                  <p>temixalade@gmail.com</p>
                </div>
              </div>
              <Link to = "/admin-dashboard/employees/teams/editteam"><button className = "edit-profile">Edit Profile</button></Link>
            </div>
            <h4 className = "personal mt-3">Personal Information</h4>
            <div className = "d-flex justify-content-between mb-3 temi-flex">
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
            <div className = "d-flex  justify-content-between">
            <div className = "mobile-numbers">
                <h3 className = "mobile-num">Gender</h3>
                <h6 className = "mobile-numm">08163549087</h6>
              </div>
              <div className = "mobile-numberss">
                <h3 className = "mobile-num">Address</h3>
                <h6 className = "mobile-nummm">No 1 Ogunlesi Street,Onipan, Lagos</h6>
              </div>
            </div>
            <hr/>
            <h4 className = "personal mt-3">Personal Information</h4>
            <div className = "d-flex justify-content-between mt-3">
              <div className = "mobile-number">
                <h3 className = "mobile-num">Office of Employment</h3>
                <h6 className = "mobile-numm">Head Office, Onipan</h6>
              </div>
              <div className = "mobile-number">
                <h3 className = "mobile-num">Job Title</h3>
                <h6 className = "mobile-numm">Web Developer</h6>
              </div>
              <div className = "mobile-number">
                <h3 className = 'mobile-num'>Department</h3>
                <h6 className = "mobile-numm">Product</h6>
              </div>
            </div>
            <div className = "my-3">
                <h3 className = 'mobile-num'>Employee Type</h3>
                <h6 className = "mobile-numm">Hybrid</h6>
              </div>
          </section>
        </Modal.Body>
          
      </Modal>
    );
  }
  




  



const Teams = () => {
    const match = useMatch("/admin-dashboard/employees/teams")

    const [selectedTeam , setselectedTeam] = useState(null)

    
    const [modalShow, setModalShow] = React.useState(false);
    const [modalShow1, setModalShow1] = React.useState(false);
    const [modalShow2, setModalShow2] = React.useState(false);
    const [modalShow3, setModalShow3] = React.useState(false);
    const [modalShow4, setModalShow4] = React.useState(false);





    return (
        <>
            <main className = "">
                {match ? (
                     <section className = "">
                     <div className = "employ-tags">
                         <h1>Employee</h1>
                         <h3>Dashboard/Employee</h3>
                     </div>
                     <div className = 'd-flex justify-content-between line my-3'>
                         <div>
                         <NavLink
                       end>
                       {({ isActive, isPending }) =>(
                         <span
                           className={`d-flex gap-4  isPending ? "pending": ${isActive ?"Active" : "" 
 
                           }`}
                         > <Link to = "/admin-dashboard/employees" className = 'one-off'><h4 className = "all-employees">All Employees</h4></Link>
                         <Link to = "/admin-dashboard/employees/teams" className = "two-off"><h4 className = "teamss">Teams</h4></Link>
                         </span>
                        
                       )}
                     </NavLink>
 
                         </div>
                         <div>
                             <Link to = "/admin-dashboard/employees/teams/newteam"><button className = "buttonsss">New Team</button></Link>
                         </div>
                     </div>
                     <section className = "d-lg-flex gap-4 mb-4 product-gap" >
                         <div className = "teams px-3 pt-3 ">
                             <div className = "d-flex justify-content-between align-items-center">
                                 <div className = "product">
                                   <h1>Product Team</h1>
                                   <p>20 Members</p>
                                 </div>
                                 <div className = "view">
                                     <p onClick={() => setModalShow(true)}>View All</p>
                                     <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
                                 </div>
                             </div>
                             <div className = "mt-3">
                                 {ProductTeam.map((product) =>{
                                     const {id,Image,name,position,arrow} = product
                                     return(
                                         <div key = {id}>
                                             <div className = "d-flex justify-content-between align-items-center mb-2">
                                                 <div className = "d-flex gap-2 " >
                                                     <div>
                                                         <img src= {Image} alt="images"  onClick={() => {setselectedTeam(product);  setModalShow4(true);}} />
                                                     </div>
                                                     <div className = "aisha">
                                                         <h3>{name}</h3>
                                                         <p>{position}</p>
                                                     </div>
                                                 </div>
                                                 <div className = "Arrow">
                                                     <img src= {arrow} alt=""/>
                                                 </div>
                                             </div>
                                         </div>
                                     )
                                 })}
                             </div>
                             <MyVerticallyCenteredModal4
        show={modalShow4}
        onHide={() => setModalShow4(false)}
        newTeam = {selectedTeam}
      />
 
                         </div>
 
                         <div className = "teams px-3 pt-3">
                             <div className = "d-flex justify-content-between align-items-center">
                                 <div className = "product">
                                   <h1>Marketing Team</h1>
                                   <p>20 Members</p>
                                 </div>
                                 <div className = "view">
                                     <p onClick={() => setModalShow1(true)}>View All</p>
                                     <MyVerticallyCenteredModal1
        show={modalShow1}
        onHide={() => setModalShow1(false)}
      />
                                 </div>
                             </div>
                             <div className = "mt-3">
                                 {MarketingTeam.map((market) =>{
                                     const {id,Image,name,position,arrow} = market
                                     return(
                                         <div key = {id}>
                                             <div className = "d-flex justify-content-between align-items-center mb-2">
                                                 <div className = "d-flex gap-2">
                                                     <div>
                                                         <img src= {Image} alt="images"/>
                                                     </div>
                                                     <div className = "aisha">
                                                         <h3>{name}</h3>
                                                         <p>{position}</p>
                                                     </div>
                                                 </div>
                                                 <div className = "Arrow">
                                                     <img src= {arrow} alt=""/>
                                                 </div>
                                             </div>
                                         </div>
                                     )
                                 })}
                             </div>
 
                         </div>
 
                     </section>
                     <section className = "d-lg-flex gap-4">
                     <div className = "teams px-3 pt-3 ">
                             <div className = "d-flex justify-content-between align-items-center ">
                                 <div className = "product">
                                   <h1>Administration Team</h1>
                                   <p>20 Members</p>
                                 </div>
                                 <div className = "view">
                                     <p onClick={() => setModalShow2(true)}>View All</p>
                                     <MyVerticallyCenteredModal2
        show={modalShow2}
        onHide={() => setModalShow2(false)}
      />
                                 </div>
                             </div>
                             <div className = "mt-3">
                                 {AdministrationTeam.map((admin) =>{
                                     const {id,Image,name,position,arrow} = admin
                                     return(
                                         <div key = {id}>
                                             <div className = "d-flex justify-content-between align-items-center mb-2">
                                                 <div className = "d-flex gap-2 ">
                                                     <div>
                                                         <img src= {Image} alt="images"/>
                                                     </div>
                                                     <div className = "aisha">
                                                         <h3>{name}</h3>
                                                         <p>{position}</p>
                                                     </div>
                                                 </div>
                                                 <div className = "Arrow">
                                                     <img src= {arrow} alt=""/>
                                                 </div>
                                             </div>
                                         </div>
                                     )
                                 })}
                             </div>
 
                         </div>
 
                         <div className = "teams px-3 pt-3">
                             <div className = "d-flex justify-content-between align-items-center ">
                                 <div className = "product"> 
                                   <h1>Operation Team</h1>
                                   <p>20 Members</p>
                                 </div>
                                 <div className = "view">
                                     <p onClick={() => setModalShow3(true)} >View All</p>
                                     <MyVerticallyCenteredModal3
        show={modalShow3}
        onHide={() => setModalShow3(false)}
      />
                                 </div>
                             </div>
                             <div className = "mt-3">
                                 {OperationsTeam.map((product) =>{
                                     const {id,Image,name,position,arrow} = product
                                     return(
                                         <div key = {id}>
                                             <div className = "d-flex justify-content-between align-items-center mb-2">
                                                 <div className = "d-flex gap-2">
                                                     <div>
                                                         <img src= {Image} alt="images"/>
                                                     </div>
                                                     <div className = "aisha">
                                                         <h3>{name}</h3>
                                                         <p>{position}</p>
                                                     </div>
                                                 </div>
                                                 <div className = "Arrow">
                                                     <img src= {arrow} alt=""/>
                                                 </div>
                                             </div>
                                         </div>
                                     )
                                 })}
                             </div>
 
                         </div>
 
                     </section>
 
                 </section>

                ) : (
                   <Outlet/>
                )}
            </main>
        </>
    )
}

export default Teams
