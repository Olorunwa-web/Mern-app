import React from 'react'
import {Dashboard} from '../../db'
import '../../Style/AdminSummary.css'
import {DashboardPages} from '../../db'
import Table from 'react-bootstrap/Table';


const AdminSummary = () => {
    return (
        <>
            <main className = "summary-container">
                <section className = "pt-4">
                    <h1 className = "dash">Dashboard</h1>
                    <div className = "d-flex  justify-content-between gap-2 dashboard-flexx d-lg-flex flex-wrap">
                    {Dashboard.map((Dashboard)=>{
                        const {id, names,number, Icons} = Dashboard
                        return(
                                <div key = {id} className = "d-flex justify-content-between dashboard-flex">
                                    <div className = "total">
                                        <h4>{names}</h4>
                                        <h1>{number} </h1>
                                    </div>
                                    <div>
                                        <img src= {Icons} alt="dashbaord-images"/>
                                    </div>
                                </div>
                            )  
                    })}

                    </div>
                </section>
                <section className = "dashboard-task mt-4">
                    <h2 className = "heading-3 pt-2  ps-3">Taskboard</h2>
                    <div>
                    <Table responsive = "lg">
                      <thead className = "threadd">
                        <tr>
                          <th>
                              <span className = "dash-bar ms-2">#</span>
                          </th>
                          <th className = ''>
                              <span className = "dash-bar ">Task</span>
                          </th>
                          <th className = "">
                              <span className = "dash-bar">Team</span>
                          </th>
                          <th className = "">
                              <span className = "dash-bar">Duration</span>
                          </th>
                          <th className = "text-center">
                              <span className = "dash-bar">Action</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                      {DashboardPages.map((dashboards) =>{
                          const{id,task,images,start,end,action} = dashboards
                          return(   
                         <tr key= {id} className = "">
                           <td>
                               <div>
                               <input type="checkbox" name="" id="inputs"/>
                               </div>
                           </td>
                           <td>
                               <div className = "mt-2 pt-1">
                                 <span className = "heading-task">{task}</span> 
                               </div>
                           </td>
                           <td>
                               <div className = "mt-2 ">
                                 <img src= {images} alt=""/>
                               </div>
                           </td>
                           <td>
                               <div className = "mt-2  ">
                                   <span className = "start">{start}</span>
                                   <p className = "end">{end}</p>
                               </div>
                           </td>
                           <td>
                               <div className = "mt-3 text-center">
                                 <p className = {`action-status ${action.replace(/\s+/, "-").toLowerCase()}`} >{action}</p>
                               </div>
                           </td>
                         </tr>
                          )
                      })}
                     </tbody>
                    </Table>
                    </div>
                </section>
            </main>
        </>
    )
}

export default AdminSummary
