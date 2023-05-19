import React, { useState, useEffect, useContext } from "react";

import "../CSS/FrontPage.css";
import Filter from "../Filter/Filter";
import filterLogic from "../Filter/FilterLogic";
import { useAuth } from "../../auth/AuthContext";

import EventCard from "./EventCard";
import AdminPage from "./Admin/AdminPage";
import { EventContext } from "./EventContext";

function FrontPage() {
  const [events] = useContext(EventContext);
  const [approvedEvents, setApprovedEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const { userRole } = useAuth();

  useEffect(() => {
    setApprovedEvents(events.filter((event) => event.approved));
  }, [events]);

  useEffect(() => {
    setFilteredEvents(approvedEvents);
  }, [approvedEvents]);

  const handleFilter = (selected) => {
    filterLogic(selected, approvedEvents, setFilteredEvents);
  };

  return (
    <div id="frontPageContainer">
      <div id="filtersDiv">
        <h1 className="text-center">Events</h1>
        <Filter setFilter={handleFilter} />
      </div>

      <div id="eventsDiv">
        {userRole === "admin" ? <AdminPage eventsArr={events} /> : ""}

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
      </div>
    </div>
  );
}
export default FrontPage;
