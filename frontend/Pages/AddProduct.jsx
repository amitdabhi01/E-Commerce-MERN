import { useState } from "react";

import { Container, Card, Form, Button } from "react-bootstrap";

import { useNavigate } from "react-router-dom";

import API from "../Services/api.js";

function AddProduct() {
  const navigate = useNavigate();

  const [image, setImage] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    stock: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    data.append("imageURL", image);

    try {
      await API.post("/product/add", data);

      alert("Product Added Successfully");

      setFormData({
        title: "",
        description: "",
        price: "",
        category: "",
        stock: "",
      });

      setImage(null);

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className="mt-5 d-flex justify-content-center">
      <Card className="p-4 shadow" style={{ width: "600px" }}>
        <h2 className="mb-4">Add Product</h2>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              onChange={handleChange}
              value={formData.title}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              name="description"
              onChange={handleChange}
              value={formData.description}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              onChange={handleChange}
              value={formData.price}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>

            <Form.Select
              name="category"
              onChange={handleChange}
              value={formData.category}
            >
              <option>Select Category</option>
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="shoes">Shoes</option>
              <option value="electronics">Electronics</option>
              <option value="clothes">Clothes</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Stock</Form.Label>

            <Form.Control
              type="number"
              name="stock"
              onChange={handleChange}
              value={formData.stock}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Product Image</Form.Label>

            <Form.Control
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </Form.Group>

          <Button type="submit" variant="dark" className="w-100">
            Add Product
          </Button>
        </Form>
      </Card>
    </Container>
  );
}

export default AddProduct;
