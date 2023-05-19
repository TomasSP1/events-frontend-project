import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";

import favoriteServices from "../../services/favoritesServices";
import eventServices from "../../services/eventsServices";

import EventCard from "./EventCard";

const Favorites = () => {
  const [userFavoritesID, setUserFavoritesID] = useState([]);
  const [userFavoriteEvents, setUserFavoriteEvents] = useState([]);

  useEffect(() => {
    const getUserFavorites = async () => {
      const data = await favoriteServices.getUserFavorites();

      if (data) {
        const eventIDs = new Set(userFavoritesID);

        for (let key in data) {
          eventIDs.add(data[key].event);
        }

        const uniqueIDsArray = Array.from(eventIDs);

        setUserFavoritesID(uniqueIDsArray);
      }
    };
    getUserFavorites();
  }, []);

  useEffect(() => {
    const getEvents = async () => {
      const data = await eventServices.getEvents();

      if (data) {
        setUserFavoriteEvents(
          data.filter((event) => userFavoritesID.includes(event._id))
        );
      }
    };
    getEvents();
  }, [userFavoritesID]);

  return (
    <Container fluid>
      <Row>
        <Col
          className="mt-5"
          md={10}
        >
          <div className="card-row d-flex align-items-center flex-wrap m-5">
            {userFavoriteEvents.map((event) => (
              <EventCard
                key={event._id}
                eventImage={event.image}
                eventTitle={event.title}
                eventCategory={event.category}
                eventDate={event.date}
                eventDescription={event.description}
                eventPlace={event.place}
                eventID={event._id}
              />
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Favorites;
