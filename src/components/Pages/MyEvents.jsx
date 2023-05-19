import React, { useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";

import UserEventCard from "./UserEventCard";
import { EventContext } from "./EventContext";

const MyEvents = () => {
  const [, , , myEvents] = useContext(EventContext);

  return (
    <Container fluid>
      <Row>
        <Col
          className="mt-5"
          md={10}
        >
          <div className="card-row d-flex align-items-center flex-wrap">
            {myEvents.map((event) => (
              <UserEventCard
                key={event._id}
                eventImage={event.image}
                eventTitle={event.title}
                eventCategory={event.category}
                eventDate={event.date}
                eventDescription={event.description}
                eventPlace={event.place}
                eventID={event._id}
              />
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default MyEvents;
