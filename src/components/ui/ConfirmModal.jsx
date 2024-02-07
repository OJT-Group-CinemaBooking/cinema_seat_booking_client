import React from "react";
import { Modal,Button } from "react-bootstrap";
import classes from './ConfirmModal.module.css'

const ConfirmModal = ({ onClose,onAction,title,body }) => {

    const onCancel = () => {
        onClose()
    };

    const onOk = () =>{
        onAction()
        onClose()
    }

  return (
    <Modal show={true} backdrop="static" className={classes.modal} keyboard={false}>
      <Modal.Header  closeButton onClick={onCancel} className={classes.header}>
        <Modal.Title>{ title }</Modal.Title>
      </Modal.Header>
      <Modal.Body className={classes.body}>
        { body }
      </Modal.Body>
      <Modal.Footer className={classes.footer}>
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onOk}>Delete</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;