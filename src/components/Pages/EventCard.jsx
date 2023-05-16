import React, { useState, useContext, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { StarFill, Star } from "react-bootstrap-icons";
import axios from "axios";
import "../CSS/EventCard.css";
import EventModal from "./EventModal";
import {
  approveEvent,
  disapproveEvent,
  deleteEvent,
} from "./Admin/AdminControlEvents";
import { EventContext } from "./EventContext";
import favoritesServices from "../../services/favoritesServices";

const EventCard = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [myFavorites, setMyFavorites] = useState([]);
  const navigate = useNavigate();
  const [eventData, setEventData] = useState(null);
  const [events, setEvents, refreshEvents] = useContext(EventContext);

  const date = new Date(props.eventDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  const dateFormatted = `${year}-${month}-${day}`;

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleApproveEvent = async () => {
    await approveEvent(props.eventID);
    refreshEvents();
  };

  const handleDeleteEvent = async () => {
    await deleteEvent(props.eventID);
    refreshEvents();
  };

  const handleDissaproveEvent = async () => {
    await disapproveEvent(props.eventID);
    refreshEvents();
  };

  const handleFavorite = async (id) => {
    console.log("id", id, isFavorite);

    const userStr = localStorage.getItem("user");
    const userObj = JSON.parse(userStr);

    if (userObj === null) {
      navigate("/login");
    } else {
      const { token } = userObj;

      try {
        if (!isFavorite) {
          // Add the event to the user's favorites
          const response = await axios.post(
            "https://events-80pg.onrender.com/api/favorites",
            { event: id },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setIsFavorite(true);
          console.log("myFavorites", myFavorites);
          console.log("Added event to favorites:", response);
        } else {
          // Remove the event from the user's favorites
          const response = await axios.delete(
            `https://events-80pg.onrender.com/api/favorites/${id}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setIsFavorite(false);

          console.log("myFavoritesdelete", myFavorites);
          console.log("Removed event from favorites:", response);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    const getFavorites = async () => {
      const userStr = localStorage.getItem("user");
      const userObj = JSON.parse(userStr);

      if (userObj !== null) {
        const { token } = userObj;
        try {
          const response = await axios.get(
            "https://events-80pg.onrender.com/api/favorites/",
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const favoritesData = response.data;

          const favorites = favoritesData.map((favorite) => favorite.event);
          setMyFavorites(favorites);
        } catch (error) {
          console.error(error);
        }
      }
    };

    getFavorites();
  }, []);

  useEffect(() => {
    setIsFavorite(myFavorites.includes(props.eventID));
  }, [myFavorites, props.eventID]);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await axios.get(
          `https://events-80pg.onrender.com/api/favorites/${props.eventID}`
        );
        const eventData = response.data;
        setEventData(eventData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEventData();
  }, [props.eventID, isFavorite]);

  return (
    <>
     
      <Card className="cardevents m-2 h-auto">
      
      <div className="image-container">
    <button
      className="bg-light favContainer"
      onClick={() => handleFavorite(props.eventID)}
    >
      {isFavorite ? (
        <StarFill className="favoriteIcon" />
      ) : (
        <Star className="favoriteIcon" />
      )}
    </button>

    <h3 className="image-overlay">{eventData}</h3>
    <Card.Img variant="top" src={props.eventImage} className="img-fluid" />

  </div>

        <Card.Body>
          <Card.Title>{props.eventTitle}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {props.eventCategory}
          </Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">
            {dateFormatted}
          </Card.Subtitle>
          <div className="d-flex justify-content-center">
            <Button onClick={handleShowModal} className="mb-2 w-100">
              Peržiurėti renginį
            </Button>
          </div>
          <div className="d-flex justify-content-center">
            {props.approved === false ? (
              <div className="w-100">
                <Button
                  variant="success"
                  className="w-100 mb-2"
                  onClick={handleApproveEvent}
                >
                  Patvirtinti
                </Button>
                <Button
                  variant="danger"
                  className="w-100  mb-2"
                  onClick={handleDeleteEvent}
                >
                  Ištrinti
                </Button>
              </div>
            ) : (
              ""
            )}
            {props.adminPage ? (
              <Button
                variant="warning"
                className="w-100  mb-2"
                onClick={handleDissaproveEvent}
              >
                Nepatvirtinti
              </Button>
            ) : (
              ""
            )}
          </div>
        </Card.Body>
      </Card>

      <EventModal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        modalDate={dateFormatted}
        modalCategory={props.eventCategory}
        modalDescription={props.eventDescription}
        modalImage={props.eventImage}
        modalPlace={props.eventPlace}
        eventID={props.eventID}
      />
    </>
  );
};

export default EventCard;
