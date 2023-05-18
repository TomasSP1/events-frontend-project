import React, { useState, useContext } from "react";

import CategoriesFilter from "./CategoriesFilter";
import DateFilter from "./DateFilter";

import { CategoriesContext } from "../Pages/CategoriesContext";

const Filter = (props) => {
  const [categories] = useContext(CategoriesContext);
  const [filterProps, setFilterProps] = useState(["visi", "visi"]);

  const dateHandler = (day) => {
    setFilterProps([day, filterProps[1]]);
    props.setFilter([day, filterProps[1]]);
  };

  const categoryHandler = (category) => {
    setFilterProps([filterProps[0], category]);
    props.setFilter([filterProps[0], category]);
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        width: "80%",
      }}
    >
      <CategoriesFilter
        selectedCategory={categoryHandler}
        key={categories}
      />
      <DateFilter selectedDate={dateHandler} />
    </div>
  );
};

export default Filter;
