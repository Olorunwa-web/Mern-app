import React from 'react'
import {DashboardEmploy} from "../../db"
import '../../Style/AdminSummary.css'
import "../../Style/EmployeeSummary.css"
import Table from 'react-bootstrap/Table';
import {DashboardPagesEmploy} from "../../db";
import {useState, useEffect} from 'react'
import Modal from 'react-bootstrap/Modal';
import axios from "axios"
import dashboardimage from "../../assets/dashboard_31dp_314D1C_FILL0_wght400_GRAD0_opsz24.svg"
import Loader from "../../utils/Loader";




const EmployeeSummary = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);


    const token = localStorage.getItem("hr-token");

    useEffect(() => {
        const fetchAssignedTasks = async () => {
          try {
            const response = await axios.get('https://mern-backend-1-9jn6.onrender.com/api/task/tasks/assigned', {
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
          const req = await axios.get(`https://mern-backend-1-9jn6.onrender.com/api/task/tasks/${taskId}`,{
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
                <section>
                <section className = "pt-3">
                    <h1 className = "dash mb-2">Dashboard</h1>
                    <div className = "d-flex  justify-content-between gap-2 dashboard-flexx d-lg-flex flex-wrap">
                    {DashboardEmploy.map((Dashboard)=>{
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
                <section className = "dashboard-emp my-4">
                    <h2 className = "heading-3 pt-2  ps-3">Recent Activities</h2>
                    <div>
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
                        
                    </div>
                     <div className = "d-flex justify-content-between align-items-center container py-3">
                        <div>
                            <p className = "entries">10 Entries per pages</p>
                        </div>

                        <div>
                            <p className = "entriess">Page 1 of 1</p>
                        </div>
                        <div className = "d-flex gap-2">
                            <button className = "previous">Previous</button>
                            <button className = "next">Next</button>
                        </div>

                    </div>
                </section>
                </section>

            </main>
        </>
    )
}

export default EmployeeSummary
