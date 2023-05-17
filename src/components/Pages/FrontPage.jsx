import React, { useState, useEffect, useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "../CSS/FrontPage.css";
import EventCard from "./EventCard";
import Filter from "../Filter/Filter";
import filterLogic from "../Filter/FilterLogic";
import { useAuth } from "../../auth/AuthContext";
import AdminPage from "./Admin/AdminPage";
import { EventContext } from "./EventContext";

function FrontPage() {
  const [events, setEvents] = useContext(EventContext);
  const [approvedEvents, setApprovedEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const { userRole } = useAuth();
  console.log(useAuth())

  useEffect(() => {
    setApprovedEvents(events.filter((event) => event.approved));
  }, [events]);

  useEffect(() => {
    setFilteredEvents(approvedEvents);
  }, [approvedEvents]);

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
          {userRole === "admin" ? <AdminPage eventsArr={events} /> : ""}
          <h1 className="text-center">Events</h1>
          <div className="card-row d-flex align-items-center justify-content-center flex-wrap my-5">
            {filteredEvents.length === 0 ? (
              <div>No existing events with selected filter.</div>
            ) : (
              filteredEvents.map((event) => (
                <EventCard
                  key={event._id}
                  eventImage={event.image}
                  eventTitle={event.title}
                  eventCategory={event.category}
                  eventDate={event.date}
                  eventDescription={event.description}
                  eventPlace={event.place}
                  eventID={event._id}
                  adminPage={userRole === "admin" ? true : false}
                />
              ))
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
}
export default FrontPage;
