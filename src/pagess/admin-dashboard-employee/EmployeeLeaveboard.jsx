import React, {useEffect, useState} from 'react'
import {leaveboardemploy} from "../../Taskboard"
import "../../Style/EmployeeLeaveboard.css"
import {LeaveboardEmploy} from "../../Taskboard"
import axios from "axios";
import toast from "react-hot-toast"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import * as yup from "yup";
import {leaveSchema} from "../../lib/ValidationSchema"
import Loadings from "../../utils/Loadings"
import Loader from "../../utils/Loader"
import OpenContext from '../../context/OpenContext'
import { useContext, useRef } from 'react';
import dashboardimage from "../../assets/ellipsis-svgrepo-com.svg"
import 'simplebar-react/dist/simplebar.min.css';
import SimpleBar from 'simplebar-react';
import cancel from '../../assets/Stockholm-icons (11).svg';





// function MyVerticallyCenteredModal(props) {
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState(null);
    
//     const token = localStorage.getItem("hr-token");


//     const {
//       register,
//       handleSubmit,
//       formState: { errors, isSubmitting },
//     } = useForm({
//       resolver: yupResolver(leaveSchema),
//     });
    
//     const onSubmit = async (data) => {
//       try {
//         const req = await fetch("https://mern-backend-1-9jn6.onrender.com/api/leave/apply", {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(data),
//         });
//         const res = await req.json();
//         console.log(res);
//         if (res.success) {
//           fetchLeaves();
//           setModalShow(false)
//           toast.success(res.message);
//         } else {
//           toast.error(res.message);
//         }
//       } catch (error) {
//         console.log(error);
//         setError("Failed to fetch departments");
//       }
//       reset();
//     };
//     const fetchLeaves = async () => {
//       setIsLoading(true);
//       setError(null);
//       try {
//         const leaves = await getAllLeaves(token);
//         setData(leaves);
//       } catch (error) {
//         setError("Error fetching leaves");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     if (isLoading) {
//       return (
//         <div className="min-h-screen flex justify-center items-center">
//           {" "}
//           <Loadings />{" "}
//         </div>
//       );
//     }
  
  
//     return (
//       <Modal
//         {...props}
//         size="md"
//         aria-labelledby="contained-modal-title-vcenter"
//         centered
//       >
//         <Modal.Header closeButton>
//           <Modal.Title className = "leave-emp-h1 px-2" >
//                Leave Request
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <div className = "px-2 leave-emp-space">
//             <form  onSubmit={handleSubmit(onSubmit)}>
//                <div className = "mb-3 ">
//                     <label htmlFor="" className = "labels">Leave Type</label>
//                     <select name="" id="" className = "w-100 select-input" {...register("leaveType", {required: true})} >
//                         <option disabled selected hidden >Select</option>
//                         <option value="casual" className= "labelss">casual</option>
//                         <option value="sick" className= "labelss">sick</option>
//                         <option value="annual" className= "labelss">annual</option>
//                     </select>
//                     {errors.leaveType && <span className = "spans">{errors.leaveType?.message}</span>}
//                </div>
//                <div className = "d-lg-flex gap-4 mb-3">
//                    <div className = "mobile">
//                       <label htmlFor="" className = "labels">Start Date</label>
//                       <input type="date" name="" id="" placeholder = "select Date" className = "w-100 add-input" {...register("startDate", {required: true})}/>
//                       <span className = "spans">{errors.startDate?.message}</span>
//                    </div>
//                    <div className = "mobile">
//                       <label htmlFor="" className = "labels">End Date</label>
//                       <input type="date" name="" id="" placeholder = "select Date" className = "w-100 add-input" {...register("endDate", {required: true})} />
//                       <span className = "spans">{errors.endDate?.message}</span>
//                    </div>
//                </div>
//                <div className = "mb-3">
//                   <label htmlFor="" className = "labels">Description</label> 
//                   <textarea name="" id="" cols="30" rows="3"  className = "textA" placeholder = "Type here" {...register("description", {required: true})}></textarea>
//                   <span className = "spans">{errors.description?.message}</span>
//                </div>
//                <div className = "d-flex gap-4 my-4">
//                   <button className = "cancel" onClick={()=> reset()} disabled = {isSubmitting}>Cancel</button>
//                   <button className = "save"  type = "submit" disabled = {isSubmitting}>Apply</button> 
//                </div>
//             </form>
//             </div>
//         </Modal.Body>
        
//       </Modal>
//     );
//   }




const EmployeeLeaveboard = () => {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    // const [showModal, setShowModal] = useState(false);
    const [selectedLeave, setSelectedLeave] = useState(null);


    const modalRef = useRef();
    const { open } = useContext(OpenContext)

    const [modalShow, setModalShow] = useState(false);
    const [showModal, setShowModal] = useState(false);


    const token = localStorage.getItem("hr-token");

    const {
      register,
      handleSubmit,
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
          //  await fetchLeaves();
          await fetchEmployeesLeaves();
          setModalShow(false)
          toast.success(res.message);
        } else {
          toast.error(res.message);
        }
      } catch (error) {
        console.log(error);
        setError("Failed to fetch departments");
      }
      reset();
    };
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

    


    useEffect(() => {
      function handleClickOutside(event) {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
          setModalShow(false)
        }
      }
  
      if ( modalShow) {
        document.addEventListener("mousedown", handleClickOutside);
      } else {
        document.removeEventListener("mousedown", handleClickOutside);
      }
  
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ modalShow]);


    const fetchEmployeesLeaves = async () => {
        setIsLoading(true);
        setError(null);
        try {
          const req = await axios.get(
            "https://mern-backend-1-9jn6.onrender.com/api/leave/employee/leaves",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log(req.data);
          setData(req.data);
        } catch (error) {
          setError("Error fetching leaves");
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      };


      useEffect(() => {
        fetchEmployeesLeaves();
      }, []);
    
      if (isLoading) {
        return (
          <div className="min-h-screen flex justify-center items-center">
            {" "}
            <Loadings />{" "}
          </div>
        );
      }
  
      const btnText = isSubmitting ? <Loader/> : "Apply";


    return (
        <>
            <main className = "px-3 md:px-0 lg:px-0 w-19/20 mx-auto max-w-full">
                <section className = "my-3">
                    <div className = "my-5 flex justify-between items-center">
                        <h1 className = "font-sans text-xl text-[#161E54] font-medium">Leaveboard</h1>
                        <div>
                           <button className = "bg-[#3439CA] p-2 rounded-sm font-sans font-medium text-[#F3F2FB] text-sm " onClick={() => setModalShow(true)}>Request Leave</button>
                        </div>
                    </div>
                    <div className = "my-5 flex flex-col gap-7 md:gap-6 lg:gap- w-full md:flex-wrap md:flex-row lg:flex-row  justify-between " >
                        {leaveboardemploy.map((leaveemp)=>{
                            const {id,names,number,sub_number} = leaveemp
                            return(
                                <div key = {id} className = {`w-full text-center  p-5 ${open ? 'md:w-full lg:w-[48%] xl:w-[31%] ' : 'md:w-[48%] lg:w-[48%] xl:w-[31%]'}  border-1 border-[#F1F2F3] rounded-[10px]`}>
                                    <h4 className = " font-sans font-medium text-base text-[#2F2B2BB0] ">{names}</h4>
                                    <div>
                                       <h1 className = "font-sans font-bold text-[3rem] text-[#1E1E1E]">{number}<span className = "font-sans font-semibold text-2xl text-[#4D4D4D]">{sub_number}</span></h1>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div >
                        <h2 className = " my-5 font-sans font-medium text-xl text-[#161E54]">Leave Histroy</h2>
                    </div>
                     <div className = "my-7 border-[0.5px] border-[#E4E8ED] rounded-lg my-4">
                       <div className = 'py-3'>
                         <SimpleBar forceVisible="x" autoHide={false} style={{ maxWidth: '100%' }}>
                           <div  className = "min-w-[1000px] w-full " >
                             <table className=" table-auto w-full ">
                               <thead className = " ">
                                 <tr className = 'text-left    '>
                                   <th className = 'whitespace-nowra py-2 bg-[#F7F9FB]  ps-4 font-inter font-medium text-base text-[#292929]'>
                                     Leave Type
                                   </th>
                                   <th className = "whitespace-nowra py-2 bg-[#F7F9FB] font-inter font-medium text-base text-[#292929]">
                                     Start Date
                                   </th>
                                   <th className = "whitespace-nowra py-2 bg-[#F7F9FB] font-inter font-medium text-base text-[#292929]">
                                     End Date
                                   </th>
                                   <th className = "whitespace-nowrap py-2 bg-[#F7F9FB] font-inter font-medium text-base text-[#292929]">
                                     Days
                                   </th>
                                   <th className = "whitespace-nowrap text-center  py-2 bg-[#F7F9FB] rounded-tr-lg font-inter font-medium text-base text-[#292929]">
                                     Status 
                                   </th>
                                 </tr>
                               </thead>
                               <tbody className = 'divide-y divide-[#E4E8ED] '>
                                {data.map((employee)=>{
                                   const {_id,leaveType,startDate,endDate,Days,status} = employee
                                   return(
                                     <tr key = {_id}>
                                         <td className = 'ps-4'><span className = "font-sans font-medium text-sm text-[#292929]">{leaveType} leave</span></td>
                                         <td><span  className = "font-sans font-medium text-sm text-[#292929]" >{startDate.slice(0,10)}</span></td>
                                         <td><span  className = "font-sans font-medium text-sm text-[#292929]">{endDate.slice(0,10)}</span></td>
                                         <td><span  className = "font-sans font-medium text-sm text-[#292929]">{Days} days</span></td>
                                         <td className = ' py-2 text-center'>
                                           <span className = {`font-inter font-regular text-sm rounded-full px-4 py-1 
                                             ${status.toLowerCase() === "approved"  ? "bg-[#E5FFF7] text-[#0D805D]  " :
                                               status.toLowerCase() === "pending" ? "bg-[#FFF5E3] text-[#F29B07]" :
                                               status.toLowerCase() === "declined" ? "bg-[#F9E9E9]  text-[#F63838] " :
                                                ""
                                            }`}>{status}</span>
                                         </td>
                                     </tr>
                                    )
                                 })}
                                </tbody>
                             </table>
                           </div>
                         </SimpleBar>

                         {/*  */}

                         {modalShow && (
                            <div className="fixed inset-0 px-4 md:px-0 bg-black/30 backdrop-blur-[1.4px]  flex items-center justify-center z-50">
                            <div ref= {modalRef} className="bg-white rounded-xl shadow-lg max-h-full overflow-y-auto transform transition-all duration-100 ease-in-out  opacity-100 animate-modalFade w-full max-w-lg">
                             <div className = 'flex  py-3 px-4 justify-between items-center border-b-1 border-[#D9D9D9] '>
                               <h2 className = 'font-sans text-[#292929] font-semibold text-xl '>Leave Request</h2>
                               <img src= {cancel} onClick={() => setModalShow(false)} className = 'w-7 h-7' alt=""/>
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
                                       <button className = "w-full bg-[#3439CA] rounded-sm py-[6px] px-4  font-sans font-medium text-sm text-[#F3F2FB]"  type = "submit" disabled = {isSubmitting}>{btnText}</button> 
                                     </div>
                               </form>
                             </div>
                           </div>
                          </div>
                         )}
                       </div> 
                    </div>
                </section>
                
            </main>
        </>
    )
}

export default EmployeeLeaveboard
