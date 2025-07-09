import React from 'react'
import tickcircle from '../assets/tick-circle.svg'


const ModalTasks = (props) => {
    return (
        <>
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
          Task has been created successfully! 
        </h4>
      </Modal.Body>
      <div className = "const mb-5">
          <button className = "cont  ">Continue</button>
      </div>
       </Modal> 
            </div>
        </>
    )
}

export default ModalTasks
