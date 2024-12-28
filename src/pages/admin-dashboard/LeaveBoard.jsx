import React, {useState, useEffect} from 'react'
import {Leaveboard} from '../../Taskboard'
import {leaveBoard} from '../../Taskboard'
import Table from 'react-bootstrap/Table';
import '../../Style/Leaveboard.css'
import temilade from '../../assets/Frame 23.svg'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useMatch } from 'react-router-dom';
import  Loader  from "../../utils/Loader";
import axios from "axios";
import toast from "react-hot-toast"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import * as yup from "yup";
import {leaveSchema} from "../../lib/ValidationSchema"






  function MyVerticallyCenteredModal(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const token = localStorage.getItem("hr-token");


    const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
    } = useForm({
      resolver: yupResolver(leaveSchema),
    });
    // const onSubmit = (data) => {
    //   console.log(data);
  
    // }
    const onSubmit = async (data) => {
      try {
        const req = await fetch("http://localhost:9080/api/leave/apply", {
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
          fetchLeaves();
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

    if (isLoading) {
      return (
        <div className="vh-100 d-flex justify-content-center">
          {" "}
          <Loader />{" "}
        </div>
      );
    }
  
  
    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className = "leave-emp-h1 px-2" >
               Leave Request
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className = "px-2 leave-emp-space">
            <form  onSubmit={handleSubmit(onSubmit)}>
               <div className = "mb-3 ">
                    <label htmlFor="" className = "labels">Leave Type</label>
                    <select name="" id="" className = "w-100 select-input" {...register("leaveType", {required: true})} >
                        <option disabled selected hidden >Select</option>
                        <option value="casual" className= "labelss">casual</option>
                        <option value="sick" className= "labelss">sick</option>
                        <option value="annual" className= "labelss">annual</option>
                    </select>
                    {errors.leaveType && <span className = "spans">{errors.leaveType?.message}</span>}
               </div>
               <div className = "d-lg-flex gap-4 mb-3">
                   <div className = "mobile">
                      <label htmlFor="" className = "labels">Start Date</label>
                      <input type="date" name="" id="" placeholder = "select Date" className = "w-100 add-input" {...register("startDate", {required: true})}/>
                      <span className = "spans">{errors.startDate?.message}</span>
                   </div>
                   <div className = "mobile">
                      <label htmlFor="" className = "labels">End Date</label>
                      <input type="date" name="" id="" placeholder = "select Date" className = "w-100 add-input" {...register("endDate", {required: true})} />
                      <span className = "spans">{errors.endDate?.message}</span>
                   </div>
               </div>
               <div className = "mb-3">
                  <label htmlFor="" className = "labels">Description</label> 
                  <textarea name="" id="" cols="30" rows="3"  className = "textA" placeholder = "Type here" {...register("description", {required: true})}></textarea>
                  <span className = "spans">{errors.description?.message}</span>
               </div>
               <div className = "d-flex gap-4 my-4">
                  <button className = "cancel" onClick={()=> reset()} disabled = {isSubmitting}>Cancel</button>
                  <button className = "save"  type = "submit" disabled = {isSubmitting}>Apply</button> 
               </div>
            </form>
            </div>
        </Modal.Body>
        
      </Modal>
    );
  }




const LeaveBoard = () => {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedLeave, setSelectedLeave] = useState(null);
    const [selectedEmployee, setSelectedEmployee] = useState(null);



    const [modalShow, setModalShow] = React.useState(false);


    const token = localStorage.getItem("hr-token");


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
          `http://localhost:9080/api/leave/${leaveId}/approve`,
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
          fetchLeaves();
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
          `http://localhost:9080/api/leave/${leaveId}/decline`,
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
          fetchLeaves();
          toast.success(res.message);
          setShowModal(false);
        } else {
          toast.error(res.message);
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
            "http://localhost:9080/api/leave/all-leaves",
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


      const handleModalShow = async (leaveId) => {
        console.log("id passed to handleModalShow:", leaveId); // Log the id
        if (!leaveId) {
          console.error("Invalid id: leaveid is undefined or null");
          return; // Exit if leaveid is not valid
        }
        try {
          setIsLoading(true);
          console.log(22);
          const req = await axios.get(
            `http://localhost:9080/api/leave/${leaveId}`,
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


      if (isLoading) {
        return (
          <div className="vh-100 d-flex justify-content-center">
            {" "}
            <Loader />{" "}
          </div>
        );
      }

      const handleRowClick = (leaveId) => {
        handleModalShow(leaveId);
      };


   
    

      if (error) {
        return <div className="error-message">{error}</div>;
      }


    return (
        <>
           <main className = "summary-container mt-2">
               <section>
                  <div className = "d-flex align-items-center justify-content-between">
                    <div>
                      <h2 className = "task-h1">Leaveboard</h2>
                      <h4 className = "dash-h4">Dashboard/Leaveboard</h4>
                    </div>
                    {/* <div>
                      <button className = "request-btn" onClick={() => setModalShow(true)} >Request Leave</button>
                    </div> */}
                  </div>
                  <div className = "d-flex  justify-content-between taskboard-flexx d-lg-flex flex-wrap my-4 pb-2 ">
                      {Leaveboard.map((leave) => {
                          const {id,names,number} = leave
                          return(
                              <div key = {id} className = "text-center taskboard-flex ">
                                  <h4 className = "namess">{names}</h4>
                                  <h1 className = "numbers">{number}</h1>
                              </div>
                          )
                      })}
                  </div>

                  <section className = "dashboard-task my-4">
                    <div className = "employee-table pt-2 ">
                    <Table responsive = "lg" hover>
                      <thead className = "threadd">
                        <tr >
                          <th className = "bg-light table-space ">
                              <span className = "dash-bars ms-2">Name</span>
                          </th>
                          <th className = "table-sp bg-light">
                              <span className = "dash-bars ">Leave Type</span>
                          </th>
                          <th className = "table-space bg-light">
                              <span className = "dash-bars">Duration</span>
                          </th>
                          <th className = "table-space bg-light">
                              <span className = "dash-bars">Days</span>
                          </th>
                          <th className = "text-center table-space bg-light">
                              <span className = "dash-bars">Status</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                      {data.map((leave) =>{
                           const { Days, fullName, endDate, startDate, leaveType, profileImage, status, id} = leave
                          return(   
                         <tr key= {id} className = "" onClick={() => handleRowClick(leave?.id)} role="button">
                           <td className = "paps">
                              <div className = "d-flex align-items-center gap-2 mt-1 ms-1 employ-head" >
                                   <img src= {profileImage} alt="image-leave" className = "image-div c"/>
                                   <span className = "names"  >{fullName}</span>
                               </div>
                           </td>
                           <td  className = "pt-3">
                             <div className = "leave-width">
                                 <span className = "names">{leaveType} Leave</span> 
                             </div>
                           </td>
                           <td className = "pt-3 ">
                             <div className = "head-date">
                                <p className = "start">Start: {startDate.slice(0,10)}</p>
                                <p className = "end">End: {endDate.slice(0,10)}</p>
                             </div>
                           </td>
                           <td className = "pt-3">
                             <div className = "leave-days">
                                <span className = "names">{Days} Days</span> 
                             </div>
                           </td>
                           <td className = "pt-3">
                                 <p className = {`action-status ${status.replace(/\s+/, "-").toLowerCase()}`} >{status}</p>
                           </td>
                         </tr>
                          )
                      })}
                     </tbody>
                    </Table>
                    <Modal
            show={showModal}
            onHide={() => setShowModal(false)}
            centered
            size="lg"
          >
            <Modal.Header closeButton>
              <Modal.Title  className = "profile-h4 padd ps-4">Leave Request </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedLeave ? (
                <>
                  <section className = " padd px-4">
                    <div className = "d-flex justify-content-between align-items-center">
                      <div className = "d-flex gap-2 loop align-items-center" >
                       <div >
                          <img src={selectedLeave?.employee?.profileImage} alt="" style={{maxWidth:"48px"}} className = "c image-div" />
                       </div>
                    <div className = "temilad pt-2">
                      <h3><strong></strong> {selectedLeave?.employee?.fullName}</h3>
                      <p><strong></strong> {selectedLeave?.employee?.email}</p>
                    </div>
                  </div>
                  <button className = "view-profile">View Profile</button>
                </div>
                <h4 className = "persona mt-1">Leave Details</h4>
                <div className = "mt-3 mb-3 d-flex align-items-center justify-content-between ex-spaces">
                  <div className = "d-flex align-items-center gap- gaps ">
                    <h3 className = "mobile-nums">Leave Type:</h3>
                    <h6 className = "mobile-numms">{selectedLeave?.leaveType} leave</h6>
                  </div>
                  <div className = "d-flex align-items-center gap- gapss ">
                    <h3 className = "mobile-nums">Duration:</h3>
                    <h6 className = "mobile-numms">{selectedLeave?.duration} days</h6>
                  </div>
                </div>
                <div className = " d-flex align-items-center justify-content-between ex-spaces">
                  <div className = "d-flex align-items-center gap- gapsss ">
                    <h3 className = "mobile-nums">Start Date:</h3>
                    <h6 className = "mobile-numms">{selectedLeave?.startDate.slice(0,10)}</h6>
                  </div>
                  <div className = "d-flex align-items-center gap- gapss ">
                    <h3 className = "mobile-nums">End Date:</h3>
                    <h6 className = "mobile-numms">{selectedLeave?.endDate.slice(0,10)}</h6>
                  </div>
                </div>
                <div className = " my-3 d-flex align-items-center justify-content-between ex-spaces">
                  <div className = "d-flex align-items-center gap- gaps ">
                    <h3 className = "mobile-nums">Description:</h3>
                    <h6 className = "mobile-numms">{selectedLeave?.description}</h6>
                  </div>
                  <div className = "d-flex align-items-center gapps ">
                    <h3 className = "mobile-nums">Status:</h3>
                    <h6 className = {`action-status ${selectedLeave?.status.replace(/\s+/, "-").toLowerCase()}`}>{selectedLeave?.status}</h6>
                  </div>
                </div>
                <hr/>
                <div  className =  'd-flex align-items-center justify-content-between ex-spaces tech-space'>
                <div className = "d-flex align-item gappss ">
                   <h3 className = "mobile-nums">Leave Balance:</h3>
                    <h6 className = "mobile-numms">(8) {selectedLeave?.leaveType} leave ,(6) {selectedLeave?.leaveType} leave</h6>
                </div>
                <div className = "d-flex align-items gappsss">
                    <h3 className = "mobile-nums">Approved by:</h3>
                    <h6 className = "mobile-numms">{selectedLeave?.approvedBy}</h6>
                </div>  
                </div>
                <hr/>
                <div className = "d-flex gap-3 my-3">
                  <button className = "save-btn" onClick = {() => handleApprove(selectedLeave?.leaveId)} >Approve</button>
                  <button className = "cancel-btn" onClick = {() => handleDecline(selectedLeave?.leaveId)}>Decline</button>
                 </div>
                  </section>
                  
                </>
              ) : (
                <Loader />
              )}
            </Modal.Body>
          </Modal>

                    </div>
                </section>

               </section>
               <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
            </main> 
            
        </>
    )
}

export default LeaveBoard
