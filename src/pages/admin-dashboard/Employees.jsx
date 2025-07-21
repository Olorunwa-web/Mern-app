import React from 'react';
import { Outlet,Link, NavLink, useMatch} from 'react-router-dom'
import '../../Style/Employees.css'
import { useEffect, useState, useRef } from 'react';
import Loadings from "../../utils/Loadings"
import axios from "axios";
import 'simplebar-react/dist/simplebar.min.css';
import SimpleBar from 'simplebar-react';
import cancel from '../../assets/Stockholm-icons (11).svg';




const Employees = (props) => {
    const Match = useMatch("/admin-dashboard/employees")

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const token = localStorage.getItem("hr-token");
  const modalRef = useRef();

  // ================================================
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowModal(false);
      }
    }

    if (showModal) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showModal]);
  // =====================================================


  const fetchEmployees = async () => {
    setLoading(true); //
    try {
      const response = await axios.get(
        `https://mern-backend-1-9jn6.onrender.com/api/employee/users?page=${page}&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.users);
      setEmployees(response.data.users);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      setError(err.response?.data.errMsg || "Error fetching employees");
    } finally {
      setLoading(false);
    }
  };

  // Pagination handlers
  const handleNext = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const getEmployeeById = async (id) => {
    try {
      setLoading(true);
      const req = await axios.get(`https://mern-backend-1-9jn6.onrender.com/api/employee/${id}`, {
        headers: { Authorization: `Bearer ${token}`},
      });
      console.log(req.data.employee);
      
      setSelectedTask(req.data.employee);
      setShowModal(true); 
    } catch (error) {
      setError("Error fetching task details");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
      fetchEmployees();
  }, [page])

  if (loading)
    return (
      <div className="flex min-h-screen bg-white w-full items-center justify-center">
        <Loadings />{" "}
      </div>
    );

    if (error) return <p>{error}</p>;
    const handleRowClick = (employeeId) => {
      getEmployeeById(employeeId);
    };

    const handlemodal = (_id) => {
      setShowModal(true); 
      handleRowClick(_id)       
    };
    
   
    return (
        <>
            <main className = ' px-3 md:px-0 lg:px-0 w-19/20 mx-auto max-w-full' >
                <section className = "my-4">
                {Match ? 
                (
                    <section>
                    <div className = "flex flex-col gap-1">
                        <h1 className = 'font-sans font-medium text-xl text-[#161E54]'>Employee</h1>
                        <h4 className = 'font-sans font-medium text-base text-[#404040]'>Dashboard/Employee</h4>
                    </div>
                    <div className = 'flex justify-between items-center pb-2 border-b-2 border-[#F3F3F3]  my-7'>
                        <div className = "flex gap-4  ">
                          <NavLink
                             className = ""
                             end> 
                            {({ isActive}) =>(
                             <span
                               className={`font-sans font-medium text-[0.97rem] pb-4 ${isActive ? "is-Active  text-[#111014] border-b-2 border-[#6D5DD3]  " : "text-[#878789]" 
                             }`}> 
                               All Employees
                             </span>
                             )}
                           </NavLink>

                           <NavLink
                               to = "/admin-dashboard/employees/teams"
                               className = ""
                             end>
                             {({ isActive}) =>(
                              <span
                                className={`font-sans font-medium text-[0.97rem] pb-4  ${isActive ? " text-[#111014] border-b-2 border-[#6D5DD3]" : "text-[#878789]" 
                               }`}> 
                                Teams
                               </span>
                               )}
                            </NavLink>
                         </div>
                         <div>
                             <Link className = "" to = "/admin-dashboard/employees/newemployee"><button className = "bg-[#3439CA] p-2 rounded-sm text-[#F3F2FB] text-neural text-sm font-medium  ">New Employee</button></Link>
                          </div>
                      </div>


                    <section className = " border-[0.5px] border-[#E4E8ED] rounded-lg my-4">
                      <div className = " border-[0.5px] border-[#E4E8ED] rounded-t-lg ">
                        <SimpleBar forceVisible="x" autoHide={false} style={{ maxWidth: '100%' }}>
                          <div className = "min-w-[1000px] w-full ">
                            <table className=" table-auto w-full ">
                            <thead className = " ">
                              <tr className = 'text-left    '>
                                 <th className = 'whitespace-nowra py-2 bg-[#F7F9FB] rounded-ss-lg ps-4 font-inter font-medium text-base text-[#292929]'>
                                  Name
                                 </th>
                                 <th className = "whitespace-nowra py-2 bg-[#F7F9FB] font-inter font-medium text-base text-[#292929]">
                                  Email
                                 </th>
                                 <th className = "whitespace-nowra py-2 bg-[#F7F9FB] font-inter font-medium text-base text-[#292929]">
                                  Team
                                 </th>
                                 <th className = "whitespace-nowrap py-2 bg-[#F7F9FB] font-inter font-medium text-base text-[#292929]">
                                  Supervisor
                                 </th>
                                 <th className = "whitespace-nowrap text-center  py-2 bg-[#F7F9FB] rounded-tr-lg font-inter font-medium text-base text-[#292929]">
                                  Status 
                                 </th>
                               </tr>
                            </thead>
                            <tbody className = 'divide-y  divide-[#E4E8ED] '>
                              {employees.map((allemployees)=>{
                                  const {_id, profileImage, firstName,lastName, email,department,employmentStatus} = allemployees
                                     return(
                                       <tr  key = {_id} onClick={()=>handlemodal(_id)}>
                                          <td  className = "flex gap-2 py-2 items-center ps-4">
                                               <img src={profileImage} alt="" className = "w-7 h-7 rounded-full"/>
                                               <span className = "font-sans font-medium text-sm text-[#292929]">{`${firstName} ${lastName}`}</span>
                                          </td>
                                          <td className = '' ><span className = "font-sans font-medium text-sm text-[#292929] ">{email}</span></td>
                                          <td className = ""><span className = "font-sans font-medium text-sm text-[#292929]" >{department?.name || "No Team"}</span></td>
                                          <td className = ""><span className = "font-sans font-medium text-sm text-[#292929] " >{allemployees ?.department?.manager.firstName || "No Supervisor yet"}</span></td>
                                          {/* <td className = "table-cell pt-3"><span className = {`action-status ${employmentStatus.replace(/\s+/, "-").toLowerCase()}`}>{employmentStatus}</span></td> */}
                                          <td className = 'text-center'>
                                            <span className = {` font-inter font-regular text-sm rounded-full px-4 py-1
                                              ${employmentStatus.toLowerCase() === "hybrid"  ? "bg-[#E2E3F8] text-[#3439CA]  " :
                                                employmentStatus.toLowerCase() === "remote" ? "bg-[#F6ECDC] text-[#F29B07]" :
                                                employmentStatus.toLowerCase() === "on-site" ? "bg-[#E7F9F3]  text-[#0D805D] " :
                                                ""
                                                }`}>{employmentStatus}</span>
                                          </td>
                                       </tr>
                                      )
                                   })}
                              </tbody>
                            </table>
                          </div>
                        </SimpleBar>

                        {/*  */}

                        {showModal && (
                          <div className="fixed inset-0 px-3 md:px-0 bg-black/30  flex items-center justify-center z-50">
                            <div ref= {modalRef} onClick={(e) => e.stopPropagation()} className="bg-white rounded-xl p-1 shadow-lg transform transition-all duration-100 ease-in-out   opacity-100 animate-modalFade w-full max-w-xl ">
                              <div>
                                {selectedTask ? (
                                  <>
                                   <div className = 'bg-[#EDF5FF] md:py-13 py-10 relative rounded-t-xl rounded-b-3xl '>
                                       <img src= {cancel} onClick={() => setShowModal(false)} className = 'w-7 h-7 absolute top-2 right-2' alt=""/>
                                       <div className = 'absolute top-[100%] left-[2.6rem]  md:left-[12%] -translate-x-1/2 -translate-y-1/2  '>
                                          <img src={selectedTask.profileImage} alt=""  className = "md:w-18 w-13 h-13 md:h-18 border-white border-4  rounded-full" />
                                       </div>
                                    </div>
                                    <section className = 'md:mt-11 mt-10 mx-3  md:mx-4'>
                                       <div className = "flex justify-between  items-center  " >
                                          <div>
                                             <h3 className = ' font-sans font-medium text-base md:text-[1.1rem] text-[#0E0A2D] '><strong></strong> {selectedTask.firstName} {selectedTask.lastName}</h3>
                                             <p className = 'mt-[-1px] font-sans font-normal text-sm text-[#747474]'><strong></strong> {selectedTask.email}</p>
                                         </div>
                                         <div className = 'border-1 flex gap-2 items-center justify-center border-[#D9D9D9] rounded-sm py-[4px] px-2'>
                                            <div className = 'w-[6px] h-[6px] rounded-full bg-[#3439CA]'></div>
                                             <span className = 'mt-[-1px] font-sans font-normal text-sm text-[#878789]'>{selectedTask.role}</span>
                                          </div>
                                       </div>
                                       <div className = 'my-6 flex flex-col gap-y-3'>
                                       <div className = 'my- w-full  md:w-9/12 max-w-full borde   flex flex-col gap-y-3 md:flex-row md:justify-between'>
                                          <div className = "md:border-r-1 md:pr-8 border-[#D9D9D9] flex justify-between md:flex-col ">
                                            <h3 className = "font-sans font-normal text-sm text-[#747474]">Mobile Number</h3>
                                            <h6 className = "font-sans font-medium text-sm text-[#1A1A1A]">{selectedTask?.mobileNumber}</h6>
                                         </div>
                                         <div className = "md:border-r-1 md:pr-8 border-[#D9D9D9] flex justify-between md:flex-col">
                                            <h3 className = "font-sans font-normal text-sm text-[#747474]">Date of Birth</h3>
                                            <h6 className = "font-sans font-medium text-sm text-[#1A1A1A]">{selectedTask?.dateofBirth.slice(0,10)}</h6>
                                         </div>
                                         <div className = " flex justify-between md:flex-col">
                                            <h3 className = 'font-sans font-normal text-sm text-[#747474]'>Martial Status</h3>
                                            <h6 className = "font-sans font-medium text-sm text-[#1A1A1A]">{selectedTask?.maritalStatus}</h6>
                                         </div>
                                       </div>
                                       <div className = 'w-full mb-2 md:w-9/12 max-w-full    flex flex-col gap-y-3 md:gap-x-10 md:flex-row'>
                                         <div className = "md:border-r-1 md:pr-20 border-[#D9D9D9] flex justify-between md:flex-col">
                                            <h3 className = "font-sans font-normal text-sm text-[#747474]">Gender</h3>
                                            <h6 className = "font-sans font-medium text-sm text-[#1A1A1A]">{selectedTask.gender}</h6>
                                          </div>
                                          <div className = " md:pl- flex justify-between md:flex-col">
                                             <h3 className = " w-[50%]  md:w-full font-sans font-normal text-sm text-[#747474]">Address</h3>
                                            <h6 className = "w-[50%] text-end md:whitespace-nowrap md:w-full font-sans font-medium text-sm text-[#1A1A1A]">No {selectedTask?.address}</h6>
                                          </div>
                                       </div>
                                        <hr className = 'text-[#00000017] pt-2 '/>
                                        <div className = 'my- w-full  md:w-10/12 max-w-full borde  flex flex-col gap-y-3 md:flex-row md:justify-between'>
                                          <div className = " flex justify-between md:flex-col ">
                                             <h3 className = "font-sans font-normal text-sm text-[#747474]">Office of Employment</h3>
                                             <h6 className = "font-sans font-medium text-sm text-[#1A1A1A]">{selectedTask?.officeOfEmployment}</h6>
                                          </div>
                                          <div className = " flex justify-between md:flex-col">
                                             <h3 className = 'font-sans font-normal text-sm text-[#747474]'>Job Title</h3>
                                             <h6 className = "font-sans font-medium text-sm text-[#1A1A1A]">{selectedTask.jobTitle}</h6>
                                          </div>
                                          <div className = "flex justify-between md:flex-col">
                                              <h3 className = 'font-sans font-normal text-sm text-[#747474]'>Department</h3>
                                              <h6 className = "font-sans font-medium text-sm text-[#1A1A1A]">{selectedTask?.department?.name || "No Department yet"}</h6>
                                          </div>
                                        </div>
                                       </div>

                                    </section>
                                  </>
                                  ) : (
                                  <Loadings/>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
          
                    </div>
                       <div className = "px-4 flex justify-between items-center container py-3">
                          <div>
                             <p className = "font-sans font-normal text-xs  md:text-sm text-[#878789]">10 Entries per pages</p>
                          </div>
                           <div>
                             <p className = "font-sans font-normal text-xs md:text-sm text-[#878789]">Page {page} of {totalPages}</p>
                           </div>
                           <div className = "flex gap-2">
                             <button className = "border-1 border-[#CFCFD0] p-1  md:p-2 rounded-sm font-sans font-normal text-xs  md:text-sm text-[#878789]" onClick = {handlePrev} disabled = {page === 1}>Previous</button>
                             <button className = " border-1 border-[#CFCFD0] p-1 md:p-2 rounded-sm font-sans font-normal text-xs  md:text-sm text-[#878789]" onClick = {handleNext} disabled = {page === totalPages}>Next</button>
                           </div>
                        </div>
                    </section>
                    </section>

                ) : (
                    <Outlet/>
                )
            }
                </section>

            </main>
        </>
    )
}

export default Employees
