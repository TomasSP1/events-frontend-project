import React, { useState, useContext, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

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

  const [eventData, setEventData] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  console.log(props);

  const [, , , , , refreshMyEvents] = useContext(EventContext);

  const date = new Date(props.eventDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const dateFormatted = `${year}-${month}-${day}`;

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleDeleteEvent = async () => {
    await deleteEvent(props.eventID);
    refreshMyEvents();
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
      <div
        id="singleEventCard"
        className="cardevents h-auto m-5"
      >
        {/* heart btn */}
        <button
          id="favContainer"
          className="bg-light "
          onClick={() => handleFavorite(props.eventID)}
        >
          {isFavorite ? (
            <i
              style={{ color: "#D22B2B", fontSize: "1.5rem" }}
              id="favHeart"
              className="fa-solid fa-heart"
            ></i>
          ) : (
            <i
              className="fa-solid fa-heart"
              style={{
                color: isHovered ? "#D22B2B" : "#000",
                transform: isHovered ? "scale(1.2)" : "scale(1)",
                transition: "transform 0.3s ease",
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            ></i>
          )}
        </button>
        {/* ----------------- */}
        {/* ----------------- */}
        <div
          onClick={handleShowModal}
          className="image-container"
        >
          <img
            src={props.eventImage}
            alt=""
            width="100%"
            height="100%"
          />
        </div>

        {/* ----------------- */}

        {/* ----------------- */}
        <div id="eventCardBody">
          <h5> {props.eventTitle}</h5>
          <p className="text-muted mb-2">{props.eventCategory}</p>
          <p style={{ color: "#3700b3" }}>{dateFormatted}</p>
          <p className="text-muted">{props.eventPlace}</p>
          <p className="text-muted">
            {eventData} <i class="fa-solid fa-heart"></i>
          </p>
        </div>
        {/* ----------------- */}

        <div
          className="d-flex justify-content-center"
          style={{
            position: "absolute",
            bottom: "1%",
            right: "1%",
            zIndex: "1",
          }}
        >
          <Button
            onClick={() =>
              navigate(`/add_event?eventId=${props.eventID}`, {
                state: { eventData: props },
              })
            }
          >
            Update
          </Button>
        </div>
        <div className="d-flex justify-content-center my-2">
          <Button
            variant="danger"
            onClick={handleDeleteEvent}
            style={{
              position: "absolute",
              bottom: "1%",
              right: "25%",
              zIndex: "1",
            }}
          >
            Delete
          </Button>
        </div>
      </div>

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
