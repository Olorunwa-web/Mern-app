import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import tickcircle from '../assets/tick-circle.svg'

const ModalX = (props) => {
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
      <Modal.Header className = "img-tick tick mt-4" >
      <Modal.Title  >
          <div className = "text-center ">
            <img src= {tickcircle} alt="" className = "CLASS"/>
          </div>
      </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h1 className = "text-center saved ">Saved Successfully</h1>
        <h4 className = "text-center added  ">
          Employee has been successfully added
        </h4>
      </Modal.Body>
      <div className = "const mb-4">
          <button className = "cont" onClick={props.onHide}>Continue</button>
      </div>
    </Modal>
            </div>
        </>
    )
}

export default ModalX
