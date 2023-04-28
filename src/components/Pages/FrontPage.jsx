
import React, { useState, useEffect } from "react";
import Categories from "../Categories";
import { Card, Col, Container, Row } from "react-bootstrap";

import "../CSS/FrontPage.css";

function FrontPage() {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch("https://events-80pg.onrender.com/api/events?fbclid=IwAR2BsI942sMsf4p6w41j4UAzLuqulTQiPTqFw--PIH06EEeL5m6vNkmdmlE");
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchEvents();
  }, []);

  return (
    <Container fluid>
    <Row>
      <Col className="bg-secondary" xs={2}>
        <Categories></Categories>
      </Col>
      <Col className="mt-5" xs={10}>
        <div className="card-row d-flex align-items-center flex-wrap">
          {events.map((event) => (
            
            <Card key={event.id} className="cardevents align-items-center m-2">
               <Card.Img variant="top" src={event.image} />
              <Card.Body>
                <Card.Title>{event.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{event.category}</Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">{event.date}</Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">{event.description}</Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">{event.place}</Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">{event.date}</Card.Subtitle>
                
                
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
