import { useState } from "react";

import { Container, Form, Button } from "react-bootstrap";

import { useNavigate, useParams } from "react-router-dom";

import API from "../Services/api.js";
import { useEffect } from "react";

function UpdateProduct() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [image, setImage] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    stock: "",
  });

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await API.get(`product/${id}`);

      setFormData({
        title: res.data.product.title || "",
        description: res.data.product.description || "",
        price: res.data.product.price || "",
        category: res.data.product.category || "",
        stock: res.data.product.stock || "",
      });

      setFormData(res.data.product);
    } catch (error) {
      console.log(error);
    }
  };

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

    if (image) {
      data.append("imageURL", image);
    }

    try {
      const res = await API.patch(`/product/update/${id}`, data)

      alert("Product Updated Successfully");

      navigate("/admin");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: "600px" }}>
      <h2>Update Product</h2>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            as="textarea"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </Form.Group>

        <Button type="submit" variant="dark">
          Update Product
        </Button>
      </Form>
    </Container>
  );
}
export default UpdateProduct;
