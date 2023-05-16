import React, { useState, useContext, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { StarFill, Star } from "react-bootstrap-icons";
import axios from "axios";
import EventModal from "./EventModal";


import { EventContext } from "./EventContext";
import favoritesServices from "../../services/favoritesServices";

const deleteEvent = async (eventId) => {
  try {
    const userStr = localStorage.getItem("user");
    const userObj = JSON.parse(userStr);

    if (userObj === null) {
      // Handle the case where the user is not logged in
      console.log("User not logged in");
      return;
    }

    const { token } = userObj;

    const response = await axios.delete(
      `https://events-80pg.onrender.com/api/events/${eventId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Deleted event:", response);
  } catch (error) {
    console.error(error);
  }
};


const UserEventCard = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [myFavorites, setMyFavorites] = useState([]);
  const navigate = useNavigate();

  console.log(props)

  const [events, setEvents, refreshEvents] = useContext(EventContext);

  const date = new Date(props.eventDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const dateFormatted = `${year}-${month}-${day}`;

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);


  const handleDeleteEvent = async () => {
    await deleteEvent(props.eventID);
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
        const favorites = await favoritesServices.getUserFavorites();
        setMyFavorites(favorites.map((favorite) => favorite.event));
      }
    };
    getFavorites();
  }, []);

  useEffect(() => {
    setIsFavorite(myFavorites.includes(props.eventID));
  }, [myFavorites, props.eventID]);

  return (
    <>
      <Card className="cardevents align-items-center m-2 h-auto">
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
        <Card.Img variant="top" src={props.eventImage} />
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
            <Button>Update</Button>
          </div>
          <div className="d-flex justify-content-center my-2">
          <Button variant="danger" onClick={handleDeleteEvent}>Ištrinti</Button>
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

export default UserEventCard;