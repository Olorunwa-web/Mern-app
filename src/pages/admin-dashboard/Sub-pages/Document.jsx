import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import * as yup from "yup";
import {salarySchema} from '../../../lib/ValidationSchema'
import toast from "react-hot-toast"
import OpenContext from '../../../context/OpenContext'

const Document = () => {
    const [modalShow, setModalShow] = React.useState(false);

    const { open } = useContext(OpenContext)

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
      } = useForm({
        resolver: yupResolver(salarySchema),
      });
      const onSubmit = (data) => {
        localStorage.setItem("salary", JSON.stringify(data));
        console.log(data);
        toast.success("saved successfully")
        // Reset the form after submission
        reset();
      }

    return (
        <>
            <main>
                <form  onSubmit={handleSubmit(onSubmit)} >
                <section className = 'flex flex-col gap-y-4'>
                <div className= {`flex flex-col  ${open ? "md:flex-col lg:flex-row gap-y-4 gap-x-6  " : "md:flex-row gap-x-6"}`}>
                    <div className= {`w-full  flex flex-col gap-2`}>
                        <label htmlFor="" className = "font-sans font-medium text-sm text-[#111014]">Amount*</label>
                        <input type="text" name="" id="" className = "w-full bg-white border-1 rounded-[5px] focus:shadow-sm focus:border-1 focus:border-blue-600 focus:outline focus:outline-blue-600 font-sans font-normal md:text-sm text-base text-[#878789] px-3 py-2 border-[#959595] " placeholder = "Enter Amount" {...register("salary")}/>
                        <span className = "text-xs mt-[-3px] font-inter font-medium text-[#EC5E5E]">{errors.salary?.message}</span>
                    </div>
                    <div className= {`w-full ${open ? " " : " "}  flex flex-col gap-2`}>
                        <label htmlFor="" className = "font-sans font-medium text-sm text-[#111014]">Start Date*</label>
                        <input type="text" name="" id="" className = "w-full bg-white border-1 rounded-[5px] focus:shadow-sm focus:border-1 focus:border-blue-600 focus:outline focus:outline-blue-600 font-sans font-normal md:text-sm text-base text-[#878789] px-3 py-2 border-[#959595] " placeholder = "Enter Date" {...register("startDate")}/>
                        <span className = "text-xs mt-[-3px] font-inter font-medium text-[#EC5E5E]">{errors.startDate?.message}</span>
                    </div>
                </div>
                <div className = "flex gap-3 my-4">
                    <button className = "w-full md:w-40 py-2 border border-[#DB3E3E]  font-medium text-base md:text-sm text-[#DB3E3E] hover:text-white hover:bg-[#DB3E3E] rounded-sm" disabled = {isSubmitting} onClick = {()=> {reset();}}>Cancel</button>
                    <button className = "w-full md:w-40 py-2 bg-[#3439CA] rounded-sm font-medium   text-base md:text-sm text-[#F3F2FB]" type = "submit" disabled = {isSubmitting} >Save & Continue</button>
                </div>
                </section>
                </form>
            </main>
        </>
    )
}

export default Document
