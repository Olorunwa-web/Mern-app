import React from 'react'
import { Outlet,Link, NavLink, useMatch} from 'react-router-dom'
import '../../Style/Employees.css'
import { AllEmployees} from '../../employ'
import Table from 'react-bootstrap/Table';

const Employees = () => {
    const Match = useMatch("/admin-dashboard/employees")
    return (
        <>
            <main className = 'summary-container' >
                <section className = "pt-3">
                {Match ? (
                    <section>
                    <div className = "employ-tags">
                        <h2>Employee</h2>
                        <h4>Dashboard/Employee</h4>
                    </div>
                    <div className = 'd-flex justify-content-between line mt-3'>
                        <div>
                        <NavLink
                      end>
                      {({ isActive, isPending }) =>(
                        <span
                          className={`d-flex gap-4  isPending ? "pending": ${isActive ?"Active" : "" 

                          }`}
                        > <Link to = "/admin-dashboard/employees" className = 'one-off'><h4 className = "all-employees">All Employees</h4></Link>
                        <Link to = "/admin-dashboard/employees/teams" className = "two-off"><h4 className = "teamss">Teams</h4></Link>
                        </span>
                       
                      )}
                    </NavLink>

                        </div>
                        <div>
                            <Link className = "butto" to = "/admin-dashboard/employees/newemployee"><button className = "buttonss">New Employee</button></Link>
                        </div>
                    </div>

                    <section className = "employee-task my-4 ">
                    <div >
                    <Table responsive = "lg">
                      <thead>
                        <tr>
                          <th>
                              <span className = "dash-bar">Name</span>
                          </th>
                          <th>
                              <span className = "dash-bar">Email</span>
                          </th>
                          <th>
                              <span className = "dash-bar">Team</span>
                          </th>
                          <th className = "text-center">
                              <span className = "dash-bar">Supervisor</span>
                          </th>
                          <th className = "text-center">
                              <span className = "dash-bar">Status</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                      {AllEmployees.map((allemployees) =>{
                          const{id,Images,Names,Email,Team,Supervisor,Status} = allemployees
                          return(   
                         <tr key= {id} className = "">
                           <td>
                               <div className = "d-flex align-items-center  gap-2 ps-1">
                                   <div className = "image-div pt-2">
                                       <img src= {Images} alt="image-employ"/>
                                   </div>
                                   <span className = "names">{Names}</span>
                               </div>
                           </td>
                           <td>
                               <div className = "mt-2 pt-1">
                                 <span className = "names">{Email}</span> 
                               </div>
                           </td>
                           <td>
                               <div className = "mt-2 pt-1">
                                 <span className = "names">{Team}</span>
                               </div>
                           </td>
                           <td>
                               <div className = "mt-2 pt-1 text-center">
                                   <span className = "names">{Supervisor}</span>
                               </div>
                           </td>
                           <td>
                               <div className = "mt-2 pt-1 text-center">
                                 <span className = {`action-status ${Status.replace(/\s+/, "-").toLowerCase()}`}>{Status}</span>
                               </div>
                           </td>
                         </tr>
                          )
                      })}
                     </tbody>
                    </Table>
                    </div>
                    <div className = "d-flex justify-content-between align-items-center container py-3">
                        <div>
                            <p className = "entries">10 Entries per pages</p>
                        </div>

                        <div>
                            <p className = "entriess">Page 1 of 1</p>
                        </div>
                        <div className = "d-flex gap-2">
                            <button className = "previous">Previous</button>
                            <button className = "next">Next</button>
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
