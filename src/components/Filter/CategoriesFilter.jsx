import React, { useState, useEffect } from "react";
import categoriesServices from "../../services/categoriesServices";
import { Container } from "react-bootstrap";

function CategoriesFilter(props) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const selectedCategoryHandler = (e) => {
    props.selectedCategory(e.target.innerHTML.toLowerCase());
  };

  useEffect(() => {
    const getCategoriesData = async () => {
      const data = await categoriesServices.getCategories();

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
            <div
              key="visi"
              style={categoryStyle}
              onMouseEnter={handleCategoryHover}
              onMouseLeave={handleCategoryLeave}
              onClick={selectedCategoryHandler}
            >
              Visi
            </div>
            {categories.map((category) => (
              <div
                key={category._id}
                style={categoryStyle}
                onMouseEnter={handleCategoryHover}
                onMouseLeave={handleCategoryLeave}
                onClick={selectedCategoryHandler}
              >
                {category.title.charAt(0).toUpperCase() +
                  category.title.slice(1)}
              </div>
            ))}
          </div>
        </Container>
      )}
    </div>
  );
}

export default CategoriesFilter;
