import React from "react";
import { useState, useEffect } from "react";

import eventServices from "../../services/eventsServices";

// component to get a random event image from the database
const RandomImg = () => {
  const [events, setEvents] = useState([]);

  const getEventsData = async () => {
    const data = await eventServices.getEvents();
    setEvents(data);
  };

  useEffect(() => {
    getEventsData();
  }, []);

  // get a random number between 0 and the length of the events array
  let randomNum = Math.floor(Math.random() * events.length);

  return (
    <div
      className="randomImg"
      style={{
        width: "100%",
        height: "100%",
        backgroundImage: `url(${events[randomNum]?.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",

        borderRadius: "inherit",
      }}
    />
  );
};

export default RandomImg;
