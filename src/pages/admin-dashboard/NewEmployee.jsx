import { useRef, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { personalinfoSchema } from "../../lib/ValidationSchema";
import { Outlet, Link, NavLink, useMatch } from "react-router-dom";
import "../../Style/Newemploy.css";
import error from "../../assets/Stockholm-icons (4).svg";
import Imageicon from "../../assets/Stockholm-icons (9).svg";
import {newemploy} from "../../db"
import ImageIcon from "../../assets/_master.svg"


const NewEmployee = () => {
  const Match = useMatch("/admin-dashboard/employees/newemployee");


  const [imagePreview, setImagePreview] = useState(null);
  const [imageError, setImageError] = useState("");

  const fileInputRef = useRef(null);

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
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <main className="summary-container mb-3">
        <section className="mt-2">
          <div className="add">
            <h1>Add New Employeee</h1>
            <h4>All Employees / Add New Employee</h4>
          </div>

          <div className="my-4 scroll-employee d-flex gap-3 ">
           
                    <NavLink
                        to = "/admin-dashboard/employees/newemployee"
                        className = "admin-employees-nav-link teamss "
                      end>
                      {({ isActive}) =>(
                        <span
                          className={`d-flex gap-2 align-items-center pt-3 nav-link-header info-width   ${isActive ? "Active" : "" 
                          }`}
                        > 
                        Personal Information
                        </span>
                      )}
                    </NavLink>

                    <NavLink
                        to = "/admin-dashboard/employees/newemployee/professional"
                        className = "admin-employees-nav-link teamss"
                      end>
                      {({ isActive}) =>(
                        <span
                          className={`d-flex gap-2 align-items-center pt-3 nav-link-header   ${isActive ? "Active" : "" 
                          }`}
                        > 
                        Professional
                        </span>
                      )}
                    </NavLink>

                    <NavLink
                        to = "/admin-dashboard/employees/newemployee/document"
                        className = "admin-employees-nav-link teamss"
                      end>
                      {({ isActive}) =>(
                        <span
                          className={`d-flex gap-2 align-items-center pt-3 nav-link-header   ${isActive ? "Active" : "" 
                          }`}
                        > 
                        Document
                        </span>
                      )}
                    </NavLink>
                    <NavLink
                        to = "/admin-dashboard/employees/newemployee/accountaccess"
                        className = "admin-employees-nav-link teamss"
                      end>
                      {({ isActive}) =>(
                        <span
                          className={`d-flex gap-2 align-items-center pt-3 nav-link-header account-width  ${isActive ? "Active" : "" 
                          }`}
                        > 
                        Account Access
                        </span>
                      )}
                    </NavLink>
          </div>

          {Match ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              <section>
                <div>
                  <div className="d-lg-flex gap-4">
                    <div className=" mobile ">
                      <label htmlFor="" className="labels">
                        First Name
                      </label>
                      <input
                        type="text"
                        name=""
                        id=""
                        className="w-100 add-input"
                        placeholder="Enter Name"
                        {...register("firstName")}
                      />
                      <span className="spans">{errors.firstName?.message}</span>
                    </div>
                    <div className=" mobilee">
                      <label htmlFor="" className="labels">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name=""
                        id=""
                        className="w-100 add-input"
                        placeholder="Enter name"
                        {...register("lastName")}
                      />
                      <span className="spans">{errors.lastName?.message}</span>
                    </div>
                  </div>
                  <div className="d-lg-flex gap-4 my-4">
                    <div className=" mobile ">
                      <label htmlFor="" className="labels">
                        Mobile Number{" "}
                      </label>
                      <input
                        type="tel"
                        name=""
                        id=""
                        placeholder="Enter Number"
                        className="w-100 add-input"
                        {...register("mobileNumber")}
                      />
                      <span className="spans">
                        {errors.mobileNumber?.message}
                      </span>
                    </div>
                    <div className=" mobilee">
                      <label htmlFor="" className="labels">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name=""
                        id=""
                        placeholder="Enter Email Address"
                        className="w-100 add-input"
                        {...register("email")}
                      />
                      <span className="spans">{errors.email?.message}</span>
                    </div>
                  </div>
                  <div className="d-lg-flex gap-4 mb-4">
                    <div className=" mobilee">
                      <label htmlFor="" className="labels">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        name=""
                        id=""
                        placeholder="select Date"
                        className="w-100 add-input"
                        {...register("dateofBirth", {required: true})}
                      />
                      <span className="spans">
                        {errors.dateofBirth?.message}
                      </span>
                    </div>
                    <div className=" mobilee">
                      <label htmlFor="" className="labels">
                        Marital Status
                      </label>
                      <select
                        name=""
                        id=""
                        className="w-100 select-input"
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
                        <span className="spans">
                          {errors.maritalStatus?.message}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="d-lg-flex gap-4 mb-4">
                    <div className=" mobile">
                      <label htmlFor="" className="labels">
                        Gender
                      </label>
                      <select
                        name=""
                        id=""
                        className="w-100 select-input"
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
                        <span className="spans">{errors.gender?.message}</span>
                      )}
                    </div>
                    <div className=" mobilee">
                      <label htmlFor="" className="labels">
                        Address
                      </label>
                      <input
                        type="text"
                        name=""
                        id=""
                        placeholder="Enter Address"
                        className="w-100 add-input"
                        {...register("address")}
                      />
                      <span className="spans">{errors.address?.message}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="thumb">Thumbnail</h3>
                  <div className="d-flex gap-2 ">
                    <div className="pad">
                      <img src={error} alt="" />
                    </div>
                    <div>
                      <p className="this">
                        This image will appear in the explore page, upload a
                        square size of 2mb.
                      </p>
                    </div>
                  </div>

                 
                  <div className=" upload-img d-flex flex-column align-items-center position-relative ">
                <img
                  src={imagePreview || ImageIcon}
                  alt=""
                  className="inner-img "
                  style={{ maxWidth: "100%", maxHeight: "200px" }}
                  />
                 <input
                 
                  type="file"
                  style={{ maxWidth: "100%", marginBottom: "110px" }}
                  className=" position-absolute top-50 start-0 translate-middle-y opacity-0 "
                  role="button"
                  {...register("profileImage", {required: true})}
                  onChange={handleImageChange}
                />
                  <span className="spans">{errors.profileImage?.message}</span>
                  {/* {error.profileImage && <span>{error.profileImage.message}</span>} */}
                {imageError && <p className="text-danger">{imageError}</p>}
              </div>
                  <div className="d-flex gap-3 my-4">
                    <button
                      className="cancel"
                      disabled={isSubmitting}
                      onClick={() => {
                        reset();
                        setImagePreview(null);
                      }}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="save" disabled = {isSubmitting}>
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
