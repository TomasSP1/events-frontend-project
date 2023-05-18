import axios from "axios";

const API_URL = "/api/favorites/";

//========================= GET EVENT FAVORITES =======================//

const getEventFavorites = async (id) => {
  const response = await axios.get(API_URL + id);
  return response.data;
};

//========================= GET ALL FAVORITES =======================//

const getFavorites = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

//========================= GET USER FAV EVENTS =======================//

const getUserFavorites = async () => {
  const userStr = localStorage.getItem("user");
  const userObj = JSON.parse(userStr);
  const token = userObj ? userObj.token : null;

  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

//========================= DELETE USER FAV EVENTS =======================//

const deleteUserFavorite = async (id) => {
  const userStr = localStorage.getItem("user");
  const userObj = JSON.parse(userStr);
  const token = userObj ? userObj.token : null;

  const response = await axios.delete(API_URL + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const eventServices = {
  getEventFavorites,
  getFavorites,
  getUserFavorites,
  deleteUserFavorite,
};

export default eventServices;
