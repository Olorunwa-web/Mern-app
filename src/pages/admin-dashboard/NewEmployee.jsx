import { useRef, useState, useContext } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { personalinfoSchema } from "../../lib/ValidationSchema";
import { Outlet, Link, NavLink, useMatch } from "react-router-dom";
import "../../Style/Newemploy.css";
import error from "../../assets/Stockholm-icons (4).svg";
import Imageicon from "../../assets/Stockholm-icons (9).svg";
import {newemploy} from "../../db";
import OpenContext from '../../context/OpenContext';
import ImageIcon from "../../assets/_master.svg"
import 'simplebar-react/dist/simplebar.min.css';
import SimpleBar from 'simplebar-react';

const NewEmployee = () => {
  const Match = useMatch("/admin-dashboard/employees/newemployee");


  const [imagePreview, setImagePreview] = useState(null);
  const [imageError, setImageError] = useState("");

  const fileInputRef = useRef(null);

  const { open } = useContext(OpenContext);


  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(personalinfoSchema),
  });
  const onSubmit = (data) => {
    // Check if a file was selected
    if (data.profileImage && data.profileImage.length > 0) {
      const file = data.profileImage[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        // Convert the file to base64
        const base64Image = reader.result;

        const formDataWithImage = {
          ...data,
          profileImage: base64Image,
        };

        localStorage.setItem("personalInfo", JSON.stringify(formDataWithImage));
        reset();
        setImagePreview(null);
        console.log("Saved to local storage:", formDataWithImage);
      };

      reader.readAsDataURL(file);
    } else {
      console.error("No file selected");
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setImageError("The file is too large (max 2MB)");
        setImagePreview(null);
        return;
      } else {
        setImageError("");
      }
      setImageError("")
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
    if (!file) {
      setImageError("Image is required");
      setImagePreview(null)
      return;
    }

  };

  console.log("Image Error", imageError);
  return (
    <>
      <main className="px-3 md:px-0 lg:px-0 w-19/20 mx-auto max-w-full">
        <section className="my-4">
          <div className="flex flex-col gap-1">
            <h1 className = 'font-sans font-medium text-xl text-[#161E54]'>Add New Employeee</h1>
            <h4 className = 'font-sans font-medium text-base text-[#404040]'>All Employees / Add New Employee</h4>
          </div> 
          <SimpleBar forceVisible="x" autoHide={false} style={{ maxWidth: '100%' }}>
           <div className = 'w-full pb-2 border-b-2 border-[#F3F3F3]  my-7'>
            <div className="flex gap-6 whitespace-nowrap ">
              <NavLink
                 to = "/admin-dashboard/employees/newemployee"
                 className = " "
                 end>
                {({ isActive}) =>(
                  <span
                    className={`font-sans font-medium text-[0.93rem] pb-[10px]   ${isActive ? " text-[#111014] border-b-2 border-[#6D5DD3]" : "text-[#878789] " }`}> 
                     Personal Information
                  </span>
                )}
              </NavLink>
              <NavLink
                 to = "/admin-dashboard/employees/newemployee/professional"
                 className = " "
                 end>
                 {({ isActive}) =>(
                    <span
                      className={`font-sans font-medium text-[0.93rem] pb-[10px]   ${isActive ? " text-[#111014] border-b-2 border-[#6D5DD3]" : "text-[#878789]"  }`} > 
                      Professional
                    </span>
                  )}
               </NavLink>
               <NavLink
                  to = "/admin-dashboard/employees/newemployee/document"
                  className = " "
                  end>
                  {({ isActive}) =>(
                    <span
                      className={`font-sans font-medium text-[0.93rem] pb-[10px]  ${isActive ? " text-[#111014] border-b-2 border-[#6D5DD3]" : "text-[#878789]"  }`}> 
                      Salary
                    </span>
                  )}
               </NavLink>
               <NavLink
                  to = "/admin-dashboard/employees/newemployee/accountaccess"
                  className = " "
                  end>
                  {({ isActive}) =>(
                    <span
                      className={`font-sans font-medium text-[0.93rem] pb-[10px]  ${isActive ? " text-[#111014] border-b-2 border-[#6D5DD3]" : "text-[#878789]" }`} > 
                      User Account 
                    </span>
                  )}
               </NavLink>
           </div>
          </div>
          </SimpleBar>

          {Match ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              <section>
                <div className = 'flex flex-col gap-y-4'>
                  <div className= {`flex flex-col  ${open ? "md:flex-col lg:flex-row gap-y-4 gap-x-6  " : "md:flex-row gap-x-6"}`}>
                    <div className= {`w-full ${open ? " " : " "}  flex flex-col gap-2`}>
                      <label htmlFor="" className="font-sans font-medium text-sm text-[#111014] ">
                        First Name*
                      </label>
                      <input
                        type="text"
                        name=""
                        id=""
                        className="w-full bg-white border-1 rounded-[5px] focus:shadow-sm focus:border-1 focus:border-blue-600 focus:outline focus:outline-blue-600 font-sans font-normal md:text-sm text-base text-[#878789] px-3 py-2 border-[#959595] "
                        placeholder="Enter Name"
                        {...register("firstName")}
                      />
                      <span className="text-xs mt-[-3px] font-inter font-medium text-[#EC5E5E]">{errors.firstName?.message}</span>
                    </div>
                    <div className="w-full flex flex-col gap-2">
                      <label htmlFor="" className="font-sans font-medium text-sm text-[#111014]">
                        Last Name*
                      </label>
                      <input
                        type="text"
                        name=""
                        id=""
                        className="w-full bg-white border-1 rounded-[5px] focus:shadow-sm focus:border-1 focus:border-blue-600 focus:outline focus:outline-blue-600 font-sans font-normal text-base md:text-sm text-[#878789] py-2 px-3 border-[#959595]"
                        placeholder="Enter name"
                        {...register("lastName")}
                      />
                      <span className="text-xs mt-[-3px] font-inter font-medium text-[#EC5E5E]">{errors.lastName?.message}</span>
                    </div>
                  </div>
                  <div  className= {`flex flex-col  ${open ? "md:flex-col lg:flex-row gap-y-4 gap-x-6  " : "md:flex-row gap-x-6"}`}>
                    <div className="w-full flex flex-col gap-2 ">
                      <label htmlFor="" className="font-sans font-medium text-sm text-[#111014]">
                        Mobile Number*{" "}
                      </label>
                      <input
                        type="tel"
                        name=""
                        id=""
                        placeholder="Enter Number"
                        className="w-full bg-white border-1 rounded-[5px] focus:shadow-sm focus:border-1 focus:border-blue-600 focus:outline focus:outline-blue-600 font-sans font-normal text-base md:text-sm text-[#878789] py-2 px-3 border-[#959595]"
                        {...register("mobileNumber")}
                      />
                      <span className="text-xs mt-[-3px] font-inter font-medium text-[#EC5E5E]">
                        {errors.mobileNumber?.message}
                      </span>
                    </div>
                    <div className="w-full flex flex-col gap-2">
                      <label htmlFor="" className="font-sans font-medium text-sm text-[#111014]">
                        Email Address*
                      </label>
                      <input
                        type="email"
                        name=""
                        id=""
                        placeholder="Enter Email Address"
                        className="w-full bg-white border-1 rounded-[5px] focus:shadow-sm focus:border-1 focus:border-blue-600 focus:outline focus:outline-blue-600 font-sans font-normal text-base md:text-sm text-[#878789] py-2 px-3 border-[#959595]"
                        {...register("email")}
                      />
                      <span className="text-xs mt-[-3px] font-inter font-medium text-[#EC5E5E]">{errors.email?.message}</span>
                    </div>
                  </div>
                  <div className= {`flex flex-col  ${open ? "md:flex-col lg:flex-row gap-y-4 gap-x-6  " : "md:flex-row gap-x-6"}`}>
                    <div className="w-full flex flex-col gap-2">
                      <label htmlFor="" className="font-sans font-medium text-sm text-[#111014]">
                        Date of Birth*
                      </label>
                      <input
                        type="date"
                        name=""
                        id=""
                        placeholder="select Date"
                        className="w-full bg-white border-1 rounded-[5px] focus:shadow-sm focus:border-1 focus:border-blue-600 focus:outline focus:outline-blue-600 font-sans font-normal text-base md:text-sm text-[#878789] py-2 px-3 border-[#959595]"
                        {...register("dateofBirth", {required: true})}
                      />
                      <span className="text-xs mt-[-3px] font-inter font-medium text-[#EC5E5E]">
                        {errors.dateofBirth?.message}
                      </span>
                    </div>
                    <div className="w-full flex flex-col gap-2">
                      <label htmlFor="" className="font-sans font-medium text-sm text-[#111014]">
                        Marital Status*
                      </label>
                      <select
                        name=""
                        id=""
                        className="w-full bg-white border-1 rounded-[5px] focus:shadow-md focus:border-1 focus:border-blue-600 focus:outline focus:outline-blue-600 font-sans font-normal text-base md:text-sm text-[#878789] py-2 px-3 border-[#959595]"
                        {...register("maritalStatus", { required: true })}
                      >
                        <option disabled selected hidden className="labels">
                          Select
                        </option>
                        <option value="single" className="labelss">
                          Single
                        </option>
                        <option value="married" className="labelss">
                          Married
                        </option>
                      </select>
                      {errors.maritalStatus && (
                        <span className="text-xs mt-[-3px] font-inter font-medium text-[#EC5E5E]">
                          {errors.maritalStatus?.message}
                        </span>
                      )}
                    </div>
                  </div>
                  <div  className= {`flex flex-col  ${open ? "md:flex-col lg:flex-row gap-y-4 gap-x-6  " : "md:flex-row gap-x-6"}`}>
                    <div className="w-full flex flex-col gap-2">
                      <label htmlFor="" className="font-sans font-medium text-sm text-[#111014]">
                        Gender*
                      </label>
                      <select
                        name=""
                        id=""
                        className="w-full bg-white border-1 rounded-[5px] focus:shadow-sm focus:border-1 focus:border-blue-600 focus:outline focus:outline-blue-600 font-sans font-normal text-base md:text-sm text-[#878789] py-2 px-3 border-[#959595]"
                        {...register("gender", { required: true })}
                      >
                        <option disabled selected hidden>
                          Select
                        </option>
                        <option value="male" className="labelss">
                          Male
                        </option>
                        <option value="female" className="labelss">
                          Female
                        </option>
                      </select>
                      {errors.gender && (
                        <span className="text-xs mt-[-3px] font-inter font-medium text-[#EC5E5E]">{errors.gender?.message}</span>
                      )}
                    </div>
                    <div className="w-full flex flex-col gap-2">
                      <label htmlFor="" className="font-sans font-medium text-sm text-[#111014]">
                        Address*
                      </label>
                      <input
                        type="text"
                        name=""
                        id=""
                        placeholder="Enter Address"
                        className="w-full bg-white border-1 rounded-[5px] focus:shadow-sm focus:border-1 focus:border-blue-600 focus:outline focus:outline-blue-600 font-sans font-normal text-base md:text-sm text-[#878789] py-2 px-3 border-[#959595]"
                        {...register("address")}
                      />
                      <span className="text-xs mt-[-3px] font-inter font-medium text-[#EC5E5E]">{errors.address?.message}</span>
                    </div>
                  </div>
                </div>

                <div className = 'my-4 flex flex-col gap-2'>
                  <h3 className="font-sans font-medium text-sm text-[#111014]">Thumbnail</h3>
                  <div className="flex items-center gap-1 ">
                    <img src={error} alt="" />
                    <p className="font-sans font-normal text-xs text-[#747474]">
                        This image will appear in the explore page, upload a
                        square size of 2mb.
                    </p>
                  </div>

                 
                  <div className=" bg-[#EFEFFF] my-2  rounded-[5px] w-[180px] h-[180px] flex justify-center items-center relative ">
                <img
                  src={imagePreview || ImageIcon}
                  alt=""
                  className= {`rounded-[5px]`}
                  style={{ maxWidth: "100%", maxHeight: "100%" }}
                  />
                 <input
                  type="file"
                  style={{ maxWidth: "100%", marginBottom: "110px" }}
                  className="h-[180px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 "
                  role="button"
                  {...register("profileImage", {required: true})}
                  onChange={handleImageChange}
                />
              </div>
                {imageError && (<p className="text-xs mt-[-3px] font-inter font-medium text-[#EC5E5E]">{imageError}</p>)}
                {/* {errors.profileImage && (
                  <p className="text-xs mt-[-5px] font-inter font-medium text-[#EC5E5E]">{errors.profileImage.message}</p>
                  )} */}
                  <div className="flex gap-3 my-4">
                    <button
                      className="w-full md:w-40 py-2 border border-[#DB3E3E]  font-medium text-base md:text-sm text-[#DB3E3E] hover:text-white hover:bg-[#DB3E3E] rounded-sm"
                      disabled={isSubmitting}
                      onClick={() => {
                        reset();
                        setImagePreview(null);
                      }}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="w-full md:w-40 py-2 bg-[#3439CA] rounded-sm font-medium   text-base md:text-sm text-[#F3F2FB]" disabled = {isSubmitting}>
                      Save & Continue
                    </button>
                  </div>
                </div>
              </section>
            </form>
          ) : (
            <Outlet />
          )}
        </section>
      </main>
    </>
  );
};

export default NewEmployee;
