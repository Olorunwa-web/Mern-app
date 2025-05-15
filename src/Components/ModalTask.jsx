import React, {useEffect} from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../Style/Taskboard.css'
import ModalTasks from '../Components/ModalTasks'
import tickcircle from '../assets/tick-circle.svg'
import {useState} from 'react'
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import {newTaskSchema} from "../lib/ValidationSchema"
import axios from "axios";
import toast, { LoaderIcon } from "react-hot-toast";
import { CiCircleRemove } from "react-icons/ci";
import cancel from "../assets/Stockholm-icons (10).svg"
import add from "../assets/Stockholm-icons (8).svg";


const ModalTask = (props) => {
  const [modalShow, setModalShow] = React.useState(false);
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
          // console.error("Error fetching user suggestions:", error);
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
      }
      // console.log(req.data);
    } catch (error) {
      // console.error("Error creating task:", error.response.data.errMsg);
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
  const btnText = isSubmitting ? <LoaderIcon/> : "Save";


 
    return (
        <>
          <div>
            <Modal
            {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
      <Modal.Title className = "">
          <div className = "title">
            <h1 className = "create-h1">Create New Task</h1>
          </div>
      </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className = " title">
          <form onSubmit={handleSubmit}>
            <div className = "mb-3">
              <label htmlFor="" className = "labels">Task Title</label>
              <input type="text" name="" id="" className = "w-100 add-input" placeholder = "Enter Task Title" value = {title}  onChange={(e) => setTitle(e.target.value)} autoFocus />
            </div>
            <div className = "mb-3">
               <label htmlFor="" className = "labels">Task Description</label> 
               <textarea name="" id="" cols="30" rows="4"  className = "textA"  value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
            </div>
            <div className = "mb-3">
               <label htmlFor="" className = "labels">Assign Persons</label>
               <input type="text" name="" id="" className = "w-100 add-input" placeholder = "Search for employee" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
               {suggestions.length > 0 && (
                <div className="suggestions-list list-unstyled assigned-memb d-flex gap-2 flex-wrap   " role="button">
                  {suggestions.map((suggestion) => (
                    <div className = "d-flex gap-2 align-items-center assigned-memberss mt-2  ">
                    <span
                      key={suggestion._id}
                     className = "assigned-membe "
                    >
                      {suggestion.firstName} {suggestion.lastName} 
                    </span>
                    <span  onClick={() => handleAddMember(suggestion)} className = "" ><img src= {add} alt="" className = ""/></span>
                   
                    </div>
                    
                  ))}
                </div>
              )}
               <div className="assigned-memb d-flex gap-2 flex-wrap">
                {assignedMembers.map((member) => (
                  <div className = "d-flex gap-1 align-items-center assigned-members mt-2  ">
                  <span key={member._id} className="assigned-member">
                    {member.firstName} {member.lastName}
                  </span>
                    <span
                      onClick={() => handleRemoveMember(member)}
                      className="text-danger "
                    >
                      <img src= {cancel} alt="cancel-btn"/>
                      {/* <CiCircleRemove fontSize={15} className="mb-2" role="button"/> */}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className = "d-md-flex gap-4 mb-3"> 
                <div className = "mobile">
                  <label htmlFor="" className = "labels">Start Date</label>
                  <input type="date" name="" id="" placeholder = "select Date" className = "w-100 add-input" value={startDate} onChange={(e) => setStartDate(e.target.value)}/>
                </div>
                <div className = "mobilee">
                  <label htmlFor="" className = "labels">End Date</label>
                  <input type="date" name="" id="" placeholder = "select Date" className = "w-100 add-input" value={endDate} onChange={(e) => setEndDate(e.target.value)}/>
                </div>
            </div>
            <div className = "my-3">
               <label htmlFor="" className = "labels">Task Status</label>
               <select name="" id="" className = "w-100 select-input" value = {status} onChange={(e) => setStatus(e.target.value)}>
                    <option disabled selected hidden >Select Status</option>
                    <option value="Planned" className= "labelss">Planned</option>
                    <option value="In progress" className = "labelss">In progress</option>
                    <option value="Completed" className = "labelss">Completed</option>
               </select>
            </div>
            <div className = "d-flex gap-3 mt-4 mb-4">
                 <button className = "cancel" onClick = {reset}>Cancel</button>
                 <button className = "save" type = "submit"  disabled = {setIsSubmitting}>{btnText}</button>
           </div>
          </form>
        </div>
        <ModalTasks
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      </Modal.Body>
    </Modal>
            </div>
        </>
    )
}

export default ModalTask
