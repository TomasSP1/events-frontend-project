import axios from "axios";

const API_URL = "/api/events/";

//========================= GET ALL EVENTS =======================//

const getEvents = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

//========================= GET USER EVENTS =======================//

const getUserEvents = async () => {
  const userStr = localStorage.getItem("user");
  const userObj = JSON.parse(userStr);
  const token = userObj ? userObj.token : null;
  const response = await axios.get(API_URL + "user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

//========================= UPDATE USER EVENTS =======================//

const updateUserEvents = async (eventID, updatedEvent) => {
  const userStr = localStorage.getItem("user");
  const userObj = JSON.parse(userStr);
  const token = userObj ? userObj.token : null;
  const response = await axios.put(API_URL + eventID, updatedEvent, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

//=========================  DELETE USER EVENTS =======================//

const deleteUserEvents = async (eventID) => {
  const userStr = localStorage.getItem("user");
  const userObj = JSON.parse(userStr);
  const token = userObj ? userObj.token : null;
  const response = await axios.delete(API_URL + eventID, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const eventServices = {
  getEvents,
  getUserEvents,
  updateUserEvents,
  deleteUserEvents,
};

export default eventServices;
