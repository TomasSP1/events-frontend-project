import React from "react";
import { Card } from "react-bootstrap";

const EventCard = (props) => {
  const date = new Date(props.eventDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  const dateFormatted = `${year}-${month}-${day}`;
  return (
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
        <Card.Subtitle className="mb-2 text-muted">
          {props.eventDescription}
        </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          {props.eventPlace}
        </Card.Subtitle>
      </Card.Body>
    </Card>
  );
};

export default EventCard;
