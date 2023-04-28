import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const handleCategoryHover = (e) => {
    e.target.style.backgroundColor = "#333";
  };

  const handleCategoryLeave = (e) => {
    e.target.style.backgroundColor = "";
  };
  
  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch("https://events-80pg.onrender.com/api/categories");
        const data = await response.json();
        setCategories(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    fetchCategories();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
    <Container>
      <div className="d-flex justify-content-center mt-2">
        <h2>Categories</h2>
      </div>
      <div className="categories">
        {categories.map((category) => (
          <div
            key={category.id}
            style={categoryStyle}
            onMouseEnter={handleCategoryHover}
            onMouseLeave={handleCategoryLeave}
          >
            {capitalizeFirstLetter(category.title)}
          </div>
        ))}
      </div>
      </Container>
    </div>
  );
}

export default Categories;
