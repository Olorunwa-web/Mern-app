import {useRef} from 'react'
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import * as yup from "yup";
import {personalinfoSchema} from '../../lib/ValidationSchema'
import { Outlet,Link, NavLink, useMatch} from 'react-router-dom'
import '../../Style/Newemploy.css'
import error from '../../assets/Stockholm-icons (4).svg'
import Imageicon from '../../assets/Stockholm-icons (9).svg'

const NewEmployee = () => {
    const Match = useMatch("/admin-dashboard/employees/newemployee")

   const fileInputRef = useRef(null);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(personalinfoSchema),
  });
  const onSubmit = (data) => console.log(data)




    return (
        <>
           <main className = "summary-container mb-3">
               <section className = "mt-2">
                   <div className = "add">
                       <h1>Add New Employeee</h1>
                       <h4>All Employees / Add New Employee</h4>
                   </div>

                   <div className = "my-4">
                        <NavLink
                      end>
                      {({ isActive, isPending }) =>(
                        <span
                          className={`d-flex gap-3 line isPending ? "pending": ${isActive ?"Active" : "" 

                          }`}
                        > <Link to = "/admin-dashboard/employees/newemployee" className = 'one-off'><span className = "all-employees">Personal Information</span></Link>
                        <Link to = "/admin-dashboard/employees/newemployee/professional" className = "two-off"><span className = "teamss">Professional</span></Link>
                        <Link to = "/admin-dashboard/employees/newemployee/document" className = "two-off"><span className = "teamss">Salary</span></Link>
                        <Link to = "/admin-dashboard/employees/newemployee/accountaccess" className = "two-off"><span className = "teamss">User Account</span></Link>
                        </span>
                       
                      )}
                       </NavLink>
                   </div>

                   {Match ? (
                       <form  onSubmit={handleSubmit(onSubmit)} >
                    <section>
                        <div>
                            <div className = "d-lg-flex gap-4">
                                <div className = " mobile ">
                                    <label htmlFor="" className = "labels">First Name</label>
                                    <input type="text" name="" id="" className = "w-100 add-input" placeholder = "Enter Name" {...register("firstName")}/>
                                    <span className = "spans">{errors.firstName?.message}</span>
                                </div>
                                <div className = " mobilee">
                                    <label htmlFor="" className = "labels">Last Name</label>
                                    <input type="text" name="" id="" className = "w-100 add-input" placeholder = "Enter name" {...register("lastName")}/>
                                    <span className = "spans">{errors.lastName?.message}</span>
                                </div>
                            </div>
                            <div className = "d-lg-flex gap-4 my-4">
                                <div className = " mobile ">
                                    <label htmlFor="" className = "labels">Mobile Number </label>
                                    <input type="text" name="" id="" placeholder = "Enter Number" className = "w-100 add-input" {...register("mobileNumber", {minLength:11})}/>
                                    <span className = "spans">{errors.mobileNumber?.message}</span>
                                </div>
                                <div className = " mobilee">
                                    <label htmlFor="" className = "labels">Email Address</label>
                                    <input type="email" name="" id="" placeholder = "Enter Email Address" className = "w-100 add-input" {...register("email")}/>
                                    <span className = "spans">{errors.email?.message}</span>
                                </div>
                            </div>
                            <div className = "d-lg-flex gap-4 mb-4">
                                <div className = " mobilee">
                                    <label htmlFor="" className = "labels">Date of Birth</label>
                                    <input type="date" name="" id="" placeholder = "select Date" className = "w-100 add-input" {...register("dateofbirth")}/>
                                    <span className = "spans">{errors.dateofbirth?.message}</span>
                                </div>
                                <div className = " mobilee">
                                    <label htmlFor="" className = "labels">Marital Status</label>
                                    <select name="" id="" className = "w-100 select-input" {...register("maritalStatus")}>
                                        <option disabled selected hidden className = "labels" >Select</option>
                                        <option value="Single" className = "labelss">Single</option>
                                        <option value="Married" className = "labelss">Married</option>
                                        <option value="Divorced" className = "labelss">Divorced</option>
                                    </select>
                                    {errors.maritalStatus && <span className = "spans">{errors.maritalStatus?.message}</span>}
                                </div>
                            </div>
                            <div  className = "d-lg-flex gap-4 mb-4">
                                <div className = " mobile">
                                    <label htmlFor="" className = "labels">Gender</label>
                                    <select name="" id="" className = "w-100 select-input"  {...register("gender")}>
                                        <option disabled selected hidden >Select</option>
                                        <option value="Male" className= "labelss">Male</option>
                                        <option value="Female" className = "labelss">Female</option>
                                        <option value="Others" className = "labelss">Others</option>
                                    </select>
                                    {errors.gender && <span className = "spans">{errors.gender?.message}</span>}
                                </div>
                                <div className = " mobilee">
                                    <label htmlFor="" className = "labels">Address</label>
                                    <input type="text" name="" id=""placeholder = "Enter Address" className = "w-100 add-input" {...register("address")}/>
                                    <span className = "spans">{errors.address?.message}</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className = 'thumb'>Thumbnail</h3>
                            <div className = "d-flex gap-2 ">
                                <div className = "pad">
                                   <img src= {error} alt=""/>
                                </div>
                                <div>
                                    <p className = "this">This image will appear in the explore page, upload a square size of 2mb.</p>
                                </div>
                            </div>

                            <div className = "input-file-color d-flex  justify-content-center align-items-center">
                                <div>
                                    <input type="file" name="" id="" ref={fileInputRef} />
                                </div>
                                <div className = " d-flex gap-2 justify-content-center align-items-center omooo" onClick={handleClick}>
                                   <img src= {Imageicon} alt=""/>
                                   <label htmlFor=""  className = "label-upload">Upload Image</label>
                                </div>
                            </div>
                            <div className = "d-flex gap-3 my-4">
                                <Link to = "/admin-dashboard/employees"><button className = "cancel">Cancel</button></Link> 
                                <button className = "save">Save & Continue</button>
                            </div>
                        </div>
                    </section>
                       </form>
                ) : (
                    <Outlet/>
                )
            }


               </section>
           </main>
        </>
    )
}

export default NewEmployee
