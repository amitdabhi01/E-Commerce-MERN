import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import {
  FaShoppingCart,
  FaArrowLeft,
  FaBoxOpen,
  FaLayerGroup,
  FaStar,
  FaShieldAlt,
  FaTruck,
} from "react-icons/fa";
import API from "../Services/api.js";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [added, setAdded] = useState(false);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await API.get(`product/${id}`);
      setProduct(res.data.product);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToCart = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <>
      <div className="pd-page">
        <div className="pd-grid-bg" />
        <div className="pd-glow" />

        <Container className="pd-inner">
          <button className="pd-back-btn" onClick={() => navigate(-1)}>
            <FaArrowLeft size={11} /> Back to products
          </button>

          {!product ? (
            /* Skeleton loader */
            <Row className="g-4 pd-skeleton">
              <Col md={6}>
                <div
                  className="sk-block"
                  style={{ height: 480, borderRadius: 16 }}
                />
              </Col>
              <Col md={6} style={{ paddingLeft: "1.5rem" }}>
                <div
                  className="sk-block"
                  style={{ height: 22, width: "40%" }}
                />
                <div
                  className="sk-block"
                  style={{ height: 48, width: "85%", marginTop: "1rem" }}
                />
                <div
                  className="sk-block"
                  style={{ height: 24, width: "30%", marginTop: "0.5rem" }}
                />
                <div
                  className="sk-block"
                  style={{ height: 80, marginTop: "1.5rem" }}
                />
                <div
                  className="sk-block"
                  style={{ height: 52, marginTop: "1rem" }}
                />
                <div
                  className="sk-block"
                  style={{ height: 52, marginTop: "0.75rem" }}
                />
              </Col>
            </Row>
          ) : (
            <Row className="g-4 align-items-start">
              {/* Image */}
              <Col md={6}>
                <div className="pd-img-wrap">
                  <img
                    src={product.imageURL}
                    alt={product.title}
                    className="pd-product-img"
                  />
                  <div className="pd-img-badge">
                    <FaStar size={9} /> Premium
                  </div>
                </div>
              </Col>

              {/* Info */}
              <Col md={6}>
                <div className="pd-info">
                  {/* Category */}
                  <div className="pd-category-label">
                    <FaLayerGroup size={10} />
                    {product.category || "Premium Product"}
                  </div>

                  {/* Title */}
                  <h1 className="pd-title">{product.title}</h1>

                  {/* Rating */}
                  <div className="pd-rating">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <FaStar
                        key={i}
                        className={`pd-star${i <= 4 ? "" : " empty"}`}
                      />
                    ))}
                    <span className="pd-rating-text ms-1">
                      4.0 · 128 reviews
                    </span>
                  </div>

                  <div className="pd-divider" />

                  {/* Price */}
                  <div className="pd-price-row">
                    <span className="pd-price">
                      ₹{Number(product.price).toLocaleString()}
                    </span>
                    <span className="pd-price-note">Incl. all taxes</span>
                  </div>

                  {/* Description */}
                  <p className="pd-description">{product.description}</p>

                  <div className="pd-divider" />

                  {/* Stock */}
                  <div className="pd-stock-row">
                    <span className="pd-stock-label">Availability</span>
                    {Number(product.stock) > 0 ? (
                      <>
                        <span className="pd-stock-badge-green">In Stock</span>
                        <span className="pd-stock-qty">
                          {product.stock} units left
                        </span>
                      </>
                    ) : (
                      <span
                        style={{
                          color: "#ef4444",
                          fontSize: "0.72rem",
                          fontFamily: "'Jost',sans-serif",
                          fontWeight: 600,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                        }}
                      >
                        Out of Stock
                      </span>
                    )}
                  </div>

                  {/* Qty */}
                  <div className="pd-qty-row">
                    <span className="pd-qty-label">Qty</span>
                    <div className="pd-qty-control">
                      <button
                        className="pd-qty-btn"
                        onClick={() => setQty((q) => Math.max(1, q - 1))}
                      >
                        −
                      </button>
                      <span className="pd-qty-num">{qty}</span>
                      <button
                        className="pd-qty-btn"
                        onClick={() =>
                          setQty((q) => Math.min(Number(product.stock), q + 1))
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Add to Cart */}
                  <button
                    className={`pd-cart-btn${added ? " added" : ""}`}
                    onClick={handleAddToCart}
                    disabled={Number(product.stock) === 0}
                  >
                    <FaShoppingCart size={14} />
                    {added ? "Added to Cart!" : "Add to Cart"}
                  </button>

                  {/* Perks */}
                  <div className="pd-perks">
                    <div className="pd-perk">
                      <FaTruck className="pd-perk-icon" />
                      <span className="pd-perk-text">
                        Free delivery on orders over ₹499
                      </span>
                    </div>
                    <div className="pd-perk">
                      <FaShieldAlt className="pd-perk-icon" />
                      <span className="pd-perk-text">
                        1-year warranty included
                      </span>
                    </div>
                    <div className="pd-perk">
                      <FaBoxOpen className="pd-perk-icon" />
                      <span className="pd-perk-text">Easy 30-day returns</span>
                    </div>
                    <div className="pd-perk">
                      <FaStar className="pd-perk-icon" />
                      <span className="pd-perk-text">
                        Authenticity guaranteed
                      </span>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          )}
        </Container>
      </div>
    </>
  );
}

export default ProductDetails;
