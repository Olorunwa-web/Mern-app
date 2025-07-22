import React, {useState} from 'react'
import '../../Style/Payroll.css'
import {Payroll} from '../../Taskboard'
import {payrolll} from '../../Taskboard'
import Modalpay from '../../Components/Modalpay'
import OpenContext from '../../context/OpenContext';
import { useContext } from 'react'


const PayRoll = () => {
    const [modalShow, setModalShow] = useState(false);

    const { open } = useContext(OpenContext)
   
    return (
        <>
            <main className = "px-3 md:px-0 lg:px-0 w-19/20 mx-auto max-w-full">
                <section>
                    <div className = "my-5 flex justify-between items-center ">
                       <div className = 'flex flex-col gap-1'>
                          <h2 className = "font-sans text-xl text-[#161E54] font-medium">Payroll</h2>
                          <h4 className = "font-sans text-base text-[#404040] font-medium">Dashboard/Payroll</h4>
                       </div>
                       <div>
                          <button className = "bg-[#3439CA] cursor-pointer py-2  px-3 rounded-sm text-[#F3F2FB] font-medium text-sm font-neural" onClick={() => setModalShow(true)}>Add to Payroll</button>
                       </div>
                    </div>
 
                    <div className = "my-3 flex flex-col gap-7 md:gap-6 lg:gap- w-full md:flex-wrap md:flex-row lg:flex-row  justify-between  ">
                        {Payroll.map((pay) =>{
                            const {id,names,number,month,Icon} = pay
                            return(
                                <div key = {id} className = {` w-full  py-4 px-5 ${open ? 'md:w-[47%]  lg:w-[48%] xl:w-[23%] ' : 'md:w-[48%] lg:w-[23%] xl:w-[23%]'}   border-1 border-[#F1F2F3] rounded-[10px]`} >
                                  <div className = 'flex flex-col gap-[5px]'>
                                     <div className = 'flex flex-col gap-1 '>
                                        <h3 className = "font-sans font-medium text-sm text-[#2F2B2BB0]">{names}</h3>
                                        <h1 className = "font-sans font-bold text-[1.4rem] text-[#1E1E1E]">{number}</h1>
                                     </div>
                                     <div >
                                        <h5 className = 'mb-1 font-sans font-medium text-xs text-[#3C3C3C]'>{month}</h5>
                                        <div className = "w-15">
                                           <img src= {Icon} alt=""/>
                                        </div>
                                     </div>
                                  </div>
                                </div>
                            )
                        })}
                    </div>

                    <section className = "employee-task my-4 ">
                      <h1 className = "heading-4 pt-3  ps-3 ">Payroll Table</h1>
                    <div className = "employee-table" >
                    {/* <Table responsive = "lg" hover role = "button">
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
                    </Table> */}
                    </div>
                    </section>
                    {/* <Modalpay
        show={modalShow}
        onHide={() => setModalShow(false)}
      /> */}
                </section>
            </main>
        </>
    )
}

export default PayRoll
