import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import tickcircle from '../../../assets/tick-circle.svg'
import '../../../Style/Newteam.css'
import{Link} from 'react-router-dom'
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import  {newteamSchema} from "../../../lib/ValidationSchema"


function MyVerticallyCenteredModal(props) {
    return (
        <div>
        <Modal
  {...props}
  size="md"
  aria-labelledby="contained-modal-title-vcenter"
  centered
>
  <Modal.Header  className = "img-tick tick mt-4">
  <Modal.Title className = "">
      <div className = "text-center ">
        <img src= {tickcircle} alt="" className = ""/>
      </div>
  </Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <h1 className = "text-center saved">Created Successfully</h1>
    <h4 className = "text-center added">
      Team has been created successfully! 
    </h4>
  </Modal.Body>
  <div className = "const mb-5">
      <button className = "cont "  onClick={props.onHide}>Continue</button>
  </div>
 
</Modal>
        </div>
     
    );
  }


const NewTeam = (props) => {
    const [modalShow, setModalShow] = React.useState(false);

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({
      resolver: yupResolver(newteamSchema),
    });
    const onSubmit = (data) => console.log(data)

    return (
        <>
             <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        <h1 className = "new">Create New Team</h1>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
       <section>
       <form onSubmit={handleSubmit(onSubmit)}>
                    <div className = "mb-3">
                        <label htmlFor="" className = "labels">Team Name</label>
                        <input type="text" name="" id="" className = "w-100 add-input" placeholder = "Enter Name" {...register("team")}/>
                        <span className = "spans">{errors.team?.message}</span>
                    </div>
                    <div className = "mb-3">
                        <label htmlFor="" className = "labels">Team Manager</label>
                        <select name="" id="" className = "w-100 select-input" {...register("manager")} >
                          <option disabled selected hidden >Select</option>
                          <option value="Aisha Akinwunmi" className= "labelss">Aisha Akinwunmi</option>
                          <option value="Badmus John" className = "labelss">Badmus John</option>
                          <option value="Layo Duran" className = "labelss">Layo Duran</option>
                          <option value="Blessing John" className = "labelss">Blessing John</option>
                       </select>
                       {errors.manager && <span className = "spans">{errors.manager?.message}</span>}
                    </div>
                    <div className = "mb-3">
                        <label htmlFor="" className = "labels">Team Members</label>
                        <select name="" id="" className = "w-100 select-input" {...register("members")}>
                          <option disabled selected hidden >Select</option>
                          <option value="Kingley Ifijie" className = "labelss">Kingley Ifijie</option>
                          <option value="Kekere-Ekun Tolani" className = "labelss">Kekere-Ekun Tolani</option>
                          <option value="Oluwatobi Damilola" className = "labelss">Oluwatobi Damilola</option>
                          <option value="Sanusi Ajibola" className = "labelss">Sanusi Ajibola</option>
                          <option value="Aisha Olamide" className = "labelss">Aisha Olamide</option>
                          <option value="Peace Bassey" className = "labelss">Peace Bassey</option>
                       </select>
                       {errors.members && <span className = "spans">{errors.members?.message}</span>}
                    </div>
                    <div className = "d-flex gap-3 pt-4 mb-3">
                      <Link to = "/admin-dashboard/employees/teams" className = "cancel"><button className = "cancel" onClick={props.onHide}>Cancel</button></Link> 
                      <button className = "save"  onClick={() => setModalShow(true)} >Save</button> 
                      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
                   </div>
                    </form>
       </section>
      </Modal.Body>
      {/* <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer> */}
    </Modal>

            {/* <main className = "new-team"> 
                <section>
                    <h1 className = "new mb-5">Create New Team</h1>
                   
                </section>
            </main> */}
        </>
    )
}

export default NewTeam
