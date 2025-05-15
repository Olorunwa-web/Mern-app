import React from 'react'
import{Link} from 'react-router-dom'
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import * as yup from "yup";
import {professionalSchema} from '../../../lib/ValidationSchema'
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from "react-hot-toast"


const Professional = () => {
    const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const token = localStorage.getItem("hr-token")

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
      } = useForm({
        resolver: yupResolver(professionalSchema),
      });
      const onSubmit = (data) => {
          // Save data to local storage or perform other actions
      localStorage.setItem("professional", JSON.stringify(data));

    console.log(data);
    toast.success("saved successfully")
    // Reset the form after submission
    reset();
      };

      useEffect(()=>{
          const fetchDepartments = async () => {
              try {
                  setLoading(true)
                  const response = await axios.get("https://mern-backend-1-9jn6.onrender.com/api/department/all-departments",{
                      headers:{
                          Authorization: `Bearer ${token}`
                      }
                  });
                  console.log(response.data.departments);
                  setDepartments(response.data.departments);
              } catch (err) {
                  setError("failed to fetch departments");
              } finally{
                  setLoading(false)
              }
          }
          fetchDepartments()
      }, []);
    



    return (
        <>
            <main>
                <form onSubmit={handleSubmit(onSubmit)} >
                <section>
                    <div className = "d-lg-flex gap-4 mb-4">
                        <div className = " mobile ">
                            <label htmlFor="" className = "labels">Office of Employment</label>
                            <input type="text" name="" id="" className = "w-100 add-input" placeholder = "Enter" {...register("officeOfEmployment")}/>
                            <span className = "spans">{errors.officeOfEmployment?.message}</span>
                        </div>
                        <div className = " mobilee">
                            <label htmlFor="" className = "labels">Job TItle</label>
                            <select name="" id="" className = "w-100 select-input" {...register("jobTitle", {required: true})}>
                                <option disabled selected hidden className = "labels">Select</option>
                                <option value="Front-end"  className = "labelss">Front-end</option>
                                <option value="Back-end"  className = "labelss">Back-end</option>
                                <option value="Product Designer"  className = "labelss">Product Designer</option>
                                <option value="Cyber Security"  className = "labelss">Cyber Security</option>
                                <option value="Customer Rep"  className = "labelss">Customer Rep</option>
                                <option value="Data Analyst"  className = "labelss">Data Analyst</option>
                           </select>
                            {errors.jobTitle && <span className = "spans">{errors.jobTitle?.message}</span>}
                        </div>
                   </div>
                   <div className = "d-lg-flex gap-4 mb-5"> 
                     <div className = " mobile">
                            <label htmlFor="" className = "labels">Department</label>
                            <select name="" id="" className = "w-100 select-input" {...register("department", {required: true})}>
                                <option disabled selected hidden >Select</option>
                                {loading && <option>Loading...</option>}
                                {error && <option>{error}</option>}
                                {departments.map((department) =>(
                                <option className = "labelss" key = {department.id} value = {department.name}>{department.name}</option>
                                ))}
                            </select>
                             <span className = "spans">{errors.department?.message}</span>
                             {/* {errors.department && <span className = "spans">{errors.department?.message}</span>} */}
                     </div>
                     <div className = " mobilee">
                        <label htmlFor="" className = "labels">Employee Status</label>
                        <select name="" id="" className = "w-100 select-input" {...register("employmentStatus")}>
                            <option disabled selected hidden className = "labels">Select</option>
                            <option value="on-site" className = "labelss">on-site</option>
                            <option value="remote" className = "labelss">remote</option>
                            <option value="hybrid" className = "labelss">hybrid</option>
                        </select>
                        {errors.employmentStatus && <span className = "spans">{errors.employmentStatus?.message}</span>}
                    </div>
                   </div>
                   <div className = "d-flex gap-3 my-3">
                      <button className = "cancel" disabled = {isSubmitting}>Cancel</button>
                      <button className = "save">Save & Continue</button>
                  </div>
                </section>
                </form>
            </main>
        </>
    )
}

export default Professional
