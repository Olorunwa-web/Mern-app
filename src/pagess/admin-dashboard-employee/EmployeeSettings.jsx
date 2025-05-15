import React, {useEffect, useState} from 'react'
import profilePic from '../../assets/Mask Group.svg'
import axios from "axios";




const EmployeeSettings = () => {
    const [profile, setProfile] = useState({});
    const token = localStorage.getItem("hr-token")
    useEffect(() => {
        async function userProfile() {
          try {
            const req = await axios.get("https://mern-backend-1-9jn6.onrender.com/api/employee/user/profile", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
    
            if (req.data.success) {
              setProfile(req.data.employee);
            } else {
              console.error(req.data.errMsg);
            }
          } catch (error) {
            console.error("Error fetching profile:", error);
          }
        }
        userProfile();
      }, [token]);
    return (
        <>
           <main className = "summary-container">
                <section className = "pt-3">
                    <h2 className = "task-h1">Settings</h2>
                    <h4 className = "dash-h4">Dashboard/Settings</h4>
                    <div className = " my-4 setting-pad employee-table">
                        <div className = "d-flex gap-3 profile-info">
                            <div className = "profile-width">
                                <h3 className = "info-h2">Profile Information</h3>
                                <p className = "edit-p">Edit your profile Information</p>
                           </div>
                           <div className = "details-width">
                             <div>
                                <label htmlFor="" className = "labels">Username</label>
                                <input type="text" name="" id="" className = "w-100 add-input" placeholder = "Akinwunmi Aisha" disabled value ={profile.fullName || ""}/> 
                             </div> 
                            <div className = "my-3">
                                <div className = "d-flex justify-content-between">
                                   <label htmlFor="" className = "labels">Email Address</label>
                                   <span className = "span-change">Change Account Email</span>
                                </div>
                                <input type="email" name="" id="" className = "w-100 add-input" placeholder = "molikidaniel12@gmail.com" disabled value = {profile.email || "" } />
                            </div>
                           </div>
                        </div>
                        <div className = "d-flex gap-3 mt-5 profile-info ">
                            <div className = "profile-width">
                                <h3 className = "secure-h1">Security</h3>
                            </div>
                            <div className = "details-width">
                                <div className = "d-flex justify-content-between">
                                   <label htmlFor="" className = "labels">Password</label>
                                   <span className = "span-change">Change Password</span>
                                </div>
                                <input type="password" name="" id="" className = "w-100 add-input" placeholder = "xxxxxxxxxx" disabled  value = {profile.password || ""} />                  
                            </div>
                        </div>
                        <div className = "d-flex gap-3 mt-4 profile-info upload">
                            <div className = "profile-width">
                               <h3 className = "secure-h1">Upload Photo</h3>
                            </div>
                            <div className = "details-width">
                                <p className = "profile-pic">Profile pic</p>
                                <img src= {profile.profileImage || profilePic} alt=""  className = "pic-image" />
                               <p className = "picture-text">Your profile pic will be visible next to your name in your profile. Your image should be at least 200x200px and must be in JPG or PNG format. </p>
                               <div className = "d-flex gap-3">
                                  <button className = "cancel">Cancel</button>
                                  <button className = "save" type = "submit">Save Changes</button>
                              </div>
                            </div>

                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default EmployeeSettings
