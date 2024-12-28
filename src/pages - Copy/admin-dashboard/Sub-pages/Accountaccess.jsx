import React from 'react'
import {Link} from 'react-router-dom'
import ModalX from '../../../Components/ModalX'
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import * as yup from "yup";
import {userSchema} from '../../../lib/ValidationSchema'


const Accountaccess = () => {
    const [modalShow, setModalShow] = React.useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(userSchema),
      });
      const onSubmit = (data) => console.log(data)


    return (
        <>
            <main>
                <form onSubmit={handleSubmit(onSubmit)}>
                <section>
                <div className = "d-lg-flex gap-4">
                    <div className = " mobile ">
                        <label htmlFor="" className = "labels">Username</label>
                        <input type="text" name="" id="" className = "w-100 add-input" placeholder = "Enter Office" {...register("username")}/>
                        <span className = "spans">{errors.username?.message}</span>
                    </div>
                    <div className = " mobilee">
                        <label htmlFor="" className = "labels">Password</label>
                        <input type="password" name="" id="" className = "w-100 add-input" placeholder = "Enter Password"  {...register("password")}/> 
                        <span className = "spans">{errors.password?.message}</span>                 
                     </div>
                </div> 
                <div className = "d-lg-flex gap-4 my-4"> 
                   <div className = " mobile ">
                        <label htmlFor="" className = "labels">Confirm Password</label>
                        <input type="password" name="" id="" className = "w-100 add-input" placeholder = "Enter Password"  {...register("confirmpassword")}/>
                        <span className = "spans">{errors.confirmpassword?.message}</span>                 
                    </div>
                   <div className = " mobilee">
                      <label htmlFor="" className = "labels">Recovery Email Address</label>
                      <input type="email" name="" id="" className = "w-100 add-input" placeholder = "Enter Email Address" {...register("email")}/>
                      <span className = "spans">{errors.email?.message}</span>                                   
                   </div>
                </div>
                <div className = "d-flex gap-3 my-5">
                    <button className = "cancel">Cancel</button>
                      <button className = "save" onClick={() => setModalShow(true)} >Save & Continue</button>
                      <ModalX
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
                </div>
                </section>
                </form>
            </main>
        </>
    )
}

export default Accountaccess
