import React, { useState } from "react";
import CategoriesFilter from "./CategoriesFilter";
import DateFilter from "./DateFilter";

const Filter = (props) => {
  const [filterProps,setFilterProps] = useState(['visi','visi']);

  const dateHandler = (day) => {
    setFilterProps([day, filterProps[1]]);
    props.setFilter([day, filterProps[1]]);
  };

  const categoryHandler = (category) => {
    setFilterProps([filterProps[0], category]);
    props.setFilter([filterProps[0], category]);
  };
  return (
    <div>
      <CategoriesFilter selectedCategory={categoryHandler}/>
      <DateFilter selectedDate={dateHandler} />
    </div>
  );
};

export default Filter;
