const API_URL = "/api/events";

const getEvents = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export { getEvents };
