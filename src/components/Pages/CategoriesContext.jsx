import React, { createContext, useState, useEffect } from "react";
import categoriesServices from "../../services/categoriesServices";

export const CategoriesContext = createContext([]);

const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      const categoriesData = await categoriesServices.getCategories();
      setCategories(categoriesData);
    }
    fetchCategories();
  }, []);

  // const refreshCategories = async () => {
  //   console.log("Updating")
  //   const categoriesData = await categoriesServices.getCategories();
  //   setCategories(categoriesData);
  // };

  return (
    <CategoriesContext.Provider value={[categories, setCategories]}>
      {children}
    </CategoriesContext.Provider>
  );
};

export default CategoriesProvider;
