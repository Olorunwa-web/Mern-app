import React from 'react'
import '../../Style/Setttings.css'
import profile from '../../assets/Mask Group.svg'



const Settings = () => {
    return (
        <>
            <main className = "summary-container">
                <section>
                    <h2 className = "task-h1">Settings</h2>
                    <h4 className = "dash-h4">Dashboard/Settings</h4>
                    <div className = " my-4 setting-pad">
                        <div className = "d-flex gap-3 profile-info">
                            <div className = "profile-width">
                                <h3 className = "info-h2">Profile Information</h3>
                                <p className = "edit-p">Edit your profile Information</p>
                           </div>
                           <div className = "details-width">
                             <div>
                                <label htmlFor="" className = "labels">Username</label>
                                <input type="text" name="" id="" className = "w-100 add-input" placeholder = "Akinwunmi Aisha"/> 
                             </div>
                            <div className = "my-3">
                                <div className = "d-flex justify-content-between">
                                   <label htmlFor="" className = "labels">Email Address</label>
                                   <span className = "span-change">Change Account Email</span>
                                </div>
                                <input type="email" name="" id="" className = "w-100 add-input" placeholder = "Enter Email Address"/>
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
                                <input type="password" name="" id="" className = "w-100 add-input" placeholder = "xxxxxxxxxx"/>                  
                            </div>
                        </div>
                        <div className = "d-flex gap-3 mt-4 profile-info upload">
                            <div className = "profile-width">
                               <h3 className = "secure-h1">Upload Photo</h3>
                            </div>
                            <div className = "details-width">
                                <p className = "profile-pic">Profile pic</p>
                                <img src= {profile} alt=""/>
                               <p className = "picture-text">Your profile pic will be visible next to your name in your profile. Your image should be at least 200x200px and must be in JPG or PNG format. </p>
                               <div className = "d-flex gap-3">
                                  <button className = "cancel">Cancel</button>
                                  <button className = "save">Save Changes</button>
                              </div>
                            </div>

                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default Settings
