import React from 'react'
import '../../Style/Payroll.css'
import {Payroll} from '../../Taskboard'
import {payrolll} from '../../Taskboard'
import Table from 'react-bootstrap/Table';
import Modalpay from '../../Components/Modalpay'



const PayRoll = () => {
    const [modalShow, setModalShow] = React.useState(false);
   
    return (
        <>
            <main className = "summary-container payroll-dash mt-3">
                <section>
                    <div className = "d-flex justify-content-between align-items-center ">
                        <div>
                          <h2 className = "task-h1">Payroll</h2>
                          <h4 className = "dash-h4">Dashboard/Payroll</h4>
                        </div>
                        <div>
                          <button className = "payroll" onClick={() => setModalShow(true)}>Add to Payroll</button>
                        
                        </div>
                    </div>
 
                    <div className = "d-flex  justify-content-between gap-2 taskboard-flexx d-lg-flex flex-md-wrap my-3 pb-2 ">
                        {Payroll.map((pay) =>{
                            const {id,names,number,month,Icon} = pay
                            return(
                                <div key = {id} className = "payroll-flex">
                                    <h3 className = "namess">{names}</h3>
                                    <h1 className = "money">{number}</h1>
                                    <h5 className = 'month'>{month}</h5>
                                    <div className = "imag">
                                        <img src= {Icon} alt=""/>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    <section className = "employee-task my-4 ">
                      <h1 className = "heading-4 pt-3  ps-3 ">Payroll Table</h1>
                    <div className = "employee-table" >
                    <Table responsive = "lg" hover role = "button">
                      <thead>
                        <tr>
                            <th  className = "bg-light"><span className = "dash-bar ms-2">Employee</span></th>
                            <th  className = "bg-light"><span className = "dash-bar">Salary</span></th>
                            <th  className = "bg-light"><span className = "dash-bar">Allowance</span></th>
                            <th  className = "bg-light"><span className = "dash-bar">Deductions</span></th>
                            <th  className = "bg-light"><span className = "dash-bar">Tax</span></th>
                            <th className = "text-center bg-light "><span className = "dash-bar">Net Salary</span></th>
                      
                        </tr>
                      </thead>
                      <tbody>
                      {payrolll.map((payee) =>{
                          const{id,Images,Names,Salary,Allowance,Deduction,Tax,NetSalary} = payee
                          return(   
                         <tr key= {id}>
                           <td >
                               <div  className = "d-flex align-items-center gap-2 my-1 ms-2 pic-pay">
                                   <img src= {Images} alt="image-employ"  className = "image-div "/>
                                   <span className = "names pt-1">{Names}</span>
                               </div>
                           </td>
                           <td  className = "pt-3">
                               <div className = "pay-salary">
                                 <span className = "names ">{Salary}</span> 
                               </div>
                           </td>
                           <td className = "pt-3" > 
                              <div className = "pay-allow">
                                 <span className = "names">{Allowance}</span>
                              </div>
                           </td>
                           <td className = "pt-3">
                               <div className = "pay-ded">
                                 <span className = "names">{Deduction}</span>
                               </div>
                           </td>
                           <td className = "pt-3">
                               <div className = "pay-tax">
                                 <span className = "names">{Tax}</span>
                               </div>
                           </td>
                           <td className = "text-center pt-3">
                               <div className = "pay-netsalary">
                                 <span className = "names ">{NetSalary}</span>
                               </div>
                           </td>
                         </tr>
                          )
                      })}
                     </tbody>
                    </Table>
                    </div>
                    </section>
                    <Modalpay
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
                </section>
            </main>
        </>
    )
}

export default PayRoll
