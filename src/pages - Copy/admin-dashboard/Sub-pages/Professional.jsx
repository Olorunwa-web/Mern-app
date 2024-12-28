import React from 'react'
import{Link} from 'react-router-dom'
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import * as yup from "yup";
import {professionalSchema} from '../../../lib/ValidationSchema'



const Professional = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(professionalSchema),
      });
      const onSubmit = (data) => console.log(data)
    




    return (
        <>
            <main>
                <form onSubmit={handleSubmit(onSubmit)} >
                <section>
                    <div className = "d-lg-flex gap-4 mb-4">
                        <div className = " mobile ">
                            <label htmlFor="" className = "labels">Office of Employment</label>
                            <input type="text" name="" id="" className = "w-100 add-input" placeholder = "Enter" {...register("office")}/>
                            <span className = "spans">{errors.office?.message}</span>
                        </div>
                        <div className = " mobilee">
                            <label htmlFor="" className = "labels">Job TItle</label>
                            <input type="text" name="" id="" className = "w-100 add-input" placeholder = "Enter Title" {...register("job")}/>
                            <span className = "spans">{errors.job?.message}</span>
                        </div>
                   </div>
                   <div className = "d-lg-flex gap-4 mb-5"> 
                     <div className = " mobile">
                        <label htmlFor="" className = "labels">Department</label>
                            <select name="" id="" className = "w-100 select-input" {...register("department")}>
                                <option disabled selected hidden >Select</option>
                                <option value="Human Resources" className= "labelss">Human Resources</option>
                                <option value="Finanace and Accounting" className = "labelss">Finanace and Accounting</option>
                                <option value="Marketing" className = "labelss">Marketing</option>
                            </select>
                            {errors.department && <span className = "spans">{errors.department?.message}</span>}
                     </div>
                     <div className = " mobilee">
                        <label htmlFor="" className = "labels">Employee Status</label>
                        <select name="" id="" className = "w-100 select-input" {...register("employee")}>
                            <option disabled selected hidden className = "labels">Select</option>
                            <option value="UnEmployed" className = "labelss">UnEmployed</option>
                            <option value="Employee" className = "labelss">Employee</option>
                            <option value="Self-Employed" className = "labelss">Self-Employed</option>
                            <option value="Worker" className = "labelss">Worker</option>
                        </select>
                        {errors.employee && <span className = "spans">{errors.employee?.message}</span>}
                    </div>
                   </div>
                   <div className = "d-flex gap-3 my-3">
                      <button className = "cancel">Cancel</button>
                      <button className = "save">Save & Continue</button>
                  </div>
                  
                </section>
                </form>
            </main>
        </>
    )
}

export default Professional
