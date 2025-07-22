import React, {useState} from 'react'
import '../../Style/Payroll.css'
import {Payroll} from '../../Taskboard'
import {payrolll} from '../../Taskboard'
import Modalpay from '../../Components/Modalpay'
import OpenContext from '../../context/OpenContext';
import { useContext } from 'react'
import 'simplebar-react/dist/simplebar.min.css';
import SimpleBar from 'simplebar-react';

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
 
                    <div className = "my-5 flex flex-col gap-7 md:gap-6 lg:gap- w-full md:flex-wrap md:flex-row lg:flex-row  justify-between  ">
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
                                        <div className = "w-14">
                                           <img src= {Icon} alt=""/>
                                        </div>
                                     </div>
                                  </div>
                                </div>
                            )
                        })}
                    </div>

                    <section className = "my-7 border-[0.1px] border-[#E4E8ED] rounded-lg">
                      <h1 className = "font-inter font-medium text-xl ps-4 py-2  text-[#161E54]">Payroll Table</h1>
                      <SimpleBar forceVisible="x" autoHide={false} style={{ maxWidth: '100%' }}>
                      <div className = "min-w-[1000px] w-full" >
                        <table className=" table-auto w-full border-[0.5px] border-[#E4E8ED] rounded-lg ">
                          <thead>
                           <tr className = 'text-left bg-[#F7F9FB]'>
                             <th  className = "whitespace-nowra py-2 ps-4 font-inter font-medium text-base text-[#292929]">Employee</th>
                             <th  className = "py-2  font-inter font-medium text-base text-[#292929]">Salary</th>
                             <th  className = "py-2  font-inter font-medium text-base text-[#292929]">Allowance</th>
                             <th  className = " py-2  font-inter font-medium text-base text-[#292929]">Deductions</th>
                             <th  className = " py-2 font-inter font-medium text-base text-[#292929]">Tax</th>
                             <th className = " py-2 text-center font-inter font-medium text-base text-[#292929] ">Net Salary</th>
                           </tr>
                         </thead>
                         <tbody  className = 'divide-y divide-[#E4E8ED] '>
                          {payrolll.map((payee) =>{
                             const{id,Images,Names,Salary,Allowance,Deduction,Tax,NetSalary} = payee
                             return(   
                               <tr key= {id}>
                                 <td >
                                   <div  className = "flex items-center gap-2 ps-4 py-2">
                                     <img src= {Images} alt="image-employ"  className = " w-7 h-7"/>
                                     <span className = "font-inter font-medium text-sm text-[#292929]">{Names}</span>
                                   </div>
                                 </td>
                                 <td  className = "">
                                    <span className = "font-inter font-medium text-sm text-[#292929] ">{Salary}</span> 
                                 </td>
                                 <td className = "" > 
                                    <span className = "font-inter font-medium text-sm text-[#292929]">{Allowance}</span>
                                 </td>
                                 <td className = "">
                                   <span className = "font-inter font-medium text-sm text-[#292929]">{Deduction}</span>
                                 </td>
                                 <td className = "">
                                   <span className = "font-inter font-medium text-sm text-[#292929]">{Tax}</span>
                                 </td>
                                 <td className = "text-center">
                                   <span className = "font-inter font-medium text-sm text-[#292929] ">{NetSalary}</span>
                                </td>
                              </tr>
                            )
                         })}
                        </tbody>
                       </table>
                     </div>
                      </SimpleBar>
                    </section>
                   
                </section>
            </main>
        </>
    )
}

export default PayRoll
