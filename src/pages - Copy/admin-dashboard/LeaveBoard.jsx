import React from 'react'
import {Leaveboard} from '../../Taskboard'
import {leaveBoard} from '../../Taskboard'
import Table from 'react-bootstrap/Table';
import '../../Style/Leaveboard.css'
import temilade from '../../assets/Frame 23.svg'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useMatch } from 'react-router-dom';
import { useState } from 'react';





function MyVerticallyCenteredModalx(param) {
    const newTask = param.newTask;
   
    return (
      <Modal
        {...param}
        
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
          <h1 className = "profile-h1 ps-3 leave">Leave Request</h1>
          </Modal.Title>
        </Modal.Header>
        {newTask && (
        <Modal.Body>
          <section className = "px-3 spacess">
              <div className = "d-flex justify-content-between align-items-center">
                  <div className = "d-flex gap-2 align-items-center">
                      <div className = "image-sanya">
                          <img src= {newTask.Images} alt="" className = "imggg"/>
                      </div>
                      <div className = "temilades ">
                          <h4>{newTask.Names}</h4>
                          <p>temixalade23@gmail.com</p>
                      </div>
                  </div>
                  <button className = "view-profile">Edit Profile</button>
              </div>
              <h4 className = "personal my-3">Leave Details</h4>
              <div className = "my-3">
                  <div className = "d-flex gap-5">
                      <div className = "d-flex gap-5 align-items-center gaps">
                          <span className = "TEXT">Leave Type:</span>
                          <span className = "TEXT">{newTask.LeaveType}</span>
                      </div>
                      <div className = "d-flex gap-5 align-items-center gapss">
                          <span className = "TEXT">Duration:</span>
                          <span className = "TEXT">{newTask.Days}</span>
                      </div>
                  </div>
              </div>
              <div className = "my-4"> 
                  <div className = "d-flex gap-5">
                      <div className = "gaps">
                          <span className = "TEXT">{newTask.start}</span>
                      </div>
                      <div className = "gapss">
                          <span className = "TEXT">{newTask.end}</span>
                      </div>
                  </div>
              </div>
              <div className = "my-3"> 
                  <div className = "d-flex gap-5">
                      <div className = "d-flex gap-5 align-items-center gaps">
                          <span className = "TEXT">Description:</span>
                          <span className = "TEXT">Nil</span>
                      </div>
                      <div className = "d-flex  align-items-center gapss">
                          <span className = "TEXT">Status:</span>
                          <span className = {`action-status ${newTask.Status.replace(/\s+/, "-").toLowerCase()}`}>{newTask.Status}</span>
                      </div>
                  </div>
              </div>
              <div className = "my-5"> 
                  <div className = "d-flex gap-4 align-items-center bala">
                          <span className = "TEXT">Leave Balance:</span>
                          <span className = "TEXT">(8) {newTask.LeaveType} , (6)  {newTask.LeaveType}</span>
                  </div>
              </div>
              <div className = "d-flex gap-3 my-4">
                  <button className = "save-btn">Approve</button>
                  <button className = "cancel-btn">Decline</button>
              </div>
          </section>
        </Modal.Body>

        )}
       
      </Modal>
    );
  }




const LeaveBoard = () => {
    const [modalShow, setModalShow] = React.useState(false);
    const [SelectedTask , setSelectedTask] = useState(null)
    

    return (
        <>
           <main className = "summary-container mt-2">
               <section>
                  <h2 className = "task-h1">Leaveboard</h2>
                  <h4 className = "dash-h4">Dashboard/Leaveboard</h4>
                  <div className = "d-flex  justify-content-between taskboard-flexx d-lg-flex flex-wrap my-4 pb-2 ">
                      {Leaveboard.map((leave) => {
                          const {id,names,number} = leave
                          return(
                              <div key = {id} className = "text-center taskboard-flex ">
                                  <h4 className = "namess">{names}</h4>
                                  <h1 className = "numbers">{number}</h1>
                              </div>
                          )
                      })}
                  </div>

                  <section className = "dashboard-task my-4">
                    <div>
                    <Table responsive = "lg">
                      <thead className = "threadd">
                        <tr>
                          <th>
                              <span className = "dash-bars ms-2">Name</span>
                          </th>
                          <th>
                              <span className = "dash-bars ">Leave Type</span>
                          </th>
                          <th>
                              <span className = "dash-bars">Duration</span>
                          </th>
                          <th>
                              <span className = "dash-bars">Days</span>
                          </th>
                          <th className = "text-center">
                              <span className = "dash-bars">Status</span>
                          </th>
                          <th> 
                              <span className = "dash-bars"></span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                      {leaveBoard.map((leaves) =>{
                          const{id,Images,Names,LeaveType,start,end,Days, Status,Dot} = leaves
                          return(   
                         <tr key= {id} className = "">
                           <td>
                              <div className = "d-flex align-items-center gap-3 mt-2" >
                                   <img src= {Images} alt="image-leave"/>
                                   <span className = "names" onClick={() => { setSelectedTask(leaves); setModalShow(true);}} >{Names}</span>
                               </div>
                           </td>
                           <td>
                               <div className = "mt-2 ">
                                 <span className = "names">{LeaveType}</span> 
                               </div>
                           </td>
                           <td>
                               <div className = "mt-2 ">
                                   <span className = "start">{start}</span>
                                   <p className = "end">{end}</p>
                               </div>
                           </td>
                           <td>
                               <div className = "mt-2 ">
                                 <span className = "names">{Days}</span> 
                               </div>
                           </td>
                           <td>
                               <div className = "mt-2">
                                 <p className = {`action-status ${Status.replace(/\s+/, "-").toLowerCase()}`} >{Status}</p>
                               </div>
                           </td>
                           <td>
                               <div className = "mt-2 ">
                                 <img src= {Dot} alt=""/>
                               </div>
                           </td>
                         </tr>
                          )
                      })}
                     </tbody>
                    </Table>
                    </div>
                </section>

               </section>
            </main> 
            <MyVerticallyCenteredModalx
        show={modalShow}
        onHide={() => setModalShow(false)}
        newTask = {SelectedTask}
      />
        </>
    )
}

export default LeaveBoard
