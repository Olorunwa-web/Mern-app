import React from 'react'
import {Dashboard} from '../../db'
import '../../Style/AdminSummary.css'
import {DashboardPages} from '../../db'
import axios from "axios"
import { useState, useContext } from 'react';
import peopleImg from "../../assets/Frame 7 (4).svg"
import taskImg from "../../assets/Frame 7 (1).svg"
import calenderImg from "../../assets/Frame 7 (2).svg"
import { useEffect } from 'react';
import Loader from "../../utils/Loader"
import dashboardimage from "../../assets/dashboard_31dp_314D1C_FILL0_wght400_GRAD0_opsz24.svg"
import dashboarddelete  from "../../assets/delete_31dp_EA3323_FILL0_wght400_GRAD0_opsz24.svg"
import OpenContext from '../../context/OpenContext';
import 'simplebar-react/dist/simplebar.min.css';
import SimpleBar from 'simplebar-react';

const AdminSummary = () => {
    const [data, setData] = useState([])
    const [data2, setData2] = useState([])
    const token = localStorage.getItem("hr-token");

    const [selectedTask, setSelectedTask] = useState(null);
    const [error, setError] = useState(null)
    const [showModal, setShowModal] = useState(false);
    const [isLoading,setIsLoading] = useState(false);
    const { open } = useContext(OpenContext);

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
            <main className = "px-3 md:px-0 lg:px-0 w-19/20 mx-auto max-w-full">
              <section className = ''>

                <section className = "py-7">
                    <h1 className = "mb-5 font-inter text-2xl md:text-xl text-[#161E54] font-medium  ">Dashboard</h1>
                    <div className = "flex flex-col gap-7 md:gap-6 lg:gap- w-full md:flex-wrap md:flex-row lg:flex-row  justify-between" >
                    {data.map((Dashboard)=>{
                        const { title, count} = Dashboard
                        return(
                                <div key = {title} className = {`flex w-full  py-3 px-4 ${open ? 'md:w-full lg:w-[48%] xl:w-[31%] ' : 'md:w-[48%] lg:w-[48%] xl:w-[31%]'} justify-between items-center border-1 border-[#F1F2F3] rounded-[10px]`}>
                                    <div className = "flex flex-col gap-4 ">
                                        <h6 className = 'font-sans font-medium text-base text-[#706D6D] '>{title}</h6>
                                        <h1 className = 'font-poppins font-semibold text-3xl text-[#1E1E1E]'>{count} </h1>
                                    </div>
                                    <div>
                                      {title === "Total Employees" ?   <img src={peopleImg} className = 'w-15 h-15' alt="event-img" loading="lazy" /> :title === "Total Tasks" ? <img src={taskImg} alt="event-img" className = 'w-15 h-15' loading="lazy" /> :<img src={calenderImg} alt="event-img" className = 'w-15 h-15' loading="lazy" /> }
                                    </div>
                                </div>
                               )  
                           })}
                     </div>
                </section>
                <section className = "mt-5 border-[0.5px] border-[#E4E8ED] rounded-lg"> 
                    <h2 className = "font-inter font-medium text-xl ps-4 py-2  borde text-[#292929] ">Taskboard</h2>
                    <SimpleBar forceVisible="x" autoHide={false} style={{ maxWidth: '100%' }}>
                   <div className = "min-w-[1000px] w-full"> 
                    <table  className=" table-auto w-full ">
                      <thead className = " ">
                        <tr className = 'text-left bg-[#F7F9FB] rounded  '>
                          <th className = 'whitespace-nowra py-2 ps-4 font-inter font-medium text-base text-[#292929]'>
                              Task
                          </th>
                          <th className = "whitespace-nowra py-2  font-inter font-medium text-base text-[#292929]">
                              Team
                          </th>
                          <th className = "whitespace-nowra py-2 font-inter font-medium text-base text-[#292929]">
                              Duration
                          </th>
                          <th className = "whitespace-nowrap py-2 text-center font-inter font-medium text-base text-[#292929]">
                              Action
                          </th>
                          <th className = "whitespace-nowrap py-2 font-inter font-medium text-base text-[#292929]">
                              
                          </th>
                        </tr>
                      </thead>
                      <tbody className = 'divide-y divide-[#E4E8ED] '>
                      {data2.map((dashboards) =>{
                          const{_id, title,assignedMembers,startDate,endDate,status} = dashboards
                          return(   
                         <tr key = {_id}  className=" bg-white shadow-sm hover:bg-[#F7F9FB] transition duration-200">
                           <td className = "px-4   ps-4 whitespace-nowrap">
                             <span className = 'font-inter font-medium text-sm text-[#292929]'>{title}</span>
                           </td>
                           <td className = {` ${open ? 'md:whitespace-nowra' : ''}`}>
                             <div className =  ' flex -space-x-1 overflow-hidden'>
                               {dashboards.assignedMembers.map((img)=>{
                                   return(
                                        <img src={img.profileImage} key = {img._id} alt=""  className = "inline-block h-6 w-6 rounded-full ring-2 ring-white"/>
                                     )
                                 })}
                             </div>
                           </td>
                           <td className = ' flex flex-col whitespace-nowrap'>
                                 <span className = "font-inter font-normal text-sm text-[#292929]">Start: {startDate.slice(0, 10)}</span>
                                 <span className = "font-inter font-normal text-sm text-[#8C8C8C]">End: {endDate.slice(0, 10)}</span>
                           </td>
                           <td className = ' whitepsace-nowrap py-3 mx- text-center '>
                               {/* <span className = {`action-status ${status.replace(/\s+/, "-").toLowerCase()}`} >{status}</span> */}
                               <span className = {` font-inter font-regular text-sm rounded-full px-4 py-1
                                   ${status.toLowerCase() === "planned"  ? "bg-[#FFF5E3] text-[#F29B07]  " :
                                     status.toLowerCase() === "completed" ? "bg-[#E5FFF7] text-[#0D805D]" :
                                     status.toLowerCase() === "in progress" ? "bg-[#9DD2EF42]  text-[#137FF2] " :
                                     ""
                                  } 
                               
                               `}>{status}</span>
                           </td>
                           <td className = "">
                             <div className = "flex  gap-2 ">
                               <img className = 'w-5 h-5' src= {dashboardimage} alt="" role = "button" onClick = {()=>getTaskById(_id)}/>
                               <img className = 'w-5 h-5' src= {dashboarddelete} alt="" role = "button" onClick = {()=>deleteTask(_id)} />
                             </div>
                           </td>
                         </tr>
                          )
                      })}
                     </tbody>
                    </table>
                    </div>
                    </SimpleBar>
                    {/* <Modal size = "lg" show={showModal} onHide={() => setShowModal(false)} centered>
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
                <div className =  "d-flex align-items-center gap-4 assign-space" >
                   <h3 className = "task-name">Assigned Members:</h3>
                   <h6 className = "api">{selectedTask.assignedMembers.map(member => `${member.firstName} ${member.lastName}`).join(', ')}</h6>
                </div>
              </>
            ) : (
              <Loader />
            )}
          </Modal.Body>
        </Modal> */}
                </section>
              </section>
            </main>
        </>
    )
}

export default AdminSummary
