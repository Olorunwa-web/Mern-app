import React from 'react'
import {Taskboard} from '../../Taskboard'
import {DashboardPages} from '../../db'
import '../../Style/Taskboard.css'
import { useState, useEffect, useContext, useRef } from 'react';
import arrowDown from '../../assets/Frame 10.svg';
import axios from "axios"
import Loader from "../../utils/Loader"
import dashboardimage from "../../assets/ellipsis-svgrepo-com.svg"
import dashboarddelete  from "../../assets/icons8-delete.svg";
import OpenContext from '../../context/OpenContext';
import 'simplebar-react/dist/simplebar.min.css';
import SimpleBar from 'simplebar-react';
import cancel from '../../assets/Stockholm-icons (11).svg';
import toast, { LoaderIcon } from "react-hot-toast";
import add from "../../assets/Stockholm-icons (8).svg";
import ModalTask from '../../Components/ModalTask'

const TaskBoard = () => {

    const [data2, setData2] = useState([])
    const token = localStorage.getItem("hr-token");

    const [selectedTask, setSelectedTask] = useState(null);
    const [error, setError] = useState(null)
    const [isLoading,setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false)
     const modalRef = useRef();

     const [isModalOpen, setIsModalOpen] = useState(false);

    const { open } = useContext(OpenContext);

    useEffect(() => {
      function handleClickOutside(event) {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
          setIsOpen(false);
        }
      }
  
      if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside);
      } else {
        document.removeEventListener("mousedown", handleClickOutside);
      }
  
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [isOpen]);

    // =============== to create new task ============ 

   

// ============================================================================= task

    
  
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

      const handleOpenModal = (_id) => {
        setIsOpen(true);        
        getTaskById(_id);         
      };
// ====================== api for create  new task  =======================================================



// =============================================================


    return (
        <>
           <main className = "px-3 md:px-0 lg:px-0 w-19/20 mx-auto max-w-full">
               <section className = '' >
                   <div className = "my-5 flex justify-between items-center "> 
                   <div className = 'flex flex-col gap-1'>
                        <h1 className = "font-sans text-xl text-[#161E54] font-medium">Taskboard</h1>
                        <h4 className = "font-sans text-base text-[#404040] font-medium">Dashboard/Taskboard</h4>
                   </div>
                    <div>
                         <button className = "bg-[#3439CA] cursor-pointer p-2 rounded-sm text-white font-medium text-sm font-neural " onClick= {() => setIsModalOpen(true)}  >New Task</button>  
                   </div>
                   </div>
                   <div className = 'my-6'>
                   <div className = " flex flex-col gap-7 md:gap-6 lg:gap- w-full md:flex-wrap md:flex-row lg:flex-row  justify-between ">
                       {Taskboard.map((taskss)=>{
                           const {id,names,number,Icons} = taskss
                           return(
                               <div key = {id} className = {`flex w-full  py-4 px-4 ${open ? 'md:w-full lg:w-[48%] xl:w-[23%] ' : 'md:w-[48%] lg:w-[23%] xl:w-[23%]'} justify-between  border-1 border-[#F1F2F3] rounded-[10px]`}>
                                   <div className = "flex flex-col gap-4" >
                                       <h5 className = "font-sans font-medium text-base text-[#2F2B2BB0]">{names}</h5>
                                       <h1 className = "font-sans font-bold text-[1.8rem] text-[#1E1E1E]">{number}</h1>
                                   </div>
                                   <div>
                                       <img src= {Icons} className = 'md:w-8 md:h-8' alt=""/>
                                   </div>
                               </div>
                           )
                       })} 
                   </div>
                   </div>

                   <section className = "my-5 border-[0.1px] border-[#E4E8ED] rounded-lg"> 
                    <h2 className = "font-inter font-medium text-xl ps-4 py-2  text-[#292929] ">Taskboard</h2>
                    <SimpleBar forceVisible="x" autoHide={false} style={{ maxWidth: '100%' }}>
                   <div className = "min-w-[1000px] w-full"> 
                    <table  className=" table-auto w-full border-[0.5px] border-[#E4E8ED] rounded-lg ">
                      <thead className = " ">
                        <tr className = 'text-left bg-[#F7F9FB]   '>
                          <th className = 'whitespace-nowra py-2 ps-4 font-inter font-medium text-base text-[#292929]'>
                              Task
                          </th>
                          <th className = " py-2  font-inter font-medium text-base text-[#292929]">
                              Team
                          </th>
                          <th className = " py-2 font-inter font-medium text-base text-[#292929]">
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
                           <td className = "px-4 ps-4 whitespace-nowrap">
                             <span className = 'font-inter font-medium text-sm text-[#292929]'>{title}</span>
                           </td>
                           <td className = {` ${open ? 'md:whitespace-nowra' : ''}`}>
                             <div className =  ' flex -space-x-[2px] overflow-hidden'>
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
                             <div className = "flex  gap-3 items-center ">
                               <img className = 'w-5 h-5' src= {dashboarddelete} alt="" role = "button" onClick = {()=>deleteTask(_id)} />
                               <img className = 'w-6 h-6' src= {dashboardimage} alt="" role = "button" onClick = {()=> handleOpenModal(_id)}  />
                             </div>
                           </td>
                         </tr>
                          )
                      })}
                     </tbody>
                    </table>
                    </div>
                    </SimpleBar>

                    {/*  */}

                    {isOpen && (
                        <div className="fixed inset-0 px-4 md:px-0 bg-black/30 flex items-center justify-center z-50">
                        <div ref={modalRef} onClick={(e) => e.stopPropagation()} className="bg-white rounded-xl shadow-lg transform transition-all duration-100 ease-in-out  opacity-100 animate-modalFade w-full max-w-2xl text-center">
                          <div className = 'flex  py-3 px-4 justify-between items-center border-b-1 border-[#D9D9D9] '>
                            <h2 className = 'font-sans text-[#292929] font-semibold text-xl '>Task Details</h2>
                            <img src= {cancel} onClick={() => setIsOpen(false)} className = 'w-7 h-7' alt=""/>
                          </div>
                          <div>
                            {selectedTask ? (
                              <>
                               <section className = 'm-4 py-  flex flex-col gap-3  md:w-8/9 max-w-full'>
                                <div className = "flex w-full flex-col md:flex-row gap-x- gap-y-4 justify-between ">
                                    <div className =  "flex md:gap-6 md:w-4/8  w-full   align-items-center justify-between ">
                                       <span className = "font-sans font-normal text-sm md:text-bas text-[#747474]">Task Name:</span>
                                       <span className = "font-sans font-medium text-sm md:text-bas text-[#1A1A1A]">{selectedTask.title}</span>
                                    </div>
                                    <div className = "flex md:gap-10  md:w-3/8 w-full align-items-center justify-between  ">
                                       <span className = "font-sans font-normal text-sm  text-[#747474]">Team:</span>
                                       <div>
                                          {selectedTask.assignedMembers.map((img)=>{
                                             return(
                                              <img src={img?.profileImage} alt="" className = "inline-block h-6 w-6 rounded-full ring-2 ring-white" />
                                              )
                                          })}
                                        </div>
                                     </div>
                                </div>
                                <div className = "flex w-full flex-col md:flex-row gap-y- justify-between ">
                                    <div className =  "flex md:gap-6 w-full md:w-4/8 align-items-center justify-between md:justify-star ">
                                       <span className = "font-sans font-normal text-sm  text-[#747474]">Start Date:</span>
                                       <span className = "font-sans font-medium text-sm  text-[#1A1A1A]">{selectedTask.startDate.slice(0, 10)}</span>
                                    </div>
                                    <div className =  "flex md:gap w-full md:w-3/8 align-items-center justify-between ">
                                       <span className = "font-sans font-normal text-sm  text-[#747474]">End Date:</span>
                                       <span className = "font-sans font-medium text-sm  text-[#1A1A1A]">{selectedTask.endDate.slice(0, 10)}</span>
                                    </div>
                                </div>
                                <div className = "flex w-full mb-2 flex-col md:flex-row gap-y-4  md:justify-between ">
                                    <div className =  "flex md:gap-6 w-full md:w-4/8 items-cente justify-between md:justify-star ">
                                       <span className = "font-sans font-normal text-sm  text-[#747474]">Assigned Member:</span>
                                       <span className = "font-sans font-medium text-sm md:text-bas text-[#1A1A1A]">{selectedTask.assignedMembers.map(member => `${member.firstName}`).join(', ')}</span>
                                    </div>
                                    <div className =  "flex md:gap w-full md:w-3/8 items-center justify-between ">
                                       <span className = "font-sans font-normal text-sm md:text-bas text-[#747474]">Status:</span>
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
                              <Loader/>
                            )}
                            
                          </div>
                        </div>
                      </div>
                    )}
                </section>

                {/*  */}
                <ModalTask isModalOpen = {isModalOpen} setIsModalOpen = {setIsModalOpen} /> 

               </section>
           </main>

        </>
    )
}

export default TaskBoard
