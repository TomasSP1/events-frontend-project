import React, { useState, useContext } from "react";
import "../CSS/EventCard.css";
import { Card, Modal, Button } from "react-bootstrap";
import EventModal from "./EventModal";
import { IoMdStar } from 'react-icons/io';
import {
  approveEvent,
  disapproveEvent,
  deleteEvent,
} from "./Admin/AdminControlEvents";
import { EventContext } from "./EventContext";

const EventCard = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [events, setEvents, refreshEvents] = useContext(EventContext);

  const date = new Date(props.eventDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  const dateFormatted = `${year}-${month}-${day}`;

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleApproveEvent = async () => {
    await approveEvent(props.eventID);
    refreshEvents();
  };

  const handleDeleteEvent = async () => {
    await deleteEvent(props.eventID);
    refreshEvents();
  };

  const handleDissaproveEvent = async () => {
    await disapproveEvent(props.eventID);
    refreshEvents();
  };

  return (
    <>
      <Card className="cardevents align-items-center m-2 h-auto">
      <div className="row d-flex">
  <div className="col-9">
    <h5 className="mt-2">This event has been saved:</h5>
  </div>
  <div className="col-3 star-icon">
    <button className="btn btn-link star-icon" type="button">
      <IoMdStar />
    </button>
  </div>
</div>

        <Card.Img variant="top" src={props.eventImage} />
        <Card.Body>
          <Card.Title>{props.eventTitle}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {props.eventCategory}
          </Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">
            {dateFormatted}
          </Card.Subtitle>
          <div className="d-flex justify-content-center">
            <Button onClick={handleShowModal} className="mb-2 w-100">
              Peržiurėti renginį
            </Button>
          </div>
          <div className="d-flex justify-content-center">
            {props.approved == false ? (
              <div className="w-100">
                <Button
                  variant="success"
                  className="w-100 mb-2"
                  onClick={handleApproveEvent}
                >
                  Patvirtinti
                </Button>
                <Button
                  variant="danger"
                  className="w-100  mb-2"
                  onClick={handleDeleteEvent}
                >
                  Ištrinti
                </Button>
              </div>
            ) : (
              ""
            )}
            {props.adminPage ? (
              <Button
                variant="warning"
                className="w-100  mb-2"
                onClick={handleDissaproveEvent}
              >
                Nepatvirtinti
              </Button>
            ) : (
              ""
            )}
          </div>
        </Card.Body>
      </Card>

      <EventModal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        modalDate={dateFormatted}
        modalCategory={props.eventCategory}
        modalDescription={props.eventDescription}
        modalImage={props.eventImage}
        modalPlace={props.eventPlace}
        eventID={props.eventID}
      />
    </>
  );
};

export default EventCard;
