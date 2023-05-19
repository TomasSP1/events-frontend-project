import axios from "axios";

const API_URL = "/api/categories/";

const userStr = localStorage.getItem("user");
const userObj = JSON.parse(userStr);
const token = userObj ? userObj.token : null;

//========================= GET CATEGORIES =======================//

const getCategories = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

//========================= SET CATEGORIES =======================//

const postCategory = async (category) => {
  try {
    const response = await axios.post(API_URL, category, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

//========================= DELETE CATEGORIES =======================//

const deleteCategory = async (categoryID) => {
  try {
    const response = await axios.delete(API_URL + categoryID, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const categoriesServices = {
  getCategories,
  postCategory,
  deleteCategory,
};

export default categoriesServices;
