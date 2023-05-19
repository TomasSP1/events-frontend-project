import React, { createContext, useState, useEffect } from "react";

import eventServices from "../../services/eventsServices";

export const EventContext = createContext([]);

const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [myEvents, setMyEvents] = useState([]);

  useEffect(() => {
    async function fetchEvents() {
      const eventsData = await eventServices.getEvents();
      setEvents(eventsData);
    }

    async function fetchMyEvents() {
      const userEventsData = await eventServices.getUserEvents();
      setMyEvents(userEventsData);
    }

    fetchMyEvents();
    fetchEvents();
  }, []);

  const refreshEvents = async () => {
    const eventsData = await eventServices.getEvents();
    setEvents(eventsData);
  };

  const refreshMyEvents = async () => {
    const userEventsData = await eventServices.getUserEvents();
    setMyEvents(userEventsData);
  };

  const contextValue = [
    events,
    setEvents,
    refreshEvents,
    myEvents,
    setMyEvents,
    refreshMyEvents,
  ];

  return (
    <EventContext.Provider value={contextValue}>
      {children}
    </EventContext.Provider>
  );
};

export default EventProvider;
