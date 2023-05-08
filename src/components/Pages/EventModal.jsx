import React from "react";
import { Modal } from "react-bootstrap";

const EventModal = (props) => {
  return (
    <Modal show={props.showModal} onHide={props.handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>{props.eventTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img
          src={props.modalImage}
          alt={props.modalImage}
          style={{ maxWidth: "100%", height: "auto", marginBottom: "10px" }}
        />
        <p>Kategorija: {props.modalCategory}</p>
        <p>Data: {props.modalDate}</p>
        <p>Aprasyšymas: {props.modalDescription}</p>
        <p>Lokacija: {props.modalPlace}</p>
      </Modal.Body>
    </Modal>
  );
};

export default EventModal;
