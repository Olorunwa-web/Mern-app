import React from 'react'
import {Taskboard} from '../../Taskboard'
import {DashboardPages} from '../../db'
import '../../Style/Taskboard.css'
import Table from 'react-bootstrap/Table';
import ModalTask from '../../Components/ModalTask'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react';
import arrowDown from '../../assets/Frame 10.svg';
import ModalTasks from '../../Components/ModalTasks';
import axios from "axios"
import Loader from "../../utils/Loader"
import dashboardimage from "../../assets/dashboard_31dp_314D1C_FILL0_wght400_GRAD0_opsz24.svg"
import dashboarddelete  from "../../assets/delete_31dp_EA3323_FILL0_wght400_GRAD0_opsz24.svg"



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

    const [data2, setData2] = useState([])
    const token = localStorage.getItem("hr-token");

    const [selectedTask, setSelectedTask] = useState(null);
    const [error, setError] = useState(null)
    const [showModal, setShowModal] = useState(false);
    const [isLoading,setIsLoading] = useState(false);




    const [modalShow, setModalShow] = useState(false);
    const [modalShow1, setModalShow1] = React.useState(false);
    // const [selectedTask , setselectedTask] = useState(null)


    const getTasks = async ()=>{
        try {
            const req = await axios.get("https://mern-backend-1-9jn6.onrender.com/api/task", {
                headers:{
                    Authorization: `Bearer ${token}`,
                }
            })
            console.log(req.data.tasks);
            setData2(req.data.tasks)
        } catch (error) {
            
        }
    }

    useEffect(()=>{
        getTasks()
    }, [])


    const getTaskById = async (id)=>{
        try {
          setIsLoading(true);
          const req = await axios.get(`https://mern-backend-1-9jn6.onrender.com/api/task/${id}`,{
            headers:{
              Authorization: `Bearer ${token}`,
            }
          })
          setSelectedTask(req.data.task);
          setShowModal(true);
          console.log(req.data.task);
       
        } catch (error) {
        
        }finally {
          setIsLoading(false);
        }
      }


      if (isLoading) {
        return <div className="vh-100 d-flex justify-content-center"> <Loader/> </div>;
      }


      const deleteTask = async(id)=>{
        try {
          setIsLoading(true);
          setError(null);
          const req = await axios.delete(`https://mern-backend-1-9jn6.onrender.com/api/task/${id}`,{
            headers:{
              Authorization: `Bearer ${token}`,
            }
          })
        
          console.log(req);
          setData2(data2.filter((existingDatum) => existingDatum._id !== id));
    
       
        } catch (error) {
        
        }finally {
          setIsLoading(false);
        }
      }



    return (
        <>
           <main className = "summary-container mt-2">
               <section>
                   <div className = "d-flex justify-content-between align-items-center "> 
                   <div>
                        <h1 className = "task-h1">Taskboard</h1>
                        <h4 className = "dash-h4">Dashboard/Taskboard</h4>
                   </div>
                    <div>
                         <button className = "new-task" onClick={() => setModalShow(true)} >New Task</button>  
                 </div>
                   </div>
                   <div className = "d-flex justify-content-between taskboard-flexx d-lg-flex flex-md-wrap my-4 ">
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
                    <div className = "employee-table"> 
                    <Table responsive = "lg" hover>
                      <thead className = "threadd">
                        <tr>
                          <th  className = "bg-light">
                              <span className = "dash-bar ms-2">Task</span>
                          </th>
                          <th  className = "bg-light">
                              <span className = "dash-bar ">Team</span>
                          </th>
                          <th  className = "bg-light">
                              <span className = "dash-bar">Duration</span>
                          </th>
                          <th  className = "bg-light text-center">
                              <span className = "dash-bar">Action</span>
                          </th>
                          <th className = "text-center bg-light">
                              <span className = "dash-bar"></span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                      {data2.map((dashboards) =>{
                          const{_id, title,assignedMembers,startDate,endDate,status} = dashboards
                          return(   
                         <tr key = {_id} className = "">
                           <td>
                               <div className = "mt-2 pt-1 ms-2 head">
                                 <span className = "heading-task">{title}</span> 
                               </div>
                           </td>
                           <td>
                             <div className = "head-pic">
                               {dashboards.assignedMembers.map((img)=>{
                                   return(
                                        <img src={img.profileImage} key = {img._id} alt=""  className = "k mt-2 pt-1"/>
                                   )
                               })}
                             </div>
                           </td>
                           <td>
                               <div className = "mt-2 head-date ">
                                   <p className = "start">Start: {startDate.slice(0, 10)}</p>
                                   <p className = "end">End: {endDate.slice(0, 10)}</p>
                               </div>
                           </td>
                           <td>
                               <div className = "mt-3 text-center ">
                                 <p className = {`action-status ${status.replace(/\s+/, "-").toLowerCase()}`} >{status}</p>
                               </div>
                           </td>
                           <td className = " ">
                             <div className = "d-flex justify-content-center mt-3 gap-2 ">
                               <img src= {dashboardimage} alt="" role = "button" onClick = {()=>getTaskById(_id)}/>
                               <img src= {dashboarddelete} alt="" role = "button" onClick = {()=>deleteTask(_id)} />
                             </div>
                           </td>
                         </tr>
                          )
                      })}
                    
                     </tbody>
                    </Table>
                    <Modal size = "lg" show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title  className = "profile-h2">Task Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedTask ? (
              <>
                <div className = "d-flex justify-content-between mt-2 fix mb-3">
                <div className =  "d-flex align-items-center task-space ">
                   <h3 className = "task-name">Task Name:</h3>
                   <h6 className = "api">{selectedTask.title}</h6>
                </div>
                <div className = "d-flex align-items-center task-spaces">
                   <h3 className = "task-name">Team:</h3>
                   <div>
                  {selectedTask.assignedMembers.map((img)=>{
                  return(
                    <img src={img?.profileImage} alt="" className = "k" />
                  )
                })}
                   </div>
                </div>
              </div>
              <div className = "d-flex justify-content-between  mb-3 fix">
                <div className =  "d-flex align-items-center task-spacess ">
                   <h3 className = "task-name">Start Date:</h3>
                   <h6 className = "api">{selectedTask.startDate.slice(0, 10)}</h6>
                 </div>
                <div className =  "d-flex align-items-center task-spacesss">
                   <h3 className = "task-name">End Date:</h3>
                   <h6 className = "api">{selectedTask.endDate.slice(0, 10)}</h6>
                 </div>
              </div>
              <div className = "d-flex justify-content-between  mb-3 fix">
                <div className =  "d-flex align-items-center task-sppace">
                   <h3 className = "task-name">Description:</h3>
                   <h6 className = "api">Nil</h6>
                 </div>
                <div className =  "d-flex align-items-center task-sppaces">
                   <h3 className = "task-name">Status:</h3>
                   <div className = 'task-test'>
                      <h6 className = {`action-status  ${selectedTask.status.replace(/\s+/, "-").toLowerCase()}`} >{selectedTask.status}</h6>
                   </div>
                 </div>
              </div>
                {/* <p><strong className = 'task-name'>Status:</strong> <span className = {`action-status ${selectedTask.status.replace(/\s+/, "-").toLowerCase()}`} >{selectedTask.status}</span> </p> */}
                <div className =  "d-flex align-items-center gap-4" >
                   <h3 className = "task-name">Assigned Members:</h3>
                   <h6 className = "api">{selectedTask.assignedMembers.map(member => `${member.firstName} ${member.lastName}`).join(', ')}</h6>
                </div>
              </>
            ) : (
              <Loader />
            )}
          </Modal.Body>
        </Modal>
                    </div>
                     

                <ModalTask
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
                </section>

               </section>
           </main>

        </>
    )
}

export default TaskBoard
