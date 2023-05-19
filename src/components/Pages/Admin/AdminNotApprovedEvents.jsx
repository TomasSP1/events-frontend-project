import React from "react";

import EventCard from "../EventCard";

const AdminNotApprovedEvents = (props) => {
  const notApprovedEvents = props.events.filter((event) => !event.approved);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Not Approved Events</h1>
      <div className="card-row d-flex align-items-center justify-content-center flex-wrap my-5">
        {notApprovedEvents.map((event) => {
          return (
            <EventCard
              key={event._id}
              eventImage={event.image}
              eventTitle={event.title}
              eventCategory={event.category}
              eventDate={event.date}
              eventDescription={event.description}
              eventPlace={event.place}
              eventID={event._id}
              approved={false}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AdminNotApprovedEvents;
