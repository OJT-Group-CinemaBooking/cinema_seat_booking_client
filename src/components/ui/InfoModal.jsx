import React from 'react'
import classes from './InfoModal.module.css'
import { Modal } from 'react-bootstrap'

const InfoModal = ({ show, information, handleClose, color }) => {

    const handleHide = () => {
        handleClose()
    }

  return (
    <Modal 
    centered 
    show={show} 
    onHide={handleHide} 
    animation={true} 
    className={classes.modal}
    >
        <Modal.Header closeButton className={classes.modal_header} />
        <Modal.Body className={classes.body}>
            <Modal.Title className={`text-${color}`}>{information}</Modal.Title>
        </Modal.Body>
    </Modal>
  )
}

export default InfoModal