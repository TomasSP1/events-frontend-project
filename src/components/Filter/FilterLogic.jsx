import moment from "moment/moment";

const filterLogic = (selected, events, setFilteredEvents) => {
  let targetDate;
  let targetCategory;

  // FILTERING BY DAY
  if (selected[0] === "siandien") {
    targetDate = moment().format("YYYY-MM-DD");
  } else if (selected[0] === "rytoj") {
    targetDate = moment().add(1, "day").format("YYYY-MM-DD");
  } else if (selected[0] === "poryt") {
    targetDate = moment().add(2, "day").format("YYYY-MM-DD");
  } else if (selected[0] === "savaitgali") {
    targetDate = "savaitgali";
  }

  // FILTERING BY CATEGORY
  if (selected[1] !== "visi") {
    targetCategory = selected[1];
  }

  setFilteredEvents(
    events.filter((event) => {
      if (targetDate === "savaitgali") {
        if (targetCategory) {
          return (
            (moment(event.date).day() === 6 ||
              moment(event.date).day() === 0) &&
            event.category === targetCategory
          );
        } else {
          return (
            moment(event.date).day() === 6 || moment(event.date).day() === 0
          );
        }
      } else if (targetDate && targetCategory) {
        const eventDate = moment(event.date).format("YYYY-MM-DD");
        return (
          moment(eventDate).isSame(targetDate) &&
          event.category === targetCategory
        );
      } else if (targetDate) {
        const eventDate = moment(event.date).format("YYYY-MM-DD");
        return moment(eventDate).isSame(targetDate);
      } else if (targetCategory) {
        return event.category === targetCategory;
      } else {
        return event;
      }
    })
  );
};

export default filterLogic;
