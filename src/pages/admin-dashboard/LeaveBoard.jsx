import React, {useState, useEffect, useRef} from 'react'
import { Leaveboard } from '../../Taskboard'
import '../../Style/Leaveboard.css'
import temilade from '../../assets/Frame 23.svg'
import { useMatch } from 'react-router-dom';
import  Loadings  from "../../utils/Loadings";
import axios from "axios";
import toast from "react-hot-toast"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import * as yup from "yup";
import {leaveSchema} from "../../lib/ValidationSchema"
import OpenContext from '../../context/OpenContext'
import { useContext } from 'react'
import 'simplebar-react/dist/simplebar.min.css';
import SimpleBar from 'simplebar-react';
import dashboardimage from "../../assets/ellipsis-svgrepo-com.svg"
import cancel from '../../assets/Stockholm-icons (11).svg';




  // function RequestLeave() {

  //   const [isLoading, setIsLoading] = useState(false);
  //   const [error, setError] = useState(null);


  //   const token = localStorage.getItem("hr-token");

  //   // const [modalShow, setModalShow] = useState(false)


  //   const {
  //     register,
  //     handleSubmit,
  //     formState: { errors, isSubmitting },
  //   } = useForm({
  //     resolver: yupResolver(leaveSchema),
  //   });
    
  //   const onSubmit = async (data) => {
  //     try {
  //       const req = await fetch("https://mern-backend-1-9jn6.onrender.com/api/leave/apply", {
  //         method: "POST",
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(data),
  //       });
  //       const res = await req.json();
  //       console.log(res);
  //       if (res.success) {
  //         fetchLeaves();
  //         setModalShow(false)
  //         toast.success(res.message);
  //       } else {
  //         toast.error(res.message);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //       setError("Failed to fetch departments");
  //     }
  //     reset();
  //   };
  //   const fetchLeaves = async () => {
  //     setIsLoading(true);
  //     setError(null);
  //     try {
  //       const leaves = await getAllLeaves(token);
  //       setData(leaves);
  //     } catch (error) {
  //       setError("Error fetching leaves");
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   if (isLoading) {
  //     return (
  //       <div className="vh-100 d-flex justify-content-center">
  //         {" "}
  //         <Loadings />{" "}
  //       </div>
  //     );
  //   }
  
  
  //   return (
         
  //     <Modal
  //       {...props}
  //       size="md"
  //       aria-labelledby="contained-modal-title-vcenter"
  //       centered
  //     >
  //       <Modal.Header closeButton>
  //         <Modal.Title className = "leave-emp-h1 px-2" >
  //              Leave Request
  //         </Modal.Title>
  //       </Modal.Header>
  //       <Modal.Body>
  //         <div className = "px-2 leave-emp-space">
  //           <form  onSubmit={handleSubmit(onSubmit)}>
  //              <div className = "mb-3 ">
  //                   <label htmlFor="" className = "labels">Leave Type</label>
  //                   <select name="" id="" className = "w-100 select-input" {...register("leaveType", {required: true})} >
  //                       <option disabled selected hidden >Select</option>
  //                       <option value="casual" className= "labelss">casual</option>
  //                       <option value="sick" className= "labelss">sick</option>
  //                       <option value="annual" className= "labelss">annual</option>
  //                   </select>
  //                   {errors.leaveType && <span className = "spans">{errors.leaveType?.message}</span>}
  //              </div>
  //              <div className = "d-lg-flex gap-4 mb-3">
  //                  <div className = "mobile">
  //                     <label htmlFor="" className = "labels">Start Date</label>
  //                     <input type="date" name="" id="" placeholder = "select Date" className = "w-100 add-input" {...register("startDate", {required: true})}/>
  //                     <span className = "spans">{errors.startDate?.message}</span>
  //                  </div>
  //                  <div className = "mobile">
  //                     <label htmlFor="" className = "labels">End Date</label>
  //                     <input type="date" name="" id="" placeholder = "select Date" className = "w-100 add-input" {...register("endDate", {required: true})} />
  //                     <span className = "spans">{errors.endDate?.message}</span>
  //                  </div>
  //              </div>
  //              <div className = "mb-3">
  //                 <label htmlFor="" className = "labels">Description</label> 
  //                 <textarea name="" id="" cols="30" rows="3"  className = "textA" placeholder = "Type here" {...register("description", {required: true})}></textarea>
  //                 <span className = "spans">{errors.description?.message}</span>
  //              </div>
  //              <div className = "d-flex gap-4 my-4">
  //                 <button className = "cancel" onClick={()=> reset()} disabled = {isSubmitting}>Cancel</button>
  //                 <button className = "save"  type = "submit" disabled = {isSubmitting}>Apply</button> 
  //              </div>
  //           </form>
  //           </div>
  //       </Modal.Body>
        
  //     // </Modal>
  //   );
  // }




const LeaveBoard = () => {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedLeave, setSelectedLeave] = useState(null);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const { open } = useContext(OpenContext)


    const modalRef = useRef();
    const [modalShow1, setModalShow1] = useState(false);

    const token = localStorage.getItem("hr-token");

    // =========================================
    useEffect(() => {
      function handleClickOutside(event) {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
          setShowModal(false);
          setModalShow1(false)
        }
      }
  
      if (showModal, modalShow1) {
        document.addEventListener("mousedown", handleClickOutside);
      } else {
        document.removeEventListener("mousedown", handleClickOutside);
      }
  
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [showModal, modalShow1]);

    // ==========================================


    const fetchLeaves = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const leaves = await getAllLeaves(token); 
        setData(leaves);
      } catch (error) {
        setError("Error fetching leaves");
      } finally {
        setIsLoading(false);
      }
    };


    const handleApprove = async (leaveId) => {
      if (!leaveId) {
        console.error("Invalid id: leaveId is undefined or null");
        return;
      }
      console.log(leaveId);
  
      const token = localStorage.getItem("hr-token");
      try {
        const req = await fetch(
          `https://mern-backend-1-9jn6.onrender.com/api/leave/${leaveId}/approve`,
          {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({}),
          }
        );
        const res = await req.json();
        console.log(res); // Log the response data
        if (res) {
          await getAllLeaves();
          // fetchLeaves();
          toast.success(res.message);
          setShowModal(false);
        } else {
          toast.error(res.message);
        }
      } catch (error) {
        console.error("Error approving leave request:", error);
      }
    };

    const handleDecline = async (leaveId) => {
      if (!leaveId) {
        console.error("Invalid id: leaveId is undefined or null");
        return;
      }
      console.log(leaveId);
  
      const token = localStorage.getItem("hr-token");
      try {
        const req = await fetch(
          `https://mern-backend-1-9jn6.onrender.com/api/leave/${leaveId}/decline`,
          {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({}),
          }
        );
        const res = await req.json();
        console.log(res); // Log the response data
        if (res) {
           await getAllLeaves();
          toast.success(res.message);
          setShowModal(false);
        } else {
          toast.error(res.message);
          setModalShow1(false)
        }
      } catch (error) {
        console.error("Error approving leave request:", error);
      }
    };
  



    const getAllLeaves = async () =>{
        try {
          setIsLoading(true);
          setError(null);
    
          const req = await axios.get(
            "https://mern-backend-1-9jn6.onrender.com/api/leave/all-leaves",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log(req.data.formattedLeaves);
          setData(req.data.formattedLeaves);
        } catch (error) {
          setError("Error fetching tasks");
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      };


      const getSingleLeave = async (leaveId) => {
        console.log("id passed to handleModalShow:", leaveId); // Log the id
        if (!leaveId) {
          console.error("Invalid id: leaveid is undefined or null");
          return; // Exit if leaveid is not valid
        }
        try {
          setIsLoading(true);
          console.log(22);
          const req = await axios.get(
            `https://mern-backend-1-9jn6.onrender.com/api/leave/${leaveId}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          console.log(req.data);
          setSelectedLeave(req.data);
          setShowModal(true);
        } catch (error) {
          setError("Error fetching leave details");
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      };
    


      useEffect(() => {
        getAllLeaves();
      }, []);

// ======================================================================
const {
  register,
  handleSubmit,
  reset,
  formState: { errors, isSubmitting },
} = useForm({
  resolver: yupResolver(leaveSchema),
});

const onSubmit = async (data) => {
  try {
    const req = await fetch("https://mern-backend-1-9jn6.onrender.com/api/leave/apply", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const res = await req.json();
    console.log(res);
    if (res.success) {
      // fetchLeaves();
      await getAllLeaves();
      setModalShow1(false)
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  } catch (error) {
    console.log(error);
    setError("Failed to fetch departments");
  }
  reset();
  // setModalShow1(false);
};


// =======================================================================
      if (isLoading) {
        return (
          <div className="min-h-screen items-center flex justify-center">
            {" "}
            <Loadings />{" "}
          </div>
        );
      }

      const handleRowClick = (leaveId) => {
        getSingleLeave(leaveId);
        // setModalShow(true);
      };


   
    

      if (error) {
        return <div className="error-message">{error}</div>;
      }


    return (
        <>
           <main className = "px-3 md:px-0 lg:px-0 w-19/20 mx-auto max-w-full">
               <section className = 'my-3'>
                 <div className = 'my-6 flex justify-between items-center'>
                   <div className = "flex flex-col gap-1 ">
                      <h1 className = 'font-sans font-medium text-xl text-[#161E54]'>Leaveboard</h1>
                      <h4 className = 'font-sans font-medium text-[15px] md:text-base text-[#404040]'>Dashboard/Leaveboard</h4>
                   </div>
                   <div>
                      <button className = 'bg-[#3439CA] p-2 rounded-sm font-sans font-medium text-[#F3F2FB] text-sm ' onClick= {() => setModalShow1(true)}>Request Leave</button>
                   </div>
                 </div>
                  <div className = "flex flex-col gap-6 md:gap-6 lg:gap- w-full md:flex-wrap md:flex-row lg:flex-row justify-between">
                      {Leaveboard.map((leave) => {
                          const {id,names,number} = leave
                          return(
                              <div key = {id} className = {` w-full text-center py-4 px-4 ${open ? 'md:w-[47%]  lg:w-[48%] xl:w-[23%] ' : 'md:w-[48%] lg:w-[23%] xl:w-[23%]'}   border-1 border-[#F1F2F3] rounded-[5px]`}>
                                  <h4 className = "font-medium font-sans text-base text-[#2F2B2BB0]">{names}</h4>
                                  <h1 className = "font-bold font-sans text-[2rem] text-[#1E1E1E]">{number}</h1>
                              </div>
                          )
                      })}
                  </div>

                  <section className = "my-7 border-[0.5px] border-[#E4E8ED] rounded-lg my-4">
                    <div className = "py-3 ">
                    <SimpleBar forceVisible="x" autoHide={false} style={{ maxWidth: '100%' }}>
                    <div className = "min-w-[1000px] w-full " >
                     <table className=" table-auto w-full ">
                     <thead className = " ">
                        <tr className = 'text-left    '>
                           <th className = 'whitespace-nowra py-2 bg-[#F7F9FB]  ps-4 font-inter font-medium text-base text-[#292929]'>
                              Name
                           </th>
                           <th className = "whitespace-nowra py-2 bg-[#F7F9FB] font-inter font-medium text-base text-[#292929]">
                             Leave Type
                           </th>
                           <th className = "whitespace-nowra py-2 bg-[#F7F9FB] font-inter font-medium text-base text-[#292929]">
                             Duration
                           </th>
                           <th className = "whitespace-nowrap py-2 bg-[#F7F9FB] font-inter font-medium text-base text-[#292929]">
                             Days
                           </th>
                           <th className = "whitespace-nowrap text-center  py-2 bg-[#F7F9FB] rounded-tr-lg font-inter font-medium text-base text-[#292929]">
                             Status 
                           </th>
                           <th className = "whitespace-nowrap text-center  py-2 bg-[#F7F9FB]  font-inter font-medium text-base text-[#292929]">
                             
                           </th>
                         </tr>
                      </thead>
                      <tbody className = 'divide-y divide-[#E4E8ED] '>
                      {data?.map((leave) => {
                           const { Days, fullName, endDate, startDate, leaveType, profileImage, status, id} = leave
                          return(   
                         <tr key= {id} className = "" onClick={() => handleRowClick(leave?.id)} role="button">
                           <td className = " ps-4 py-2">
                             <div className = 'flex gap-2 items-center'>
                               <img src= {profileImage} alt="image-leave" className = "w-7 h-7 rounded-full"/>
                               <span className = "font-sans font-medium text-sm text-[#292929]"  >{fullName}</span>
                             </div>
                           </td>
                           <td  className = "">
                               <span className = "font-sans font-medium text-sm text-[#292929]">{leaveType} leave</span> 
                           </td>
                           <td className = " whitespace-nowrap ">
                             <div className = 'flex flex-col'>
                                <span className = "font-inter font-normal text-sm text-[#292929]">Start: {startDate.slice(0,10)}</span>
                                <span className = "font-inter font-normal text-sm text-[#8C8C8C]">End: {endDate.slice(0,10)}</span>
                             </div>
                           </td>
                           <td className = "">
                                <span className = "font-medium font-sans text-sm text-[#292929] ">{Days} Days</span> 
                           </td>
                           <td className = 'text-center'>
                           <span className = {`font-inter font-regular text-sm rounded-full px-4 py-1
                              ${status.toLowerCase() === "approved"  ? "bg-[#E5FFF7] text-[#0D805D]  " :
                                status.toLowerCase() === "pending" ? "bg-[#FFF5E3] text-[#F29B07]" :
                                status.toLowerCase() === "declined" ? "bg-[#F9E9E9]  text-[#F63838] " :
                                 ""
                                }`}>{status}</span>
                           </td>
                           <td className = ''>
                              <img className = 'w-6 h-6' src= {dashboardimage} alt="" role = "button"  />
                           </td>
                         </tr>
                          )
                      })}
                     </tbody>
                    </table>

                      </div>
                    </SimpleBar>
                    {showModal && selectedLeave && (
                      <div className="fixed inset-0 px-4 md:px-0 bg-black/30 flex items-center justify-center z-50">
                        <div ref={modalRef} onClick={(e) => e.stopPropagation()} className="bg-white rounded-xl shadow-lg transform transition-all duration-100 ease-in-out  opacity-100 animate-modalFade w-full max-w-lg">
                           <div className = 'flex  py-3 px-4 justify-between items-center border-b-1 border-[#D9D9D9] '>
                              <h2 className = 'font-sans text-[#292929] font-semibold text-xl '>Leave Request</h2>
                              <img src= {cancel} onClick={() => setShowModal(false)} className = 'w-7 h-7' alt=""/>
                           </div> 
                           <div>
                             {selectedLeave ? (
                               <>
                                 <div className = 'm-4 flex flex-col'>
                                   <div className = "flex gap-2 items-center" >
                                      
                                         <img src={selectedLeave?.employee?.profileImage} alt=""  className = "w-9 h-9 rounded-full" />
                                      
                                      <div className = "">
                                         <h3 className = 'mb-1 font-sans font-medium text-base md:text-[1.1rem] text-[#0E0A2D]'>{selectedLeave?.employee?.fullName}</h3>
                                         <p className = 'mt-[-8px] font-sans font-normal text-sm text-[#747474]'>{selectedLeave?.employee?.email}</p>
                                      </div>
                                   </div>
                                   <div className = 'md:w-10/11 max-w-full'>
                                     <h4 className = 'my-3 font-sans font-semibold text-[#1A1A1A] text-lg '>Leave Details</h4>
                                     <div className = 'w-full flex flex-col gap-4 '>
                                       <div className = " flex w-full flex-col md:flex-row gap-4 md:gap-10  items-center justify-between ">
                                         <div className = "flex  w-full md:w-1/2 items-center justify-between gap-2 ">
                                            <h3 className = "font-sans font-normal text-sm  text-[#747474]">Leave Type:</h3>
                                            <h6 className = "font-sans font-normal text-sm  text-[#1A1A1A]">{selectedLeave?.leaveType} leave</h6>
                                         </div>
                                         <div className = "flex w-full md:w-1/2  items-center md:justify-evenl justify-between gap-7 ">
                                            <h3 className = "font-sans font-normal text-sm text-[#747474]">Duration:</h3>
                                            <h6 className = "font-sans font-normal text-sm text-[#1A1A1A]">{selectedLeave?.duration} days</h6>
                                         </div>
                                       </div>
                                       <div className = "flex w-full flex-col md:flex-row gap-4 md:gap-10  items-center justify-between ">
                                          <div className = "flex  w-full md:w-1/2 items-center justify-between gap-4 ">
                                            <h3 className = "font-sans font-normal text-sm  text-[#747474]">Start Date:</h3>
                                            <h6 className = "font-sans font-normal text-sm text-[#1A1A1A]">{selectedLeave?.startDate.slice(0,10)}</h6>
                                          </div>
                                          <div className = "flex w-full md:w-1/2  items-center md:justify-evenl justify-between gap-7 ">
                                            <h3 className = "font-sans font-normal text-sm  text-[#747474]">End Date:</h3>
                                            <h6 className = "font-sans font-normal text-sm text-[#1A1A1A]">{selectedLeave?.endDate.slice(0,10)}</h6>
                                          </div>
                                       </div>
                                       <div className = "flex w-full flex-col md:flex-row gap-4 md:gap-10  items-center justify-between">
                                          <div className = "flex  w-full md:w-1/2 items-center justify-between gap-4 ">
                                            <h3 className = "w-[50%]  md:w-full font-sans font-normal text-sm  text-[#747474]">Description:</h3>
                                            <h6 className = "w-[50%] text-end md:whitespace-nowra md:w-full font-sans font-normal text-sm text-[#1A1A1A]">{selectedLeave?.description}</h6>
                                          </div>
                                          <div className = "flex  w-full md:w-1/2 items-center justify-between gap-7  ">
                                            <h3 className = "font-sans font-normal text-sm  text-[#747474]">Status:</h3>
                                            {/* <h6 className = {`action-status ${selectedLeave?.status.replace(/\s+/, "-").toLowerCase()}`}>{selectedLeave?.status}</h6> */}
                                            <span className = {` font-inter font-regular text-sm rounded-full px-4 py-1
                                              ${selectedLeave?.status.toLowerCase() === "approved"  ? "bg-[#E5FFF7] text-[#0D805D]" :
                                              selectedLeave?.status.toLowerCase() === "pending" ? "bg-[#FFF5E3] text-[#F29B07]":
                                              selectedLeave?.status.toLowerCase() === "declined" ? "bg-[#F9E9E9]  text-[#F63838] " :
                                              ""
                                              }`}>{selectedLeave?.status}</span>
                                          </div>
                                       </div>
                                     </div>
                                   </div>
                                   <hr className = 'text-[#00000017] mt-5 mb-2'/>
                                   <div className =  'flex flex-col gap-2 '>
                                      <div className = "flex gap-6 ">
                                        <h3 className = "font-sans font-normal text-sm  text-[#747474]">Leave Balance:</h3>
                                        <h6 className = "font-sans font-normal text-sm text-[#1A1A1A]">(8) {selectedLeave?.leaveType} leave , (6) {selectedLeave?.leaveType} leave</h6>
                                      </div>
                                      <div className = "flex gap-6">
                                         <h3 className = "font-sans font-normal text-sm  text-[#747474]">Approved by:</h3>
                                         <h6 className = "font-sans font-normal text-sm text-[#1A1A1A]">{selectedLeave?.approvedBy}</h6>
                                      </div>  
                                    </div>
                                    <hr className = 'text-[#00000017] mt-2 mb-2'/>
                                    <div className = "flex gap-3 my-2 ">
                                      <button className = "w-full bg-[#3439CA] rounded-sm py-[6px] px-4  font-sans font-medium text-sm text-[#F3F2FB] " onClick = {() => handleApprove(selectedLeave?.leaveId)} >Approve</button>
                                      <button className = " w-full bg-white rounded-sm py-[6px] px-4 border-1 border-[#DB3E3E] hover:text-[#F3F2FB] hover:bg-[#DB3E3E]  font-sans font-medium text-sm text-[#DB3E3E]" onClick = {() => handleDecline(selectedLeave?.leaveId)}>Decline</button>
                                    </div>

                                  </div>
                                 
                               </>
                               ) : (
                                 <Loadings/>

                             )}
                           </div>
                          
                        </div>
                      </div>
      
                    )}

                    {/*  */}

                    {modalShow1 && (
                       <div className="fixed inset-0 px-4 md:px-0 bg-black/30 flex items-center justify-center z-50">
                         <div ref= {modalRef} className="bg-white rounded-xl shadow-lg max-h-full overflow-y-auto transform transition-all duration-100 ease-in-out  opacity-100 animate-modalFade w-full max-w-lg">
                          <div className = 'flex  py-3 px-4 justify-between items-center border-b-1 border-[#D9D9D9] '>
                            <h2 className = 'font-sans text-[#292929] font-semibold text-xl '>Leave Request</h2>
                            <img src= {cancel} onClick={() => setModalShow1(false)} className = 'w-7 h-7' alt=""/>
                          </div>
                          <div className = 'p-4'>
                            <form action="" className = 'flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
                              <div className = "flex  flex-col gap-1 ">
                                 <label htmlFor="" className = "font-sans text-[#111014] text-sm font-medium">Leave Type*</label>
                                 <select name="" id="" className = "w-full border-1 border-[#959595] px-3 font-sans text-base md:text-sm focus:shadow-sm focus:border-1 focus:border-blue-600 focus:outline focus:outline-blue-600 font-normal text-[#878789]  rounded-sm py-2"  {...register("leaveType", {required: true})} >
                                    <option disabled selected hidden >Select</option>
                                    <option value="casual" className= "labelss">casual</option>
                                    <option value="sick" className= "labelss">sick</option>
                                    <option value="annual" className= "labelss">annual</option>
                                 </select>
                                {errors.leaveType && <span className = "text-xs mt-[-3px] font-inter font-medium text-[#EC5E5E]">{errors.leaveType?.message}</span>}
                               </div>
                               <div className = "flex flex-col md:flex-row gap-4 ">
                                   <div className = "w-full flex flex-col gap-1">
                                      <label htmlFor="" className = "font-sans text-[#111014] text-sm font-medium">Start Date*</label>
                                      <input type="date" name="" id="" placeholder = "select Date" className = "w-full border-1 border-[#959595] px-3 font-sans text-base md:text-sm focus:shadow-sm focus:border-1 focus:border-blue-600 focus:outline focus:outline-blue-600 font-normal text-[#878789]  rounded-sm py-2" {...register("startDate", {required: true})}/>
                                      <span className = "text-xs mt-[-3px] font-inter font-medium text-[#EC5E5E]">{errors.startDate?.message}</span>
                                   </div>
                                   <div className = "w-full flex flex-col gap-1">
                                      <label htmlFor="" className = "font-sans text-[#111014] text-sm font-medium">End Date*</label>
                                      <input type="date" name="" id="" placeholder = "select Date" className = "w-full border-1 border-[#959595] px-3 font-sans text-base md:text-sm focus:shadow-sm focus:border-1 focus:border-blue-600 focus:outline focus:outline-blue-600 font-normal text-[#878789]  rounded-sm py-2"  {...register("endDate", {required: true})} />
                                      <span className = "text-xs mt-[-3px] font-inter font-medium text-[#EC5E5E]">{errors.endDate?.message}</span>
                                   </div>
                                </div>
                                 <div className = "flex flex-col gap-1">
                                    <label htmlFor="" className = "font-sans text-[#111014] text-sm font-medium">Description*</label> 
                                    <textarea name="" id="" cols="30" rows="3"  className = "w-full border-1 border-[#959595]  font-sans text-base md:text-sm focus:shadow-sm focus:border-1 focus:border-blue-600 focus:outline focus:outline-blue-600 font-normal py-2 px-3 text-[#878789]  rounded-sm resize-none" placeholder = "Type here"  {...register("description", {required: true})}></textarea>
                                    <span className = "text-xs mt-[-3px] font-inter font-medium text-[#EC5E5E]">{errors.description?.message}</span>
                                 </div>
                                 <div className = "flex gap-4 my-3">
                                    <button className = "w-full bg-white rounded-sm py-[6px] px-4 border-1 border-[#DB3E3E] hover:text-[#F3F2FB] hover:bg-[#DB3E3E] font-sans font-medium text-sm text-[#DB3E3E]" onClick={()=> reset()} disabled = {isSubmitting}>Cancel</button>
                                    <button className = "w-full bg-[#3439CA] rounded-sm py-[6px] px-4  font-sans font-medium text-sm text-[#F3F2FB]"  type = "submit" disabled = {isSubmitting}>Apply</button> 
                                  </div>
                            </form>

                          </div>
                          
                        </div>
                       </div>

                    )}

                    </div>
                </section>

               </section>
             
            </main> 
            
        </>
    )
}

export default LeaveBoard
