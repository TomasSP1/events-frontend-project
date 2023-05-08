import eventServices from "../../../services/eventsServices";

export const approveEvent = async (eventID) => {
  await eventServices.updateUserEvents(eventID, { approved: true });
};

export const disapproveEvent = async (eventID) => {
  await eventServices.updateUserEvents(eventID, { approved: false });
};

export const deleteEvent = async (eventID) => {
  await eventServices.deleteUserEvents(eventID);
};
