import React, { useState, useEffect } from "react";
import { getCategories } from "../../services/categoriesServices";
import { Container } from "react-bootstrap";

function Categories({ onCategorySelect }) {
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

  const handleCategoryClick = (category) => {
    onCategorySelect(category);
  };

  const handleCategoryHover = (e) => {
    e.target.style.backgroundColor = "#333";
  };

  const handleCategoryLeave = (e) => {
    e.target.style.backgroundColor = "";
  };

  useEffect(() => {
    const getCategoriesData = async () => {
      const data = await getCategories();

      if (data) {
        setCategories(data);
        setLoading(false);
      }
    };

    getCategoriesData();
  }, []);

  return (
    <div>
      {loading ? (
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
