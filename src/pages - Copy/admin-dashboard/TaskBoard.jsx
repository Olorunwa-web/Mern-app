import React from 'react'
import {Taskboard} from '../../Taskboard'
import {DashboardPages} from '../../db'
import '../../Style/Taskboard.css'
import Table from 'react-bootstrap/Table';
import ModalTask from '../../Components/ModalTask'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import arrowDown from '../../assets/Frame 10.svg';






function MyVerticallyCenteredModal(params) {
    const newtask = params.newtask;


    return (
      <Modal
        {...params}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
             <h1 className = "profile-h1 ps-3 leave">Task Details</h1>
          </Modal.Title>
        </Modal.Header>
        {newtask && (
                <Modal.Body>
                  <section className = "px-3 spacess">
                      <div className = "d-flex gap-5 align-items-center my-4 fixed">
                          <div className = "d-flex align-items-center website-width">
                              <span className = "TEXT">Task Name:</span>
                              <span className = "TEXT">{newtask.task}</span>
                          </div>
                          <div className = "d-flex align-items-center team-width">
                              <span className = "TEXT">Team:</span>
                              <img src= {newtask.images} alt="" />
                          </div>
                      </div>
                      <div className = 'd-flex gap-5 my-4'>
                          <div className = "website-width">
                              <span className = "TEXT">{newtask.start}</span>
                          </div>
                          <div className = "team-width">
                              <span className = "TEXT">{newtask.end}</span>
                          </div>
                      </div>
                      <div className = "d-flex gap-4 align-items-center my-3">
                          <div className = "d-flex align-items-center website-width">
                              <span className = "TEXT">Description:</span>
                              <span className = "TEXT">Nil</span>
                          </div>
                          <div className = "d-flex  align-items-center team-width">
                              <span className = 'TEXT'>Status:</span>
                              <div className = "d-flex gap-2">
                                 <span className = {`action-status ${newtask.action.replace(/\s+/, "-").toLowerCase()}`}>{newtask.action} </span>
                                 <img src= {arrowDown} alt=""/>
                              </div>
                          </div>
                      </div>
                  </section>
                </Modal.Body>
            )}
                
              </Modal>
    );
  }




const TaskBoard = () => {
    const [modalShow, setModalShow] = React.useState(false);
    const [modalShow1, setModalShow1] = React.useState(false);
    const [selectedTask , setselectedTask] = useState(null)

    const [ModalShow, setmodalShow] = useState(false);
    const handleOpen = () => setModalShow(true);




    return (
        <>
           <main className = "summary-container mt-2">
               <section>
                   <div className = "d-flex justify-content-between align-items-center "> 
                   <div>
                        <h2 className = "task-h1">Taskboard</h2>
                        <h4 className = "dash-h4">Dashboard/Taskboard</h4>
                   </div>
                    <div>
                         <button className = "new-task" onClick={handleOpen} >New Task</button>
                         
                 </div>
                   </div>
                   <div className = "d-flex  justify-content-between taskboard-flexx d-lg-flex flex-md-wrap my-4 ">
                       {Taskboard.map((taskss)=>{
                           const {id,names,number,Icons} = taskss
                           return(
                               <div key = {id} className = " taskboard-flex ">
                                   <div className = "d-flex justify-content-between" >
                                       <h5 className = "namess">{names}</h5>
                                       <img src= {Icons} alt=""/>
                                   </div>
                                   <div>
                                       <h1 className = "numbers">{number}</h1>
                                   </div>
                               </div>
                           )
                       })} 
                   </div>

                   <section className = "dashboard-tasks my-4">
                    <h2 className = "heading-3 pt-2  ps-3">Taskboard</h2>
                    <div>
                    <Table responsive = "lg">
                      <thead className = "threadd">
                        <tr>
                          <th>
                              <span className = "dash-bar ms-2">#</span>
                          </th>
                          <th>
                              <span className = "dash-bar ">Task</span>
                          </th>
                          <th>
                              <span className = "dash-bar">Team</span>
                          </th>
                          <th>
                              <span className = "dash-bar">Duration</span>
                          </th>
                          <th className = "text-center">
                              <span className = "dash-bar">Action</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                      {DashboardPages.map((dashboards) =>{
                          const{id,task,images,start,end,action} = dashboards
                          return(   
                         <tr key= {id} className = "">
                           <td>
                               <div>
                               <input type="checkbox" name="" id="inputs"/>
                               </div>
                           </td>
                           <td>
                               <div className = "mt-2 pt-1">
                                 <span className = "heading-task" onClick={() => { setselectedTask(dashboards); setModalShow1(true);}} >{task}</span>
                               </div>
                           </td>
                           <td>
                               <div className = "mt-2 ">
                                 <img src= {images} alt=""/>
                               </div>
                           </td>
                           <td>
                               <div className = "mt-2 ">
                                   <span className = "start">{start}</span>
                                   <p className = "end">{end}</p>
                               </div>
                           </td>
                           <td className = "text-center">
                               <div className = "mt-3 text-center">
                                 <p className = {`action-status ${action.replace(/\s+/, "-").toLowerCase()}`} >{action}</p>
                               </div>
                           </td>
                         </tr>
                          )
                      })}
                     </tbody>
                    </Table>
                    </div>
                    <MyVerticallyCenteredModal
        show={modalShow1}
        onHide={() => setModalShow1(false)}
        newtask = {selectedTask}
      /> 
                </section>

               </section>
           </main>

        </>
    )
}

export default TaskBoard
