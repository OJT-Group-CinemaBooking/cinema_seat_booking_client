import React from "react";
import { Modal } from "react-bootstrap";

const DelayModal = ({ show, message }) => {

  return (
    <Modal show={show} backdrop="static" keyboard={false}>
      <Modal.Body>{message}</Modal.Body>
    </Modal>
  );
};

export default DelayModal;
