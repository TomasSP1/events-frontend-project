import React, { useState, useEffect } from "react";
import eventServices from "../../services/eventsServices";
import { Col, Container, Row } from "react-bootstrap";
import UserEventCard from "./UserEventCard";

const MyEvents = () => {
  const [myEvents, setMyEvents] = useState([]);

  useEffect(() => {
    const getMyEventsData = async () => {
      const data = await eventServices.getUserEvents();

      console.log(data);

      if (data) {
        setMyEvents(data);
      }
    };
    getMyEventsData();
  }, []);


 
  console.log(myEvents)

  return (
    <Container fluid>
      <Row>
        <Col className="mt-5" md={10}>
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
                eventUser={myEvents[0].user}
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
