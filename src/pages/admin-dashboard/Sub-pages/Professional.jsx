import React , {useContext} from 'react'
import{Link} from 'react-router-dom'
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import * as yup from "yup";
import {professionalSchema} from '../../../lib/ValidationSchema'
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from "react-hot-toast"
import OpenContext from '../../../context/OpenContext'

const Professional = () => {
    const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const token = localStorage.getItem("hr-token")

  const { open } = useContext(OpenContext);


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
                <section className = 'flex flex-col gap-y-4'>
                    <div className= {`flex flex-col  ${open ? "md:flex-col lg:flex-row gap-y-4 gap-x-6  " : "md:flex-row gap-x-6"}`}>
                        <div className= {`w-full  flex flex-col gap-2`}>
                            <label htmlFor="" className = "font-sans font-medium text-sm text-[#111014]">Office of Employment*</label>
                            <input type="text" name="" id="" className = "w-full bg-white border-1 rounded-[5px] focus:shadow-sm focus:border-1 focus:border-blue-600 focus:outline focus:outline-blue-600 font-sans font-normal md:text-sm text-base text-[#878789] px-3 py-2 border-[#959595] " placeholder = "Enter" {...register("officeOfEmployment")}/>
                            <span className = "text-xs mt-[-3px] font-inter font-medium text-[#EC5E5E]">{errors.officeOfEmployment?.message}</span>
                        </div>
                        <div className = {`w-full  flex flex-col gap-2`}>
                            <label htmlFor="" className = "font-sans font-medium text-sm text-[#111014]">Job TItle*</label>
                            <select name="" id="" className = "w-full bg-white border-1 rounded-[5px] focus:shadow-sm focus:border-1 focus:border-blue-600 focus:outline focus:outline-blue-600 font-sans font-normal md:text-sm text-base text-[#878789] px-3 py-2 border-[#959595] " {...register("jobTitle", {required: true})}>
                                <option disabled selected hidden className = "">Select</option>
                                <option value="Front-end"  className = "">Front-end</option>
                                <option value="Back-end"  className = "">Back-end</option>
                                <option value="Product Designer"  className = "">Product Designer</option>
                                <option value="Cyber Security"  className = "">Cyber Security</option>
                                <option value="Customer Rep"  className = "">Customer Rep</option>
                                <option value="Data Analyst"  className = "">Data Analyst</option>
                           </select>
                             <span className = "text-xs mt-[-3px] font-inter font-medium text-[#EC5E5E]">{errors.jobTitle?.message}</span>
                        </div>
                   </div>
                   <div className= {`flex flex-col  ${open ? "md:flex-col lg:flex-row gap-y-4 gap-x-6  " : "md:flex-row gap-x-6"}`}> 
                     <div className= {`w-full flex flex-col gap-2`}>
                            <label htmlFor="" className = "font-sans font-medium text-sm text-[#111014]">Department*</label>
                            <select name="" id="" className = "w-full bg-white border-1 rounded-[5px] focus:shadow-sm focus:border-1 focus:border-blue-600 focus:outline focus:outline-blue-600 font-sans font-normal md:text-sm text-base text-[#878789] px-3 py-2 border-[#959595]" {...register("department", {required: true})}>
                                <option disabled selected hidden >Select</option>
                                {loading && <option>Loading...</option>}
                                {error && <option>{error}</option>}
                                {departments.map((department) =>(
                                <option className = "" key = {department.id} value = {department.name}>{department.name}</option>
                                ))}
                            </select>
                             {/* <span className = "text-xs mt-[-3px] font-inter font-medium text-[#EC5E5E]">{errors.department?.message}</span> */}
                             {errors.department && <span className = "text-xs mt-[-3px] font-inter font-medium text-[#EC5E5E]">{errors.department?.message}</span>}
                     </div>
                     <div className = "w-full flex flex-col gap-2">
                        <label htmlFor="" className = "font-sans font-medium text-sm text-[#111014]">Employee Status*</label>
                        <select name="" id="" className = "w-full bg-white border-1 rounded-[5px] focus:shadow-sm focus:border-1 focus:border-blue-600 focus:outline focus:outline-blue-600 font-sans font-normal md:text-sm text-base text-[#878789] px-3 py-2 border-[#959595]" {...register("employmentStatus")}>
                            <option disabled selected hidden className = "labels">Select</option>
                            <option value="on-site" className = "">on-site</option>
                            <option value="remote" className = "">remote</option>
                            <option value="hybrid" className = "">hybrid</option>
                        </select>
                        {errors.employmentStatus && <span className = "text-xs mt-[-3px] font-inter font-medium text-[#EC5E5E]">{errors.employmentStatus?.message}</span>}
                    </div>
                   </div>
                   <div className = "flex gap-3 my-3">
                      <button className = "w-full md:w-40 py-2 border border-[#DB3E3E]  font-medium text-base md:text-sm text-[#DB3E3E] hover:text-white hover:bg-[#DB3E3E] rounded-sm" disabled = {isSubmitting} onClick = {()=> {reset();}} >Cancel</button>
                      <button type = 'submit' disabled ={isSubmitting} className = "w-full md:w-40 py-2 bg-[#3439CA] rounded-sm font-medium   text-base md:text-sm text-[#F3F2FB]">Save & Continue</button>
                  </div>
                </section>
                </form>
            </main>
        </>
    )
}

export default Professional
