import React, { useState, useContext } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

import categoriesServices from "../../../services/categoriesServices";

import { CategoriesContext } from "../CategoriesContext";

const AdminEditCategory = () => {
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useContext(CategoriesContext);

  const onSubmit = async (e) => {
    e.preventDefault();

    const formattedCategory =
      category.charAt(0).toLowerCase() + category.slice(1);

    const existingCategory = categories.find(
      (cat) => cat.title === formattedCategory
    );

    if (!category.trim()) {
      console.log("No category provided");
      return;
    }

    if (existingCategory) {
      console.log(`Deleting category "${existingCategory.title}"`);
      await categoriesServices.deleteCategory(existingCategory._id);
      setCategories((categories) =>
        categories.filter((category) => category._id !== existingCategory._id)
      );
    } else {
      console.log(`Creating category "${formattedCategory}"`);
      const createdCategory = await categoriesServices.postCategory({
        title: formattedCategory,
      });
      setCategories((categories) => [...categories, createdCategory]);
    }

    setCategory("");
  };

  return (
    <Container>
      <Row className="justify-content-md-center my-5">
        <Col
          lg="6"
          className="text-center"
        >
          <h1>Create/Delete category</h1>
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3">
              <Form.Label></Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{ textTransform: "capitalize" }}
              />
            </Form.Group>
            <Button
              variant="secondary"
              type="submit"
            >
              Create or Delete
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminEditCategory;
