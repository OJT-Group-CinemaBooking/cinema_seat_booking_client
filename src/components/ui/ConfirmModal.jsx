import React from "react";
import { Modal,Button } from "react-bootstrap";

const ConfirmModal = ({ onClose,onAction,title,body }) => {

    const onCancel = () => {
        onClose()
    };

    const onOk = () =>{
        onAction()
        onClose()
    }

  return (
    <Modal show={true} backdrop="static" keyboard={false}>
      <Modal.Header>
        <Modal.Title>{ title }</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        { body }
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onOk}>OK</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;