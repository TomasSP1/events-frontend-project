import React, { useState, useEffect } from "react";

import categoriesServices from "../../services/categoriesServices";
import "../CSS/CategoriesFilter.css";

function CategoriesFilter(props) {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const selectedCategoryHandler = (e) => {
    props.selectedCategory(e.target.value.toLowerCase());
  };

  useEffect(() => {
    const getCategoriesData = async () => {
      const data = await categoriesServices.getCategories();

      if (data) {
        setCategories(data);
        setIsLoading(false);
      }
    };

    getCategoriesData();
  }, []);

  return (
    <div>
      {isLoading ? (
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

              {categories.map(({ _id, title }) => (
                <option
                  key={_id}
                  value={title}
                >
                  {title.charAt(0).toUpperCase() + title.slice(1)}
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
