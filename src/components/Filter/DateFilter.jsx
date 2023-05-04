import React from "react";

const DateFilter = (props) => {
  const selectedDateHandler = (e) => {
    props.selectedDate(e.target.value);
  };

  const datePickerStyle = {
    width: "100%",
    textAlign: "center",

  }

  return (
    <div>
      <select defaultValue="" onChange={selectedDateHandler} style={datePickerStyle}>
        <option value="visi">Visi</option>
        <option value="siandien">Šiandien</option>
        <option value="rytoj">Rytoj</option>
        <option value="poryt">Poryt</option>
        <option value="savaitgali">Savaitgali</option>
      </select>
    </div>
  );
};

export default DateFilter;
