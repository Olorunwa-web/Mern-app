import React, { useContext } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import ModalX from '../../../Components/ModalX'
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import * as yup from "yup";
import {userSchema} from '../../../lib/ValidationSchema'
import axios from "axios"
import toast from "react-hot-toast"
import OpenContext from '../../../context/OpenContext';




const Accountaccess = () => {
    const [modalShow, setModalShow] = React.useState(false);
    const navigate = useNavigate();

    const { open } = useContext(OpenContext)
    
    
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
                <section className = 'flex flex-col gap-y-4'>
                <div className =  {`flex flex-col  ${open ? "md:flex-col lg:flex-row gap-y-4 gap-x-6  " : "md:flex-row gap-x-6"}`}>
                    <div className = "w-full flex flex-col gap-2 ">
                        <label htmlFor="" className = "font-sans font-medium text-sm text-[#111014]">Password*</label>
                        <input type="" name="" id="password" className = "w-full bg-white border-1 rounded-[5px] focus:shadow-sm focus:border-1 focus:border-blue-600 focus:outline focus:outline-blue-600 font-sans font-normal md:text-sm text-base text-[#878789] px-3 py-2 border-[#959595]" placeholder = "Enter Password"  {...register("password")}/> 
                        <span className = "text-xs mt-[-3px] font-inter font-medium text-[#EC5E5E]">{errors.password?.message}</span>      
                    </div>
                    <div className = "w-full flex flex-col gap-2">
                        <label htmlFor="" className = "font-sans font-medium text-sm text-[#111014]">Confirm Password*</label>
                        <input type="password" name="" id="confirmpassword" className = "w-full bg-white border-1 rounded-[5px] focus:shadow-sm focus:border-1 focus:border-blue-600 focus:outline focus:outline-blue-600 font-sans font-normal md:text-sm text-base text-[#878789] px-3 py-2 border-[#959595]" placeholder = "Enter Password"  {...register("confirmPassword")}/>
                        <span className = "text-xs mt-[-3px] font-inter font-medium text-[#EC5E5E]">{errors.confirmPassword?.message}</span>     
                     </div>
                </div> 
                <div className = "flex gap-3 my-4">
                    <button className = "w-full md:w-40 py-2 border border-[#DB3E3E]  font-medium text-base md:text-sm text-[#DB3E3E] hover:text-white hover:bg-[#DB3E3E] rounded-sm" disabled = {isSubmitting}>Cancel</button>
                    <button className = "w-full md:w-40 py-2 bg-[#3439CA] rounded-sm font-medium   text-base md:text-sm text-[#F3F2FB]" type = "submit" onClick={() => setModalShow(true)} >Save & Continue</button>
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
