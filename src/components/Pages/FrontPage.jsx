import React, { useState, useEffect } from "react";
import Categories from "../Common/Categories";
import { Card, Col, Container, Row } from "react-bootstrap";
import "../CSS/FrontPage.css";
import { getEvents } from "../../services/eventsServices";

function FrontPage() {
  const [events, setEvents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const getEventsData = async () => {
      const data = await getEvents();

      setEvents(data);
    };

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
          <div className="card-row d-flex align-items-center flex-wrap">
            {events
              .filter(
                (event) =>
                  !selectedCategory || event.category === selectedCategory
              )
              .map((event) => (
                <Card
                  key={event._id}
                  className="cardevents align-items-center m-2"
                >
                  <Card.Img variant="top" src={event.image} />
                  <Card.Body>
                    <Card.Title>{event.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {event.category}
                    </Card.Subtitle>
                    <Card.Subtitle className="mb-2 text-muted">
                      {event.date}
                    </Card.Subtitle>
                    <Card.Subtitle className="mb-2 text-muted">
                      {event.description}
                    </Card.Subtitle>
                    <Card.Subtitle className="mb-2 text-muted">
                      {event.place}
                    </Card.Subtitle>
                    <Card.Subtitle className="mb-2 text-muted">
                      {event.date}
                    </Card.Subtitle>
                  </Card.Body>
                </Card>
              ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
}
export default FrontPage;
