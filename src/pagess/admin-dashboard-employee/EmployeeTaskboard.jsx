import React from 'react'
import {TaskboardEmploy} from "../../db"
import {DashboardPages} from '../../db'
import Table from 'react-bootstrap/Table';
import {useState, useEffect} from 'react'
import Modal from 'react-bootstrap/Modal';
import arrowDown from '../../assets/Frame 10.svg';
import axios from "axios"
import dashboardimage from "../../assets/dashboard_31dp_314D1C_FILL0_wght400_GRAD0_opsz24.svg"
import Loader from "../../utils/Loader"





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







const EmployeeTaskboard = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);


    const token = localStorage.getItem("hr-token");


    useEffect(() => {
        const fetchAssignedTasks = async () => {
          try {
            const response = await axios.get('http://localhost:9080/api/task/tasks/assigned', {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
            setTasks(response.data.tasks);
            // console.log(response.data.tasks);
            
          } catch (err) {
            setError(err.response?.data?.errMsg || 'An error occurred while fetching tasks.');
          } finally {
            setLoading(false);
          }
        };
    
        fetchAssignedTasks();
      }, [token]);
      if (loading) return <p>Loading tasks...</p>;
      if (error) return <p>{error}</p>;


      const getTaskEmployeeById = async (taskId)=>{
        try {
          setLoading(true);
          const req = await axios.get(`http://localhost:9080/api/task/tasks/${taskId}`,{
            headers:{
              Authorization: `Bearer ${token}`,
            }
          })
          setSelectedTask(req.data.task);
          setShowModal(true);
          console.log(req.data.task);
       
        } catch (error) {
        
        }finally {
          setLoading(false);
        }
      }



    return (
        <>
            <main className = "summary-container">
            <section className = "pt-3">
                    <h1 className = "dash mb-2">Dashboard</h1>
                    <div className = "d-flex  justify-content-between gap-2 dashboard-flexx d-lg-flex flex-wrap">
                    {TaskboardEmploy.map((Dashboard)=>{
                        const {id, names,number, Icons} = Dashboard
                        return(
                                <div key = {id} className = "d-flex justify-content-between dashboard-flex">
                                    <div className = "total">
                                        <h4>{names}</h4>
                                        <h1>{number} </h1>
                                    </div>
                                    <div>
                                        <img src= {Icons} alt="dashbaord-images"/>
                                    </div>
                                </div>
                            )  
                    })}

                    </div>
                </section>
                <section className = "dashboard-task my-4">
                    <h2 className = "heading-3 pt-2  ps-3">Taskboard</h2>
                    <div className = "employee-table">
                    <Table responsive = "lg" hover>
                      <thead className = "threadd">
                        <tr>
                          <th  className = "bg-light bor">
                              <span className = "dash-bar ms-2">Task</span>
                          </th>
                          <th className = 'bg-light'>
                              <span className = "dash-bar ">Team</span>
                          </th>
                          <th className = "bg-light">
                              <span className = "dash-bar">Duration</span>
                          </th>
                          <th className = "bg-light text-center">
                              <span className = "dash-bar">Action</span>
                          </th>
                          <th className = "text-center bg-light bors">
                              <span className = "dash-bar"></span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                      {tasks?.map((task) =>{
                          const{_id,title} = task
                          return(   
                         <tr key= {_id} className = "">
                           
                           <td>
                               <div className = "mt-2 pt-1 ms-2 head">
                                 <span className = "heading-task">{title}</span> 
                               </div>
                           </td>
                           <td>
                           <div className = "head-pic">
                               {task?.assignedMembers.slice(0,2).map((img)=>{
                                   return(
                                        <img src={img?.profileImage} key = {img._id} alt=""  className = "k mt-2 pt-1"/>
                                   )
                               })}
                             </div>
                           </td>
                           <td>
                               <div className = "mt-2 head-date ">
                                   <p className = "start">Start: {task.startDate.slice(0,10)}</p>
                                   <p className = "end">End: {task.endDate.slice(0,10)}</p>
                               </div>
                           </td>
                           <td>
                               <div className = "mt-3 text-center">
                                 <p className = {`action-status ${task.status.replace(/\s+/, "-").toLowerCase()}`} >{task.status}</p>
                               </div>
                           </td>
                           <td className = " ">
                             <div className = "d-flex justify-content-center mt-3 gap-2 grid-space ">
                               <img src= {dashboardimage} alt="" role = "button" onClick = {()=>getTaskEmployeeById(_id)} />
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
              <div className = "d-flex justify-content-between mb-3 fix">
                <div className =  "d-flex align-items-center task-sppace">
                   <h3 className = "task-name">Description:</h3>
                   <h6 className = "api">Nil</h6>
                 </div>
                <div className =  "d-flex align-items-center task-sppaces">
                   <h3 className = "task-name">Status:</h3>
                   <h6 className = {`action-status spacing ${selectedTask.status.replace(/\s+/, "-").toLowerCase()}`} >{selectedTask.status}</h6>
                 </div>
              </div>
                {/* <p><strong className = 'task-name'>Status:</strong> <span className = {`action-status ${selectedTask.status.replace(/\s+/, "-").toLowerCase()}`} >{selectedTask.status}</span> </p> */}
                <div className =  "d-flex align-items-center gap-4" >
                   <h3 className = "task-name">Assigned Members:</h3>
                   <h6 className = "api">{selectedTask.assignedMembers.map(member => `${member.firstName} ${member.lastName}`).join(', ')}</h6>
                </div>
              {/* <div className = "d-flex justify-content-between mt-2 fix">
                <p><strong className = "task-name">Task Name:</strong> <span className = 'api'>{selectedTask.title}</span></p>
                <div>
                  <span className = "task-name">Team: </span>
                {selectedTask.assignedMembers.map((img)=>{
                  return(
                    <img src={img?.profileImage} alt=""  className = "k" />
                  )
                })}
                </div>
              </div>
                <div className = "d-flex justify-content-between fix">
                 <p><strong className = "task-name">Start Date:</strong> <span className = "api">{selectedTask.startDate.slice(0, 10)}</span> </p>
                 <p><strong className = "task-name">End Date:</strong> <span className = "api">{selectedTask.endDate.slice(0, 10)}</span> </p>
                </div>
                <p><strong className = 'task-name'>Status:</strong> <span className = {`action-status ${selectedTask.status.replace(/\s+/, "-").toLowerCase()}`} >{selectedTask.status}</span> </p>
                <p> <strong className = "task-name">Assigned Members:</strong> <span className = "api">{selectedTask.assignedMembers.map((member) => `${member.firstName} ${member.lastName}`).join(", ")}</span> </p> */}
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

export default EmployeeTaskboard
