import { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  FaPlus,
  FaPencilAlt,
  FaTrash,
  FaTachometerAlt,
  FaBoxOpen,
  FaRupeeSign,
} from "react-icons/fa";
import API from "../Services/api.js";

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const res = await API.get("/product/getAll");
      setProducts(res.data.products);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await API.delete(`/product/delete/${id}`);
      fetchProduct();
    } catch (error) {
      console.log(error);
    }
  };

  const totalValue = products.reduce(
    (sum, p) => sum + (Number(p.price) || 0),
    0,
  );

  return (
    <>
      <div className="admin-page">
        <div className="admin-grid-bg" />
        <Container className="admin-inner">
          <div className="admin-page-header">
            <div className="admin-title-wrap">
              <div className="admin-title-icon">
                <FaTachometerAlt />
              </div>
              <div>
                <h2 className="admin-page-title">Dashboard</h2>
                <p className="admin-page-subtitle">
                  Manage your product catalogue
                </p>
              </div>
            </div>
            <button className="admin-add-btn" onClick={() => navigate("/add")}>
              <FaPlus size={11} />
              Add Product
            </button>
          </div>

          <div className="admin-stats">
            <div className="admin-stat-card">
              <p className="stat-label">Total Products</p>
              <p className="stat-value">{products.length}</p>
            </div>
            <div className="admin-stat-card">
              <p className="stat-label">Catalogue Value</p>
              <p className="stat-value">₹{totalValue.toLocaleString()}</p>
            </div>
            <div className="admin-stat-card">
              <p className="stat-label">In Stock</p>
              <p className="stat-value">
                {products.filter((p) => Number(p.stock) > 0).length}
              </p>
            </div>
          </div>

          {/* Table */}
          <div className="admin-table-wrap">
            {loading ? (
              <table className="admin-table">
                <thead>
                  <tr>
                    {[
                      "Image",
                      "Title",
                      "Price",
                      "Stock",
                      "Status",
                      "Actions",
                    ].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[...Array(5)].map((_, i) => (
                    <tr className="shimmer-row" key={i}>
                      {[...Array(6)].map((_, j) => (
                        <td key={j}>
                          <div
                            className="shimmer-bar"
                            style={{ width: j === 0 ? 52 : "80%" }}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : products.length === 0 ? (
              <div className="admin-empty">
                <FaBoxOpen size={48} className="admin-empty-icon" />
                <p className="admin-empty-text">No products yet</p>
              </div>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id}>
                      <td>
                        <img
                          src={product.imageURL}
                          alt={product.title}
                          className="product-thumb"
                        />
                      </td>
                      <td className="product-name-cell">{product.title}</td>
                      <td className="price-cell">
                        ₹{Number(product.price).toLocaleString()}
                      </td>
                      <td className="stock-cell">{product.stock}</td>
                      <td>
                        <span className="status-badge">
                          {product.status || "Active"}
                        </span>
                      </td>
                      <td>
                        <button
                          className="action-btn-edit"
                          onClick={() => navigate(`/update/${product._id}`)}
                        >
                          <FaPencilAlt size={10} /> Edit
                        </button>
                        <button
                          className="action-btn-delete"
                          onClick={() => deleteProduct(product._id)}
                        >
                          <FaTrash size={10} /> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </Container>
      </div>
    </>
  );
}

export default AdminDashboard;
