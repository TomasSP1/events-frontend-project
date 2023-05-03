import React, { useState, useEffect } from "react";
import eventServices from "../../services/eventsServices";
import { Col, Container, Row } from "react-bootstrap";
import EventCard from "./EventCard";

const MyEvents = () => {
  const [myEvents, setMyEvents] = useState([]);

  useEffect(() => {
    const getMyEventsData = async () => {
      const data = await eventServices.useGetUserEvents();

      if (data) {
        setMyEvents(data);
      }
    };
    getMyEventsData();
  }, []);

  return (
    <Container fluid>
      <Row>
        <Col className="mt-5" md={10}>
          <div className="card-row d-flex align-items-center flex-wrap">
            {myEvents.map((event) => (
              <EventCard
                key={event._id}
                eventImage={event.image}
                eventTitle={event.title}
                eventCategory={event.category}
                eventDate={event.date}
                eventDescription={event.description}
                eventPlace={event.place}
              />
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default MyEvents;
