import React, { useState, useEffect } from "react";
import categoriesServices from "../../services/categoriesServices";
import "../CSS/CategoriesFilter.css";

function CategoriesFilter(props) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const selectedCategoryHandler = (e) => {
    props.selectedCategory(e.target.value.toLowerCase());
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
        <div id="loadingDiv">Loading...</div>
      ) : (
        <div id="catsParent">
          <div id="CatsContainer">
            <select onChange={selectedCategoryHandler}>
              <option
                key="visi"
                value="visi"
                defaultValue=""
              >
                Visi&nbsp;&nbsp;&#9662;
              </option>

              {categories.map((category) => (
                <option
                  key={category._id}
                  value={category.title}
                >
                  {category.title.charAt(0).toUpperCase() +
                    category.title.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
}

export default CategoriesFilter;
