import React from 'react'
import {Link} from 'react-router-dom'
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import * as yup from "yup";
import {salarySchema} from '../../../lib/ValidationSchema'
import toast from "react-hot-toast"


const Document = () => {
    const [modalShow, setModalShow] = React.useState(false);

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
                <section>
                <div className = "d-lg-flex gap-4">
                    <div className = " mobile ">
                        <label htmlFor="" className = "labels">Amount</label>
                        <input type="text" name="" id="" className = "w-100 add-input" placeholder = "Enter Amount" {...register("salary")}/>
                        <span className = "spans">{errors.salary?.message}</span>
                    </div>
                    <div className = " mobilee">
                        <label htmlFor="" className = "labels">Start Date</label>
                        <input type="text" name="" id="" className = "w-100 add-input" placeholder = "Enter Date" {...register("startDate")}/>
                        <span className = "spans">{errors.startDate?.message}</span>
                    </div>
                </div>
                <div className = "d-flex gap-3 my-5">
                    <button className = "cancel" disabled = {isSubmitting} onClick = {()=> {reset();}}>Cancel</button>
                    <button className = "save" type = "submit" disabled = {isSubmitting} >Save & Continue</button>
                </div>
                </section>
                </form>
            </main>
        </>
    )
}

export default Document
