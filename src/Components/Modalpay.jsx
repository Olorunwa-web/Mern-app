import React from 'react'
import '../Style/Payroll.css'
import {payrolll} from '../Taskboard'
import tickcircle from '../assets/tick-circle.svg'



function MyVerticallyCenteredModal(props) {
   return (
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
        <h1 className = "text-center saved">Saved Successfully</h1>
        <h4 className = "text-center added">
          Employee has been successfully added
        </h4>
      </Modal.Body>
      <div className = "const mb-5">
          <button className = "cont">Continue</button>
      </div>
     
    </Modal>
   );
 }
 





const Modalpay = (props) => {
    const [modalShow, setModalShow] = React.useState(false);
   
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
                    <h1 className = "create-h1">Add to Payroll</h1>
                  </div>
              </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className = " title">
                    <div className = "mb-3">
                      <label htmlFor="" className = "labels">Employee</label>
                      <select name="" id="" className = "w-100 select-input">
                            <option disabled selected hidden >Select</option>
                            <option value="" className= "labelss">Oluwatosin Sanya</option>
                       </select>
                    </div>
                    <div className = "mb-3">
                       <label htmlFor="" className = "labels">Based Salary</label> 
                       <input type="text" name="" id="" className = "w-100 add-input" placeholder = "N 0.00"/>
                    </div>
                    <div className = "mb-3">
                       <label htmlFor="" className = "labels">Allowance</label>
                       <input type="text" name="" id="" className = "w-100 add-input" placeholder = "N 0.00"/>
                    </div>
                    <div className = "mb-3"> 
                       <label htmlFor="" className = "labels">Deduction</label>
                       <input type="text" name="" id="" className = "w-100 add-input" placeholder = "N 0.00"/>
                    </div>
                    <div className = "my-3">
                       <label htmlFor="" className = "labels">Tax</label>
                       <input type="text" name="" id="" className = "w-100 add-input" placeholder = "0%"/>
                    </div>
                    <div className = "d-flex gap-3 mt-4 mb-4">
                      <button className = "cancel" onClick={props.onHide}>Cancel</button>
                      <button className = "save" onClick={() => setModalShow(true)} >Add</button>
                      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
                   </div>
                </div>
              </Modal.Body>
            </Modal>
        </div>
            
        </>
    )
}

export default Modalpay
