import React, {useEffect, useState} from 'react'
import {leaveboardemploy} from "../../Taskboard"
import "../../Style/EmployeeLeaveboard.css"
import Table from 'react-bootstrap/Table';
import {LeaveboardEmploy} from "../../Taskboard"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import toast from "react-hot-toast"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import * as yup from "yup";
import {leaveSchema} from "../../lib/ValidationSchema"
import Loader from "../../utils/Loader"





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




const EmployeeLeaveboard = () => {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedLeave, setSelectedLeave] = useState(null);


    const [modalShow, setModalShow] = React.useState(false);

    const token = localStorage.getItem("hr-token");

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
          <div className="vh-100 d-flex justify-content-center">
            {" "}
            <Loader />{" "}
          </div>
        );
      }
    

  


    return (
        <>
            <main className = "summary-container">
                <section className = "pt-2">
                    <div className = "d-flex justify-content-between align-items-center my-3">
                        <h1 className = "dash mb-2">Leaveboard</h1>
                        <div>
                           <button className = "request-btn" onClick={() => setModalShow(true)}>Request Leave</button>
                        </div>
                    </div>
                    <div className = "d-flex d-lg-flex justify-content-between flex-md-wrap leave-flexx my-4 " >
                        {leaveboardemploy.map((leaveemp)=>{
                            const {id,names,number,sub_number} = leaveemp
                            return(
                                <div key = {id} className = "leave-flex text-center">
                                    <h4 className = "leave-h4">{names}</h4>
                                    <div>
                                       <h1 className = "leave-h1">{number}<span className = "leave-span">{sub_number}</span></h1>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div>
                        <h2 className = "leave-his">Leave Histroy</h2>
                    </div>
                    <div className = "dashboard-tasks my-3 pt-2">
                        
                        <Table responsive hover>
                        <thead>
                        <tr className = "leave-style ">
                          <th  className = "bg-light ">
                              <span className = "dash-bar ps-2">Leave Type</span>
                          </th>
                          <th  className = "bg-light">
                              <span className = "dash-bar ">Start Date</span>
                          </th>
                          <th  className = "bg-light">
                              <span className = "dash-bar">End Date</span>
                          </th>
                          <th  className = "bg-light">
                              <span className = "dash-bar">Days</span>
                          </th>
                          <th className = "text-center  bg-light ">
                              <span className = "dash-bar">Status</span>
                          </th>
                        </tr>
                         </thead>
                         <tbody>
                             {data.map((employee)=>{
                                 const {_id,leaveType,startDate,endDate,Days,status} = employee
                                 return(
                                     <tr key = {_id}>
                                         <td><div className = "py-2 ps-2 employee-width "><span className = "leave-name">{leaveType} leave</span></div> </td>
                                         <td><div className = "py-2 employee-date"><span  className = "leave-name" >{startDate.slice(0,10)}</span></div></td>
                                         <td><div className = " py-2 employee-end"><span  className = "leave-name">{endDate.slice(0,10)}</span></div> </td>
                                         <td><div className = "py-2 employee-days"><span  className = "leave-name">{Days} days</span></div></td>
                                         <td className = "text-center"><div className = "py-2"><span className = {`action-status ${status.replace(/\s+/, "-").toLowerCase()}`}>{status}</span></div> </td>
                                     </tr>
                                 )
                             })}
                         </tbody>
                        </Table>
                    </div>
                </section>
                <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
            </main>
        </>
    )
}

export default EmployeeLeaveboard
