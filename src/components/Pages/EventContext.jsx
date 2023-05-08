import React, { createContext, useState, useEffect } from "react";
import eventServices from "../../services/eventsServices";

export const EventContext = createContext([]);

const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchEvents() {
      const eventsData = await eventServices.getEvents();
      setEvents(eventsData);
    }
    fetchEvents();
  }, []);

  const refreshEvents = async () => {
    const eventsData = await eventServices.getEvents();
    setEvents(eventsData);

  };

  return (
    <EventContext.Provider value={[events, setEvents, refreshEvents]}>
      {children}
    </EventContext.Provider>
  );
};

export default EventProvider;
