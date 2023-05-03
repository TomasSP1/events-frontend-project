import React, { useState, useEffect } from "react";
import Categories from "../Common/Categories";
import { Card, Col, Container, Row } from "react-bootstrap";
import "../CSS/FrontPage.css";
import eventServices from "../../services/eventsServices";
import EventCard from "./EventCard";
import EventRegForm from "./EventRegForm";

function FrontPage() {
  const [events, setEvents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const getEventsData = async () => {
    const data = await eventServices.getEvents();
    setEvents(data);
  };

  useEffect(() => {
    getEventsData();
  }, []);

  // Filter the events based on the selected category
  const filteredEvents = selectedCategory
    ? events.filter((event) => event.category === selectedCategory)
    : events;

  return (
    <Container fluid>
      <Row>
        <Col className="bg-secondary" md={2}>
          <Categories
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
          />
        </Col>
        <Col className="mt-5" md={10}>
          <EventRegForm getEventsData={getEventsData}/>
          <div className="card-row d-flex align-items-center justify-content-center flex-wrap my-5">
            {filteredEvents.map((event) => (
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
}
export default FrontPage;