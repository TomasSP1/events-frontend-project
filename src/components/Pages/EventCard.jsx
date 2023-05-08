import React, { useState } from "react";
import { Card, Modal, Button } from "react-bootstrap";
import EventModal from "./EventModal";

const EventCard = (props) => {
  const [showModal, setShowModal] = useState(false);

  const date = new Date(props.eventDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  const dateFormatted = `${year}-${month}-${day}`;

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <Card className="cardevents align-items-center m-2">
        <Card.Img variant="top" src={props.eventImage} />
        <Card.Body>
          <Card.Title>{props.eventTitle}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {props.eventCategory}
          </Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">
            {dateFormatted}
          </Card.Subtitle>
          <Button onClick={handleShowModal}>Peržiurėti renginį</Button>
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
