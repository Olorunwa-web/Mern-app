import React, {useEffect, useContext} from 'react'
import '../Style/Taskboard.css'
import ModalTasks from '../Components/ModalTasks'
import tickcircle from '../assets/tick-circle.svg'
import {useState} from 'react'
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import {newTaskSchema} from "../lib/ValidationSchema"
import axios from "axios";
import toast, { LoaderIcon } from "react-hot-toast";
import Loader from '../utils/Loader'
import add from '../assets/Stockholm-icons (8).svg'
import cancel from "../assets/Stockholm-icons (10).svg"
import canceled from '../assets/Stockholm-icons (11).svg';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRef } from 'react'




const ModalTask = ( {isModalOpen, setIsModalOpen, refreshTask}) => {

  if (!isModalOpen) return null;
  const [data2, setData2] = useState([])
const { modalRef } = useRef()

  const [title, setTitle] = useState([]);
  const [description, setDescription] = useState([]);
  const [assignedMembers, setAssignedMembers] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const token = localStorage.getItem("hr-token");
  const [isSubmitting,setIsSubmitting] = useState(false)

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    }

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);


  useEffect(() => {
    if (searchQuery) {
      const fetchSuggestions = async () => {
        try {
          const response = await axios.get(
            `https://mern-backend-1-9jn6.onrender.com/api/employee/users/search?query=${searchQuery}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setSuggestions(response.data.users);
        } catch (error) {
        }
      };
      fetchSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  const handleAddMember = (member) => {
    if (!assignedMembers.some((m) => m._id === member._id)) {
      setAssignedMembers([...assignedMembers, member]);
      setSearchQuery("");
      setSuggestions([]);
    }else{

      toast.error("member already added")
    }
  };
  const handleRemoveMember = (memberToRemove) => {
    setAssignedMembers(
      assignedMembers.filter((member) => member._id !== memberToRemove._id)
    );
  };
  const newTask = {
    title,
    description,
    assignedMembers: assignedMembers.map((member) => member._id),
    startDate,
    endDate,
    status,
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true)
      const req = await axios.post(
        "https://mern-backend-1-9jn6.onrender.com/api/task/tasks",
        newTask,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (req.data.success) {
        toast.success(req?.data?.message);
        setTitle([]);
        setDescription([]);
        setAssignedMembers([]);
        setEndDate("");
        setStartDate("");
        setStatus("");
        setSearchQuery("");
        setSuggestions([]);
        setIsModalOpen(false);
        refreshTask();
      }
    } catch (error) {
      toast.error(error?.response?.data?.errMsg);
    }finally{
      setIsSubmitting(false)
    }
  };
  function reset() {
    setTitle([]);
    setDescription([]);
    setAssignedMembers([]);
    setEndDate("");
    setStartDate("");
    setStatus("");
    setSearchQuery("");
    setSuggestions([]);
  }
  const btnText = isSubmitting ? <Loader/> : "Save";


 

 
    return (
        <>
          <div ref= {modalRef}  className="fixed inset-0 py-10 backdrop-blur-[1.4px] px-4 md:px-0 bg-black/30 flex items-center screen   justify-center z-50">
            <div onClick={(e) => e.stopPropagation()} className=" bg-white rounded-xl shadow-lg transform  max-h-full overflow-y-auto transition-all duration-100 ease-in-out opacity-100 animate-modalFade w-full max-w-lg ">
              <div className = 'flex py-3 px-4 justify-between items-center border-b-1 border-[#D9D9D9] '>
                 <h2 className = 'font-sans font-semibold text-[#292929] text-xl '>Create New Task</h2>
                 <img src= {canceled} onClick ={() => setIsModalOpen(false)} className = 'w-7 h-7' alt=""/>
              </div>
              <div className = 'p-4'>
                <form action="" className = 'flex flex-col gap-4' onSubmit={handleSubmit}>
                   <div className = "flex  flex-col gap-1">
                      <label htmlFor="" className = "font-sans text-[#111014] text-sm font-medium">Task Title*</label>
                      <input type="text" name="" id="" className = "w-full border-1 border-[#959595] px-3 font-sans text-base md:text-sm focus:shadow-sm focus:border-1 focus:border-blue-600 focus:outline focus:outline-blue-600 font-normal text-[#878789]  rounded-sm py-2 " placeholder = "Enter Task Title" value = {title}  onChange={(e) => setTitle(e.target.value)} autoFocus />
                  </div>
                  <div className = "flex flex-col gap-1">
                      <label htmlFor="" className = "font-sans text-[#111014] text-sm font-medium">Task Description*</label> 
                      <textarea name="" id="" cols="30" rows="3"  className = "w-full border-1 border-[#959595]  font-sans text-base md:text-sm focus:shadow-sm focus:border-1 focus:border-blue-600 focus:outline focus:outline-blue-600 font-normal py-2 px-3 text-[#878789]  rounded-sm resize-none "  value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                  </div>
                  <div className = "flex flex-col gap-1 ">
                      <label htmlFor="" className = "font-sans text-[#111014] text-sm font-medium">Assign Persons*</label>
                      <input type="text" name="" id="" className = "w-full border-1 border-[#959595] px-3 font-sans text-base md:text-sm focus:shadow-sm focus:border-1 focus:border-blue-600 focus:outline focus:outline-blue-600 font-normal text-[#878789]  rounded-sm py-2" placeholder = "Search for employee" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
                         {suggestions.length > 0 && (
                           <div className="suggestions-list list-unstyled assigned-memb flex gap-2 flex-wrap " role="button">
                             {suggestions.map((suggestion) => (
                               <div className = "flex bg-[#3439CA] rounded-lg py-2 px-[7px] gap-2 items-center">
                                 <span key={suggestion._id} className = "font-sans text-xs font-medium text-[#EBEBEB] ">
                                    {suggestion.firstName} {suggestion.lastName} 
                                 </span>
                                  <img src= {add} alt="" className = "w-4 h-4" onClick={() => handleAddMember(suggestion)}/>
                               </div>
                             ))}
                           </div>
                          )}
                         <div className=" flex gap-2 flex-wrap">
                             {assignedMembers.map((member) => (
                               <div className = "flex bg-[#EBEBEB] rounded-lg py-2 px-[7px] gap-1 items-center">
                                  <span key={member._id} className="font-sans text-xs font-medium text-[#111014]">
                                     {member.firstName} {member.lastName}
                                 </span>
                                     <img onClick={() => handleRemoveMember(member)} src= {cancel} alt="cancel-btn" className = 'w-5 h-5'/>
                               </div>
                              ))}
                          </div>
                   </div>
                   <div className = "flex md:flex-row flex-col gap-4 "> 
                      <div className = "w-full md:w-1/2 flex flex-col gap-1">
                          <label htmlFor="" className = "font-sans text-[#111014] text-sm font-medium">Start Date*</label>
                          {/* <DatePicker className = 'w-full border-1 border-[#959595] px-3 font-sans text-sm outline-none font-normal text-[#878789]  rounded-sm py-2'   placeholderText = 'Select Date' selected = {startDate} value = {startDate} onChange={(e) => setStartDate(e.target.value)} /> */}
                          <input type="date" name="" id="" placeholder = "select Date" className = "w-full border-1 border-[#959595] px-3 font-sans text-base md:text-sm focus:shadow-sm focus:border-1 focus:border-blue-600 focus:outline focus:outline-blue-600 font-normal text-[#878789]  rounded-sm py-2" value={startDate} onChange={(e) => setStartDate(e.target.value)}/>
                       </div>
                       <div className = "w-full md:w-1/2 flex flex-col gap-1">
                          <label htmlFor="" className = "font-sans text-[#111014] text-sm font-medium">End Date*</label>
                          {/* <DatePicker className = {`w-full border-1 border-[#959595] px-3 font-sans text-sm outline-none font-normal text-[#878789]  rounded-sm py-2`}  placeholderText = 'Select Date' selected = {endDate} value = {endDate} onChange={(e) => setEndDate(e.target.value)} /> */}
                          <input type="date" name="" id="" placeholder = "select Date" className = "w-full border-1 border-[#959595] px-3 font-sans text-base md:text-sm focus:shadow-sm focus:border-1 focus:border-blue-600 focus:outline focus:outline-blue-600 font-normal text-[#878789]  rounded-sm py-2" value={endDate} onChange={(e) => setEndDate(e.target.value)}/>
                       </div>
                    </div>
                    <div className = "flex flex-col gap-1">
                       <label htmlFor="" className = "font-sans text-[#111014] text-sm font-medium">Task Status*</label>
                       <select name="" id="" className = "w-full border-1 border-[#959595] px-3 font-sans text-base md:text-sm focus:shadow-sm focus:border-1 focus:border-blue-600 focus:outline focus:outline-blue-600 font-normal text-[#878789]  rounded-sm py-2 " value = {status} onChange={(e) => setStatus(e.target.value)}>
                         <option hidden selected >Select Status</option>
                         <option value="Planned" className= "labelss">Planned</option>
                         <option value="In progress" className = "labelss">In progress</option>
                         <option value="Completed" className = "labelss">Completed</option>
                       </select>
                     </div>
                     <div className = "flex w-full gap-3 my-3">
                         <button className = "w-full py-2 border border-[#DB3E3E] text-base font-medium  md:text-sm text-[#DB3E3E] hover:text-white hover:bg-[#DB3E3E] rounded-sm " onClick = {reset}>Cancel</button>
                         <button className = "w-full py-2 bg-[#3439CA] rounded-sm  text-base font-medium md:text-sm text-[#F3F2FB] " type = "submit"  disabled = {setIsSubmitting}>{btnText}</button>
                      </div>
                </form>
              </div>
            </div>
            
            </div>
        </>
    )
}

export default ModalTask
