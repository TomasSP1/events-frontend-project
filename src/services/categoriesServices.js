const API_URL = "/api/categories";

const getCategories = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export { getCategories };
