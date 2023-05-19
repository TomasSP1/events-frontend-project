import React from "react";

import "../CSS/DateFilter.css";

const DateFilter = (props) => {
  const selectedDateHandler = (e) => {
    props.selectedDate(e.target.value);
  };

  return (
    <div id="dateContainer">
      <select
        defaultValue=""
        onChange={selectedDateHandler}
      >
        <option
          value=""
          disabled
          selected
        >
          Select a date&nbsp;&nbsp;&#9662;
        </option>
        <option value="visi">All</option>
        <option value="siandien">Today</option>
        <option value="rytoj">Tomorow</option>
        <option value="poryt">Day after tomorow</option>
        <option value="savaitgali">Weekend</option>
      </select>
    </div>
  );
};

export default DateFilter;
