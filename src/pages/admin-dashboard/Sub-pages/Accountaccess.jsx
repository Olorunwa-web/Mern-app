import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import ModalX from '../../../Components/ModalX'
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import * as yup from "yup";
import {userSchema} from '../../../lib/ValidationSchema'
import axios from "axios"
import toast from "react-hot-toast"

const Accountaccess = () => {
    const [modalShow, setModalShow] = React.useState(false);
    const navigate = useNavigate();
    
    
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(userSchema),
      });
      const token = localStorage.getItem("hr-token")

      const onSubmit = async (data) => {
        localStorage.setItem("userAccount", JSON.stringify(data));
        console.log(data);
        const personalInfo = JSON.parse(localStorage.getItem("personalInfo"));
        const professionalInfo = JSON.parse(localStorage.getItem("professional"));
        const salaryInfo = JSON.parse(localStorage.getItem("salary"));
        const finalPayload = new FormData();
        finalPayload.append("firstName", personalInfo?.firstName || "");
        finalPayload.append("lastName", personalInfo?.lastName || "");
        finalPayload.append("mobileNumber", personalInfo?.mobileNumber || "");
        finalPayload.append("email", personalInfo?.email || "");
        finalPayload.append("dateofBirth", personalInfo?.dateofBirth || "");
        finalPayload.append("maritalStatus", personalInfo?.maritalStatus || "");
        finalPayload.append("gender", personalInfo?.gender || "");
        finalPayload.append("address", personalInfo?.address || "");
        finalPayload.append("profileImage", personalInfo?.profileImage); // Append profile image
        finalPayload.append("jobTitle", professionalInfo?.jobTitle || "");
        finalPayload.append("department", professionalInfo?.department || "");
        finalPayload.append(
          "officeOfEmployment",
          professionalInfo?.officeOfEmployment || ""
        );
        finalPayload.append(
          "employmentStatus",
          professionalInfo?.employmentStatus || ""
        );
        finalPayload.append("salary", salaryInfo?.salary || 0);
        finalPayload.append("startDate", salaryInfo?.startDate || "");
        finalPayload.append("password", data?.password || "");
        finalPayload.append("confirmPassword", data?.confirmPassword || "");
    
        console.log("Final Payload:", finalPayload);
       
        try {
          const response = await axios.post(
            "https://mern-backend-1-9jn6.onrender.com/api/auth/signup",
            finalPayload,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
              },
            }
          );
          if(response.data.success){
            toast.success(response.data.message);
            navigate("/admin-employee")
          }
         
          console.log("Signup successful:", response.data);
          
        } catch (error) {
          if (error.response && error.response.data) {
            toast.error(error.response.data.errMsg || "An error occurred");
          } else {
            toast.error("An unexpected error occurred");
          }
          console.error("Signup error:", error);
        }
    
        reset();
      };
    



    return (
        <>
            <main>
                <form onSubmit={handleSubmit(onSubmit)}>
                <section>
                <div className = "d-lg-flex gap-4">
                    <div className = " mobile ">
                        <label htmlFor="" className = "labels">Password</label>
                        <input type="password" name="" id="password" className = "w-100 add-input" placeholder = "Enter Password"  {...register("password")}/> 
                        <span className = "spans">{errors.password?.message}</span>      
                    </div>
                    <div className = " mobilee">
                        <label htmlFor="" className = "labels">Confirm Password</label>
                        <input type="password" name="" id="confirmpassword" className = "w-100 add-input" placeholder = "Enter Password"  {...register("confirmPassword")}/>
                        <span className = "spans">{errors.confirmPassword?.message}</span>     
                     </div>
                </div> 
                <div className = "d-flex gap-3 my-5">
                    <button className = "cancel" disabled = {isSubmitting}>Cancel</button>
                    <button className = "save" type = "submit" onClick={() => setModalShow(true)} >Save & Continue</button>
                </div>
                </section>
                      <ModalX
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
                </form>
            </main>
        </>
    )
}

export default Accountaccess
