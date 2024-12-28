import React from 'react'
import {Link} from 'react-router-dom'
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import * as yup from "yup";
import {salarySchema} from '../../../lib/ValidationSchema'



const Document = () => {
    const [modalShow, setModalShow] = React.useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(salarySchema),
      });
      const onSubmit = (data) => console.log(data)

    return (
        <>
            <main>
                <form  onSubmit={handleSubmit(onSubmit)} >
                <section>
                <div className = "d-lg-flex gap-4">
                    <div className = " mobile ">
                        <label htmlFor="" className = "labels">Amount</label>
                        <input type="text" name="" id="" className = "w-100 add-input" placeholder = "Product Name" {...register("amount")}/>
                        <span className = "spans">{errors.amount?.message}</span>
                    </div>
                    <div className = " mobilee">
                        <label htmlFor="" className = "labels">Start Date</label>
                        <input type="text" name="" id="" className = "w-100 add-input" placeholder = "Enter Number" {...register("startdate")}/>
                        <span className = "spans">{errors.startdate?.message}</span>
                    </div>
                </div>
                <div className = "mt-4 freq">
                  <div className = " mobilee">
                      <label htmlFor="" className = "labels">Frequency</label>
                      <input type="email" name="" id="" className = "w-100 add-input" placeholder = "Enter Email Address" {...register("email")} />                  
                      <span className = "spans">{errors.email?.message}</span>
                </div>
                </div>
                
                <div className = "d-flex gap-3 my-5">
                    <button className = "cancel">Cancel</button>
                    <button className = "save" >Save & Continue</button>
                </div>
                </section>
                </form>
            </main>
        </>
    )
}

export default Document
