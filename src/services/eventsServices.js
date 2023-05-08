import axios from "axios";
const API_URL = "/api/events/";

// GET ALL EVENTS.
const getEvents = async () => {
  const response = await axios.get(API_URL);

  return response.data;
};

// GET USER EVENTS.
const useGetUserEvents = async () => {
  const userStr = localStorage.getItem("user");
  const userObj = JSON.parse(userStr);
  const { token } = userObj;

  const response = await axios.get(API_URL + "user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const eventServices = {
  getEvents,
  useGetUserEvents,
};

export default eventServices;
