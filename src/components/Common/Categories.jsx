import React, { useState, useContext } from "react";
import { Container } from "react-bootstrap";

import { CategoriesContext } from "../Pages/CategoriesContext";

function Categories({ onCategorySelect }) {
  const [categories] = useContext(CategoriesContext);
  const isLoading = true;

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  const categoryStyle = {
    color: "white",
    margin: "10px",
    cursor: "pointer",
    transition: "background-color 0.5s ease",
  };

  const categoryHoverStyle = {
    backgroundColor: "#333",
  };

  const handleCategoryClick = (category) => {
    onCategorySelect(category);
  };

  const handleCategoryHover = (e) => {
    e.target.style.backgroundColor = "#333";
  };

  const handleCategoryLeave = (e) => {
    e.target.style.backgroundColor = "";
  };

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Container>
          <div className="d-flex justify-content-center mt-2">
            <h4>Categories</h4>
          </div>
          <div className="categories ">
            {categories.map((category) => (
              <div
                key={category._id}
                style={categoryStyle}
                onMouseEnter={handleCategoryHover}
                onMouseLeave={handleCategoryLeave}
                onClick={() => handleCategoryClick(category.title)}
              >
                {capitalizeFirstLetter(category.title)}
              </div>
            ))}
          </div>
        </Container>
      )}
    </div>
  );
}

export default Categories;
