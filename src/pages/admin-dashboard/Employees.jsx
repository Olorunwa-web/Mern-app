import React from 'react';
import { Outlet,Link, NavLink, useMatch} from 'react-router-dom'
import '../../Style/Employees.css'
import { AllEmployees} from '../../employ'
import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';
import Loader from "../../utils/Loader"
import axios from "axios"
import Modal from 'react-bootstrap/Modal';


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


  const fetchEmployees = async () => {
    setLoading(true); //
    try {
      const response = await axios.get(
        `http://localhost:9080/api/employee/users?page=${page}&limit=10`,
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
      const req = await axios.get(`http://localhost:9080/api/employee/${id}`, {
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
      <div className="d-flex justify-content-center">
        <Loader />{" "}
      </div>
    );

    if (error) return <p>{error}</p>;
    const handleRowClick = (employeeId) => {
      getEmployeeById(employeeId);
    };

    
   
    return (
        <>
            <main className = 'summary-containers' >
                <section className = "pt-3">
                {Match ? (
                    <section>
                    <div className = "employ-tags">
                        <h1>Employee</h1>
                        <h4>Dashboard/Employee</h4>
                    </div>
                    <div className = 'd-flex justify-content-between align-items-center line mt-3'>
                        <div className = "d-flex gap-4 spacess">
                        <NavLink
                        className = "admin-employees-nav-link all-employees"
                      end>
                      {({ isActive}) =>(
                        <span
                          className={`d-flex gap-2 align-items-center pt-3 nav-link-header   ${isActive ? "is-Active" : "" 
                          }`}
                        > 
                        All Employees
                        </span>
                      )}
                    </NavLink>

                      <NavLink
                        to = "/admin-dashboard/employees/teams"
                        className = "admin-employees-nav-link all-employees"
                      end>
                      {({ isActive}) =>(
                        <span
                          className={`d-flex gap-2 align-items-center pt-3 nav-link-header  ${isActive ? "is-Active" : "" 

                          }`}
                        > 
                        Teams
                        </span>
                      )}
                    </NavLink>
                        </div>
                        <div>
                            <Link className = "but" to = "/admin-dashboard/employees/newemployee"><button className = "buttonss">New Employee</button></Link>
                        </div>
                    </div>


                    <section className = " my-4 employee-task">
                    <div className = "employee-table">
                        <Table responsive = "lg"  role = "button" hover>
                        <thead>
                            <tr>
                               <th className = "bg-light bor"><span className = "dash-ba ms-2">Name</span></th>
                               <th  className = "bg-light"><span className = "dash-ba">Email</span></th>
                               <th  className = "bg-light"><span className = "dash-ba">Team</span></th>
                               <th  className = "bg-light tex"><span className = "dash-ba">Supervisor</span></th>
                               <th  className = "bg-light bors"><span className = "dash-ba">Status</span></th>                             
                           </tr>
                        </thead>
                           <tbody>
                               {employees.map((allemployees)=>{
                          
                                   const {_id, profileImage, firstName,lastName, email,Team,department,Status,employmentStatus} = allemployees
                                   return(
                                       <tr  key = {_id} onClick={()=>handleRowClick(_id)}>
                                           <td  className = "paps">
                                               <div className = 'd-flex gap-2 align-items-center ms-2 employ-head'>
                                                  <img src={profileImage} alt="" className = "image-div c"/>
                                                  <span className = "names">{`${firstName} ${lastName}`}</span>
                                               </div>
                                           </td>
                                           <td className = 'table-cell pt-3' ><div className = "head-email"><span className = "names ">{email}</span></div></td>
                                           <td className = "table-cell pt-3"><div className = "head-dept"><span className = "names" >{department?.name}</span></div></td>
                                           <td className = "table-cell pt-3 head-dept-name"><div className = "head-sup"><span className = "names " >{allemployees ?.department?.manager.firstName}</span></div></td>
                                           <td className = "table-cell pt-3"><span className = {`action-status ${employmentStatus.replace(/\s+/, "-").toLowerCase()}`}>{employmentStatus}</span></td>
                                       </tr>
                                   )
                               })}
                           </tbody>
                        </Table>
          <Modal show={showModal} onHide={() => setShowModal(false)} centered  {...props}     size="lg"
          >
            <Modal.Header closeButton>
              <Modal.Title className = "profile-h4 padd ps-4">Employee’s Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedTask ? (
                <>
                <section className = " padd px-4">
                <div className = "d-flex justify-content-between align-items-center">
                  <div className = "d-flex gap-2 loop align-items-center" >
                    <div >
                      <img src={selectedTask.profileImage} alt="" style={{maxWidth:"48px"}} className = "c image-div" />
                    </div>
                    <div className = "temilad pt-2">
                      <h3><strong></strong> {selectedTask.firstName} {selectedTask.lastName}</h3>
                      <p><strong></strong> {selectedTask.email}</p>
                    </div>
                  </div>
                  <button className = "edit-profil">Edit Profile</button>
                </div>
                <h4 className = "persona mt-3">Personal Information</h4>
                <div className = " d-lg-flex justify-content-between mb-3 temi-flex well-space ">
                  <div className = "mobile-number">
                    <h3 className = "mobile-nums">Mobile Number</h3>
                    <h6 className = "mobile-numms">{selectedTask?.mobileNumber}</h6>
                 </div>
                  <div className = "mobile-number">
                    <h3 className = "mobile-nums">Date of Birth</h3>
                     <h6 className = "mobile-numms">{selectedTask?.dateofBirth.slice(0,10)}</h6>
                  </div>
                  <div className = "mobile-number">
                    <h3 className = 'mobile-nums'>Martial Status</h3>
                    <h6 className = "mobile-numms">{selectedTask?.maritalStatus}</h6>
                  </div>
                </div>
                <div className = "d-lg-flex  justify-content-between">
                  <div className = "mobile-numbers">
                    <h3 className = "mobile-nums">Gender</h3>
                    <h6 className = "mobile-numms">{selectedTask.gender}</h6>
                  </div>
                  <div className = "mobile-numberss">
                     <h3 className = "mobile-nums">Address</h3>
                     <h6 className = "mobile-nummms">No {selectedTask?.address}</h6>
                  </div>
                </div>
                <hr/>
                <h4 className = "persona mt-3">Personal Information</h4>
                <div className = "d-lg-flex justify-content-between mt-3">
               <div className = "mobile-number">
                <h3 className = "mobile-nums">Office of Employment</h3>
                <h6 className = "mobile-numms">{selectedTask?.officeOfEmployment}</h6>
              </div>
              <div className = "mobile-number">
                <h3 className = "mobile-nums">Job Title</h3>
                <h6 className = "mobile-numms">{selectedTask.jobTitle}</h6>
              </div>
              <div className = "mobile-number">
                <h3 className = 'mobile-nums'>Department</h3>
                <h6 className = "mobile-numms">{selectedTask?.department?.name}</h6>
              </div>
            </div>
            <div className = "my-3 mobile-number">
                <h3 className = 'mobile-nums'>Employee Type</h3>
                <h6 className = "mobile-numms">{selectedTask?.employmentStatus}</h6>
            </div>

                </section>
                  
                </>
              ) : (
                <Loader />
              )}
            </Modal.Body>
          </Modal>
                    </div>
                    <div className = "d-flex justify-content-between align-items-center container py-3">
                        <div>
                            <p className = "entries pt-2">10 Entries per pages</p>
                        </div>

                        <div>
                            <p className = "entriess pt-2">Page {page} of {totalPages}</p>
                        </div>
                        <div className = "d-flex gap-2">
                            <button className = "previous" onClick = {handlePrev} disabled = {page === 1}>Previous</button>
                            <button className = "next" onClick = {handleNext} disabled = {page === totalPages}>Next</button>
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
