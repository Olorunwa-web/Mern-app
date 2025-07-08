import React from 'react'
import {Dashboard} from '../../db'
import '../../Style/AdminSummary.css'
import {DashboardPages} from '../../db'
import Table from 'react-bootstrap/Table';
import axios from "axios"
import { useState } from 'react';
import peopleImg from "../../assets/Frame 7 (4).svg"
import taskImg from "../../assets/Frame 7 (1).svg"
import calenderImg from "../../assets/Frame 7 (2).svg"
import { useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Loader from "../../utils/Loader"
import dashboardimage from "../../assets/dashboard_31dp_314D1C_FILL0_wght400_GRAD0_opsz24.svg"
import dashboarddelete  from "../../assets/delete_31dp_EA3323_FILL0_wght400_GRAD0_opsz24.svg"


const AdminSummary = () => {
    const [data, setData] = useState([])
    const [data2, setData2] = useState([])
    const token = localStorage.getItem("hr-token");

    const [selectedTask, setSelectedTask] = useState(null);
    const [error, setError] = useState(null)
    const [showModal, setShowModal] = useState(false);
    const [isLoading,setIsLoading] = useState(false);

    const getCounts = async ()=>{
        try {
            const req = await axios.get("https://mern-backend-1-9jn6.onrender.com/api/count/count", {
                headers:{
                    Authorization: `Bearer ${token}`,
                }
            })
            console.log(req.data.eventLenght);

            setData(req.data.eventLenght)
        } catch (error) {
            
        }
    }

    useEffect(()=>{
        getCounts()
    }, [])



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
            <main className = "summary-container">
                <section className = "pt-3">
                    <h1 className = "dash mb-2">Dashboard</h1>
                    <div className = "d-flex  justify-content-between  dashboard-flexx d-lg-flex flex-md-wrap" >
                    {data.map((Dashboard)=>{
                        const { title, count} = Dashboard
                        return(
                                <div key = {title} className = "d-flex justify-content-between dashboard-flex">
                                    <div className = "total">
                                        <h6>{title}</h6>
                                        <h1>{count} </h1>
                                    </div>
                                    <div>
                                      {title === "Total Employees" ?   <img src={peopleImg} className = 'people-img' alt="event-img" loading="lazy" /> :title === "Total Tasks" ? <img src={taskImg} alt="event-img" className = 'people-img' loading="lazy" /> :<img src={calenderImg} alt="event-img" className = 'people-img' loading="lazy" /> }
                                    </div>
                                </div>
                            )  
                    })}

                    </div>
                </section>
                <section className = "dashboard-task my-4">
                    <h2 className = "heading-3 pt-3 pb-1 ps-3">Taskboard</h2>
                    <div className = "place-ment employee-table"> 
                    {/* <Table responsive hover>
                      <thead className = "threadd">
                        <tr className = "">
                          <th className = 'bg-light bor'>
                              <span className = "dash-bar ms-2 ">Task</span>
                          </th>
                          <th className = "bg-light">
                              <span className = "dash-bar">Team</span>
                          </th>
                          <th className = "bg-light">
                              <span className = "dash-bar">Duration</span>
                          </th>
                          <th className = "text-center bg-light">
                              <span className = "dash-bar">Action</span>
                          </th>
                          <th className = "text-center bg-light bors">
                              <span className = "dash-bar"></span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                      {data2.map((dashboards) =>{
                          const{_id, title,assignedMembers,startDate,endDate,status} = dashboards
                          return(   
                         <tr key = {_id} className = "">
                           <td className = "hea">
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
                               <div className = "mt-3 text-center">
                                 <p className = {`action-status ${status.replace(/\s+/, "-").toLowerCase()}`} >{status}</p>
                               </div>
                           </td>
                           <td className = "">
                             <div className = "d-flex justify-content-center mt-3 gap-2 ">
                               <img src= {dashboardimage} alt="" role = "button" onClick = {()=>getTaskById(_id)}/>
                               <img src= {dashboarddelete} alt="" role = "button" onClick = {()=>deleteTask(_id)} />
                             </div>
                           </td>
                         </tr>
                          )
                      })}
                     </tbody>
                    </Table> */}

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
              <div className = "d-flex justify-content-between mb-3 fix">
                <div className =  "d-flex align-items-center task-sppace">
                   <h3 className = "task-name">Description:</h3>
                   <h6 className = "api">Nil</h6>
                 </div>
                <div className =  "d-flex align-items-center  task-sppaces">
                   <h3 className = "task-name">Status:</h3>
                   <div className = 'task-test'>
                     <h6 className = {`action-status spacin  ${selectedTask.status.replace(/\s+/, "-").toLowerCase()}`} >{selectedTask.status}</h6>
                   </div>
                </div>
              </div>
                {/* <p><strong className = 'task-name'>Status:</strong> <span className = {`action-status ${selectedTask.status.replace(/\s+/, "-").toLowerCase()}`} >{selectedTask.status}</span> </p> */}
                <div className =  "d-flex align-items-center gap-4 assign-space" >
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
                </section>
            </main>
        </>
    )
}

export default AdminSummary
