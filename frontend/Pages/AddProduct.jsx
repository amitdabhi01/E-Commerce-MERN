import { useState } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  FaBoxOpen,
  FaTag,
  FaAlignLeft,
  FaRupeeSign,
  FaLayerGroup,
  FaCubes,
  FaImage,
  FaPlus,
} from "react-icons/fa";
import API from "../Services/api.js";

const CATEGORIES = ["Men", "Women", "Shoes", "Electronics", "Clothes"];

function AddProduct() {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    stock: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    Object.keys(formData).forEach((k) => data.append(k, formData[k]));
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
      setImagePreview(null);
      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="add-product-page">
        <div className="ap-grid-bg" />
        <Container>
          <Card className="ap-card border-0">
            <Card.Body className="p-4 p-md-5">
              <div className="ap-header">
                <div className="ap-icon-wrap">
                  <FaBoxOpen />
                </div>
                <div>
                  <h2 className="ap-page-title">Add Product</h2>
                  <p className="ap-page-subtitle">
                    Fill in the details to list a new item
                  </p>
                </div>
              </div>

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4">
                  <Form.Label className="ap-label">
                    <FaTag size={11} /> Product Title
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    placeholder="e.g. Premium Leather Sneakers"
                    onChange={handleChange}
                    value={formData.title}
                    className="ap-input"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="ap-label">
                    <FaAlignLeft size={11} /> Description
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="description"
                    placeholder="Describe the product in detail…"
                    onChange={handleChange}
                    value={formData.description}
                    className="ap-input"
                    required
                  />
                </Form.Group>

                <div className="ap-row-grid mb-4">
                  <Form.Group>
                    <Form.Label className="ap-label">
                      <FaRupeeSign size={11} /> Price (₹)
                    </Form.Label>
                    <Form.Control
                      type="number"
                      name="price"
                      placeholder="0.00"
                      onChange={handleChange}
                      value={formData.price}
                      className="ap-input"
                      required
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label className="ap-label">
                      <FaCubes size={11} /> Stock Qty
                    </Form.Label>
                    <Form.Control
                      type="number"
                      name="stock"
                      placeholder="0"
                      onChange={handleChange}
                      value={formData.stock}
                      className="ap-input"
                      required
                    />
                  </Form.Group>
                </div>

                <Form.Group className="mb-4">
                  <Form.Label className="ap-label">
                    <FaLayerGroup size={11} /> Category
                  </Form.Label>
                  <Form.Select
                    name="category"
                    onChange={handleChange}
                    value={formData.category}
                    className="ap-input"
                    required
                  >
                    <option value="">Select a category</option>
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c.toLowerCase()}>
                        {c}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label className="ap-label">
                    <FaImage size={11} /> Product Image
                  </Form.Label>
                  <div className="image-upload-zone">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImage}
                    />
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="image-preview"
                      />
                    ) : (
                      <>
                        <div className="upload-icon-wrap">
                          <FaImage size={18} />
                        </div>
                        <p className="upload-hint">
                          <strong>Click to upload</strong> or drag & drop
                          <br />
                          PNG, JPG, WEBP up to 10MB
                        </p>
                      </>
                    )}
                  </div>
                </Form.Group>

                <div className="ap-section-divider" />

                <Button
                  type="submit"
                  className="ap-submit-btn w-100"
                  disabled={loading}
                >
                  {loading ? (
                    "Adding product…"
                  ) : (
                    <>
                      <FaPlus size={12} /> Add Product
                    </>
                  )}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </>
  );
}

export default AddProduct;
