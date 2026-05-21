import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { FaArrowLeft, FaSave, FaSpinner } from "react-icons/fa";
import API from "../Services/api.js";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    imageURL: "", 
    imageFile: null, 
  });

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await API.get(`product/${id}`);
      const p = res.data.product;
      setForm({
        title: p.title || "",
        description: p.description || "",
        price: p.price || "",
        stock: p.stock || "",
        category: p.category || "",
        imageURL: p.imageURL || "",
      });
    } catch (err) {
      setError("Failed to load product.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    if (e.target.type === "file") {
      const file = e.target.files[0];
      setForm((prev) => ({
        ...prev,
        imageFile: file,
        imageURL: file ? URL.createObjectURL(file) : prev.imageURL,
      }));
    } else {
      setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("price", form.price);
      formData.append("stock", form.stock);
      formData.append("category", form.category);
      if (form.imageFile) {
        formData.append("imageURL", form.imageFile);
      }

      await API.patch(`product/update/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSuccess("Product updated successfully!");
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to update product.");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="pd-page mt-5 pt-5">
      <div className="pd-grid-bg" />
      <div className="pd-glow" />

      <Container className="pd-inner" style={{ maxWidth: 720 }}>
        {/* <button className="pd-back-btn" onClick={() => navigate("/admin")}>
          <FaArrowLeft size={11} /> Back to Dashboard
        </button> */}

        <div className="ep-card">
          <h2 className="ep-heading">Edit Product</h2>
          <p className="ep-subheading">Update the product details below</p>

          {loading ? (
            <div className="ep-loading">
              <FaSpinner className="ep-spinner" />
              <span>Loading product...</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="ep-form">
              <Row className="g-3">

                <Col md={12}>
                  <label className="ep-label">Product Title</label>
                  <input
                    className="ep-input"
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="e.g. Jordan Nike Sneakers for Men"
                    required
                  />
                </Col>

                <Col md={6}>
                  <label className="ep-label">Category</label>
                  <input
                    className="ep-input"
                    type="text"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    placeholder="e.g. Shoes, Electronics"
                  />
                </Col>

     
                <Col md={3}>
                  <label className="ep-label">Price (₹)</label>
                  <input
                    className="ep-input"
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="0"
                    min="0"
                    required
                  />
                </Col>

                <Col md={3}>
                  <label className="ep-label">Stock</label>
                  <input
                    className="ep-input"
                    type="number"
                    name="stock"
                    value={form.stock}
                    onChange={handleChange}
                    placeholder="0"
                    min="0"
                    required
                  />
                </Col>


                <Col md={12}>
                  <label className="ep-label">Product Image</label>
                  <div className="ep-file-wrap">
                    {form.imageURL && (
                      <div className="ep-img-preview-wrap">
                        <img
                          src={form.imageURL}
                          alt="Preview"
                          className="ep-img-preview"
                          onError={(e) => (e.target.style.display = "none")}
                        />
                      </div>
                    )}
                    <label className="ep-file-label">
                      <span className="ep-file-btn">
                        {form.imageFile
                          ? "✓ New image selected"
                          : "Choose new image"}
                      </span>
                      <span className="ep-file-hint">
                        {form.imageFile
                          ? form.imageFile.name
                          : "Leave empty to keep current image"}
                      </span>
                      <input
                        type="file"
                        name="imageURL"
                        accept="image/*"
                        onChange={handleChange}
                        style={{ display: "none" }}
                      />
                    </label>
                  </div>
                </Col>

                <Col md={12}>
                  <label className="ep-label">Description</label>
                  <textarea
                    className="ep-input ep-textarea"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Write a short product description..."
                    rows={4}
                  />
                </Col>

                {error && (
                  <Col md={12}>
                    <div className="ep-error">{error}</div>
                  </Col>
                )}
                {success && (
                  <Col md={12}>
                    <div className="ep-success">{success}</div>
                  </Col>
                )}

                <Col md={12} className="ep-actions">
                  <button
                    type="button"
                    className="ep-cancel-btn"
                    onClick={() => navigate("/admin")}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="pd-cart-btn"
                    disabled={saving}
                    style={{ minWidth: 180 }}
                  >
                    {saving ? (
                      <>
                        <FaSpinner className="ep-spinner-sm" /> Saving...
                      </>
                    ) : (
                      <>
                        <FaSave size={13} /> Save Changes
                      </>
                    )}
                  </button>
                </Col>
              </Row>
            </form>
          )}
        </div>
      </Container>
    </div>
  );
}

export default EditProduct;
