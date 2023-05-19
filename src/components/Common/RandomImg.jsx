import React, { useState, useEffect } from "react";

import eventServices from "../../services/eventsServices";
import "../CSS/RandomImg.css"; // Import CSS file for styling

const RandomImg = () => {
  const [events, setEvents] = useState([]);
  const [randomNum, setRandomNum] = useState(0);
  const [prevRandomNum, setPrevRandomNum] = useState(-1);

  const getEventsData = async () => {
    const data = await eventServices.getEvents();
    setEvents(data);
  };

  useEffect(() => {
    getEventsData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      let newRandomNum = Math.floor(Math.random() * events.length);
      while (newRandomNum === prevRandomNum) {
        newRandomNum = Math.floor(Math.random() * events.length);
      }
      setPrevRandomNum(randomNum);
      setRandomNum(newRandomNum);
    }, 5000);
    return () => clearInterval(interval);
  }, [events, prevRandomNum, randomNum]);

  return (
    <div className="randomImgContainer">
      {events.length > 0 && (
        <div
          className="randomImg"
          style={{
            backgroundImage: `url(${events[randomNum]?.image})`,
          }}
        />
      )}
    </div>
  );
};

export default RandomImg;
