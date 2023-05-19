import React from "react";
import { Modal } from "react-bootstrap";
import "../CSS/EventModal.css";

const EventModal = (props) => {
  return (
    <Modal
      show={props.showModal}
      onHide={props.handleCloseModal}
      id="mainModalContainer"
    >
      <Modal.Header
        closeButton
        variant="warning"
        id="modalCloseBtn"
      >
        {props.eventTitle}

      </Modal.Header>

      <div id="modalPic">
        <img
          src={props.modalImage}
          alt={props.modalImage}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>

      <div id="modalInfo">
        <p className="text-muted">{props.modalCategory}</p>
        <p>{props.modalTitle}</p>
        <p>{props.modalDate}</p>
        <p>{props.modalPlace}</p>
        <p>{props.modalDescription}</p>
        <div className="modal_footer_drops">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </Modal>
  );
};

export default EventModal;
