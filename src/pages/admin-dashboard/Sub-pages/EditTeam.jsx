import React from 'react'
import tickcircle from '../../../assets/tick-circle.svg'
import '../../../Style/Newteam.css'
import{Link} from 'react-router-dom'




function MyVerticallyCenteredModal(props) {
    return (
        <div>
        {/* <Modal
  {...props}
  size="lg"
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
    <h1 className = "text-center saved">Saved Successfully</h1>
    <h4 className = "text-center added">
      Team has been saved successfully! 
    </h4>
  </Modal.Body>
  <div className = "const mb-5">
      <button className = "cont "  onClick={props.onHide}>Continue</button>
  </div>
 
</Modal> */}
        </div>
     
    );
  }

const EditTeam = () => {
    const [modalShow, setModalShow] = React.useState(false);

    return (
        <>
           <main className = "new-team"> 
                <section>
                    <h1 className = "new mb-5">Edit Team</h1>
                    <div className = "mb-3">
                        <label htmlFor="" className = "labels">Team Name</label>
                        <input type="text" name="" id="" className = "w-100 add-input" placeholder = "Product Name"/>
                    </div>
                    <div className = "mb-3">
                        <label htmlFor="" className = "labels">Team Manager</label>
                        <select name="" id="" className = "w-100 select-input">
                          <option disabled selected hidden >Select</option>
                          <option value="" className= "labelss">Aisha Akinwunmi</option>
                          <option value="" className = "labelss">Badmus John</option>
                          <option value="" className = "labelss">Layo Duran</option>
                          <option value="" className = "labelss">Blessing John</option>
                       </select>
                    </div>
                    <div className = "mb-3">
                        <label htmlFor="" className = "labels">Team Members</label>
                        <select name="" id="" className = "w-100 select-input">
                          <option disabled selected hidden >Select</option>
                          <option value="" className = "labelss">Kingley Ifijie</option>
                          <option value="" className = "labelss">Kekere-Ekun Tolani</option>
                          <option value="" className = "labelss">Oluwatobi Damilola</option>
                          <option value="" className = "labelss">Sanusi Ajibola</option>
                          <option value="" className = "labelss">Aisha Olamide</option>
                          <option value="" className = "labelss">Peace Bassey</option>
                       </select>
                    </div>
                    <div className = "d-flex gap-3 my-5">
                      <Link to = "/admin-dashboard/employees/teams" className = "cancel"><button className = "cancel">Cancel</button></Link> 
                      <button className = "save" onClick={() => setModalShow(true)} >Save</button>
                      {/* <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      /> */}
                   </div>
                </section>
            </main>
        </>
    )
}

export default EditTeam
