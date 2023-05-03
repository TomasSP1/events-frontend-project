import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "../CSS/FrontPage.css";
import eventServices from "../../services/eventsServices";
import EventCard from "./EventCard";
import Filter from "../Filter/Filter";
import filterLogic from "../Filter/FilterLogic";

function FrontPage() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);

  const getEventsData = async () => {
    const data = await eventServices.getEvents();
    setEvents(data);
  };

  useEffect(() => {
    getEventsData();
  }, []);

  const handleFilter = (selected) => {
    filterLogic(selected, events, setFilteredEvents);
  };

  return (
    <Container fluid>
      <Row>
        <Col className="bg-secondary" md={2}>
          <Filter setFilter={handleFilter} />
        </Col>
        <Col className="mt-5" md={10}>
          <h1 className="text-center">Events</h1>
          <div className="card-row d-flex align-items-center justify-content-center flex-wrap my-5">
            {
            filteredEvents.length==0  ? <div>No existing events with selected filter.</div> : (
            filteredEvents.map((event) => (
              <EventCard
                key={event._id}
                eventImage={event.image}
                eventTitle={event.title}
                eventCategory={event.category}
                eventDate={event.date}
                eventDescription={event.description}
                eventPlace={event.place}
              />
            )))}
          </div>
        </Col>
      </Row>
    </Container>
  );
}
export default FrontPage;
