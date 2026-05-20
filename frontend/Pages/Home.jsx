import { useEffect, useState } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { FaGem, FaBoxOpen } from "react-icons/fa";
import ProductCard from "../Components/ProductCard.jsx";
import API from "../Services/api.js";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await API.get("/product/getAll");
      setProducts(res.data.products);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* HERO */}
      <div className="hero-luxury">
        <div className="hero-grid-overlay" />
        <Container>
          <div className="hero-inner">
            <div className="hero-eyebrow">
              <FaGem size={10} />
              MERN Stack eCommerce
            </div>

            <h1 className="hero-title">
              Discover <em>Amazing</em>
              <br />
              Products
            </h1>

            <p className="hero-subtitle">
              A modern shopping experience with premium fashion, gadgets,
              watches, and more — curated with care.
            </p>

            <div className="hero-divider" />

            <div className="hero-stats">
              <div className="hero-stat">
                <span className="hero-stat-num">500+</span>
                <span className="hero-stat-label">Products</span>
              </div>
              <div className="hero-stat-sep" />
              <div className="hero-stat">
                <span className="hero-stat-num">50+</span>
                <span className="hero-stat-label">Brands</span>
              </div>
              <div className="hero-stat-sep" />
              <div className="hero-stat">
                <span className="hero-stat-num">24/7</span>
                <span className="hero-stat-label">Support</span>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* PRODUCTS */}
      <div className="products-section">
        <Container>
          <div className="section-header d-flex flex-column flex-sm-row justify-content-between align-items-sm-end gap-3">
            <div>
              <p className="section-label">Featured Collection</p>
              <h2 className="section-title">Trending Products</h2>
            </div>
            {!loading && (
              <span className="product-count-badge">
                {products.length} Items
              </span>
            )}
          </div>

          {loading ? (
            <div className="loading-wrap">
              <Spinner animation="border" />
              <span className="loading-text">Curating your collection…</span>
            </div>
          ) : products.length === 0 ? (
            <div className="empty-state">
              <FaBoxOpen size={48} className="empty-icon" />
              <p className="empty-title">No products found</p>
            </div>
          ) : (
            <Row className="g-4">
              {products.map((product, i) => (
                <Col
                  lg={4}
                  md={6}
                  sm={12}
                  key={product._id}
                  className="fade-up"
                >
                  <ProductCard product={product} />
                </Col>
              ))}
            </Row>
          )}
        </Container>
      </div>
    </>
  );
};

export default Home;
