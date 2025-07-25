import React from 'react'
import {DashboardEmploy} from "../../db"
import '../../Style/AdminSummary.css'
import "../../Style/EmployeeSummary.css"
import {useState, useEffect} from 'react'
import axios from "axios"
import Loadings from "../../utils/Loadings"
import OpenContext from '../../context/OpenContext'
import { useContext, useRef } from 'react';
import dashboardimage from "../../assets/ellipsis-svgrepo-com.svg"
import 'simplebar-react/dist/simplebar.min.css';
import SimpleBar from 'simplebar-react';
import cancel from '../../assets/Stockholm-icons (11).svg';


const EmployeeSummary = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    const { open } = useContext(OpenContext)

    const token = localStorage.getItem("hr-token");

    const modalRef = useRef();


    useEffect(() => {
      function handleClickOutside(event) {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
          setShowModal(false);
        }
      }
  
      if (showModal) {
        document.addEventListener("mousedown", handleClickOutside);
      } else {
        document.removeEventListener("mousedown", handleClickOutside);
      }
  
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [showModal]);

    useEffect(() => {
        const fetchAssignedTasks = async () => {
          try {
            const response = await axios.get('https://mern-backend-1-9jn6.onrender.com/api/task/tasks/assigned', {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
            setTasks(response.data.tasks);
            console.log(response.data.tasks);
            
          } catch (err) {
            setError(err.response?.data?.errMsg || 'An error occurred while fetching tasks.');
          } finally {
            setLoading(false);
          }
        };
    
        fetchAssignedTasks();
      }, [token]);
      if (loading) return <div className = 'min-h-screen flex justify-center items-center'><Loadings/></div>;
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

      const handleOpenModal = (_id) => {
        setShowModal(true); 
        getTaskEmployeeById(_id)       
      };




    return (
        <>
            <main className = "px-3 md:px-0 lg:px-0 w-19/20 mx-auto max-w-full">
              <section >
                <section className = "py-6">
                    <h1 className = "mb-5 font-inter text-xl text-[#161E54] font-medium ">Dashboard</h1>
                    <div className = "flex flex-col gap-7 md:gap-6 lg:gap- w-full md:flex-wrap md:flex-row lg:flex-row  justify-between">
                    {DashboardEmploy.map((Dashboard)=>{
                        const {id, names,number, Icons} = Dashboard
                        return (
                                <div key = {id} className = {`flex w-full  py-3 px-4 ${open ? 'md:w-full lg:w-[48%] xl:w-[31%] ' : 'md:w-[48%] lg:w-[48%] xl:w-[31%]'} justify-between items-center border-1 border-[#F1F2F3] rounded-[10px]`}>
                                    <div className = "flex flex-col gap-4">
                                        <h6 className = 'font-sans font-medium text-base text-[#706D6D]'>{names}</h6>
                                        <h1 className = 'font-poppins font-semibold text-[1.7rem] text-[#1E1E1E]'>{number} </h1>
                                    </div>
                                    <div>
                                        <img src= {Icons} alt="dashbaord-images" className = 'w-13 h-13' />
                                    </div>
                                </div>
                               )  
                           })}
                    </div>
                </section>
                <section className = "my-5 border-[0.1px] border-[#E4E8ED] rounded-lg">
                    <h2 className = "font-inter font-medium text-xl ps-4 py-2  borde text-[#292929]">Recent Activities</h2>
                    <SimpleBar forceVisible="x" autoHide={false} style={{ maxWidth: '100%' }}>
                    <div className = "min-w-[1000px] w-full">
                    <table className=" table-auto w-full border-[0.5px] border-[#E4E8ED] rounded-lg ">
                      <thead>
                        <tr className = 'text-left bg-[#F7F9FB] rounded  '>
                          <th  className = "whitespace-nowra py-2 ps-4 font-inter font-medium text-base text-[#292929]">
                            Task
                          </th>
                          <th className = 'py-2  font-inter font-medium text-base text-[#292929]'>
                            Team
                          </th>
                          <th className = "py-2  font-inter font-medium text-base text-[#292929]">
                            Duration
                          </th>
                          <th className = "whitespace-nowrap py-2 text-center font-inter font-medium text-base text-[#292929]">
                            Action
                          </th>
                          <th className = 'whitespace-nowrap py-2 font-inter font-medium text-base text-[#292929]'>
                            
                          </th>
                        </tr>
                      </thead>
                      <tbody className = 'divide-y divide-[#E4E8ED] '>
                      {tasks?.map((task) =>{
                          const{_id,title} = task
                          return(   
                         <tr key= {_id} className = "bg-white shadow-sm hover:bg-[#F7F9FB] transition duration-200">
                           <td className = 'px-4 ps-4 whitespace-nowrap'>
                              <span className = "font-inter font-medium text-sm text-[#292929]">{title}</span> 
                           </td>
                           <td>
                             <div className = "flex -space-x-[2px] overflow-hidden">
                               {task?.assignedMembers.slice(0,2).map((img)=>{
                                   return(
                                       <img src={img?.profileImage} key = {img._id} alt=""  className = "inline-block h-6 w-6 rounded-full ring-2 ring-white"/>
                                     )
                                  })}
                             </div>
                           </td>
                           <td className = 'flex flex-col whitespace-nowrap'>
                                <span className = "font-inter font-normal text-sm text-[#292929]">Start: {task.startDate.slice(0,10)}</span>
                                <span className = "font-inter font-normal text-sm text-[#8C8C8C]">End: {task.endDate.slice(0,10)}</span>
                           </td>
                           <td className = 'whitepsace-nowrap py-3 mx- text-center'>
                                 {/* <p className = {`action-status ${task.status.replace(/\s+/, "-").toLowerCase()}`} >{task.status}</p> */}
                              <span className = {` font-inter font-regular text-sm rounded-full px-4 py-1
                                 ${task.status.toLowerCase() === "planned"  ? "bg-[#FFF5E3] text-[#F29B07]  " :
                                   task.status.toLowerCase() === "completed" ? "bg-[#E5FFF7] text-[#0D805D]" :
                                   task.status.toLowerCase() === "in progress" ? "bg-[#9DD2EF42]  text-[#137FF2] " :
                                    ""
                                } `}>{task.status}</span>
                           </td>
                           <td className = " ">
                               <img src= {dashboardimage} alt="" className = 'w-6 h-6' role = "button" onClick = {()=>handleOpenModal(_id)} />
                           </td>
                         </tr>
                          )
                      })}
                     </tbody>
                    </table>
                    </div>
                    </SimpleBar>

                    {/*  */}

                    {showModal && (
                      <div className="fixed inset-0 px-4 md:px-0 backdrop-blur-[1.4px] bg-black/30 flex items-center justify-center z-50">
                        <div ref={modalRef} onClick={(e) => e.stopPropagation()} className="bg-white rounded-xl shadow-lg transform transition-all duration-100 ease-in-out  opacity-100 animate-modalFade w-full max-w-2xl ">
                          <div className = 'flex  py-3 px-4 justify-between items-center border-b-1 border-[#D9D9D9] '>
                            <h2 className = 'font-sans text-[#292929] font-semibold text-xl '>Task Details</h2>
                            <img src= {cancel} onClick={() =>setShowModal(false)} className = 'w-7 h-7' alt=""/>
                          </div>
                          <div>
                            {selectedTask ? (
                              <>
                               <section className = 'm-4 py-  flex flex-col gap-3  md:w-8/9 max-w-full'>
                                <div className = "flex w-full flex-col md:flex-row gap-x- gap-y-4 justify-between ">
                                    <div className =  "flex md:gap-6 md:w-5/9  w-full   align-items-center justify-between ">
                                       <span className = "font-sans font-normal text-sm md:text-bas text-[#747474]">Task Name:</span>
                                       <span className = "font-sans font-medium text-sm md:text-bas text-[#1A1A1A]">{selectedTask.title}</span>
                                    </div>
                                    <div className = "flex md:gap-10  md:w-3/9 w-full align-items-center justify-between  ">
                                       <span className = "font-sans font-normal text-sm md:text-bas text-[#747474]">Team:</span>
                                       <div>
                                          {selectedTask.assignedMembers.slice(0,2).map((img)=>{
                                             return(
                                              <img key = {img._id} src={img?.profileImage} alt="" className = "inline-block h-6 w-6 rounded-full ring-2 ring-white" />
                                              )
                                          })}
                                        </div>
                                     </div>
                                </div>
                                <div className = "flex w-full gap-4 flex-col md:flex-row gap-y- justify-between ">
                                    <div className =  "flex md:gap- w-full md:w-5/9 items-center justify-between md:justify-star ">
                                       <span className = "font-sans font-normal text-sm  text-[#747474]">Start Date:</span>
                                       <span className = "font-sans font-medium text-sm  text-[#1A1A1A]">{selectedTask.startDate.slice(0, 10)}</span>
                                    </div>
                                    <div className =  "flex md:gap w-full md:w-3/9 items-center justify-between ">
                                       <span className = "font-sans font-normal text-sm  text-[#747474]">End Date:</span>
                                       <span className = "font-sans font-medium text-sm  text-[#1A1A1A]">{selectedTask.endDate.slice(0, 10)}</span>
                                    </div>
                                </div>
                                <div className = "flex w-full mb-2 flex-col md:flex-row gap-y-4  md:justify-between ">
                                    <div className =  "flex md:gap-  w-full md:w-5/9 items-cente justify-between  ">
                                       <span className = " w-1/2 font-sans  font-normal text-sm  text-[#747474]">Assigned Member:</span>
                                       <span className = " w-1/2 text-end font-sans font-medium text-sm  text-[#1A1A1A]">{selectedTask.assignedMembers.slice(0,2).map(member => `${member.fullName}`).join(', ')}</span>
                                    </div>
                                    <div className =  "flex md:gap w-full  md:w-3/9 items-center justify-between ">
                                       <span className = "font-sans font-normal text-sm md:text-b text-[#747474]">Status:</span>
                                       <span className = {` font-inter font-regular text-sm rounded-full px-4 py-1
                                          ${selectedTask.status.toLowerCase() === "planned"  ? "bg-[#FFF5E3] text-[#F29B07]  " :
                                          selectedTask.status.toLowerCase() === "completed" ? "bg-[#E5FFF7] text-[#0D805D]" :
                                          selectedTask.status.toLowerCase() === "in progress" ? "bg-[#9DD2EF42]  text-[#137FF2] " :
                                          ""
                                        } 
                                     `}>{selectedTask.status}</span>
                                    </div>
                                </div>
                                <hr className = 'border-[#00000017] py-2'/>
                               </section>
                              </>
                              ) : (
                              <Loadings/>
                            )}
                            
                          </div>
                        </div>
                      </div>

                    )}

                     {/* <div className = "d-flex justify-content-between align-items-center container py-3">
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
                     </div> */}
                </section>
                </section>

            </main>
        </>
    )
}

export default EmployeeSummary
