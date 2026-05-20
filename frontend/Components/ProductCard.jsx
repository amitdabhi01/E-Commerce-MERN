import React from "react";
import { Card, Button, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaEye, FaStar, FaShoppingBag, FaFire } from "react-icons/fa";

function ProductCard({ product }) {
  const navigate = useNavigate();

  return (
    <>
      <Card className="luxury-card border-0 h-100">
        <div className="card-img-container">
          <img
            src={product.imageURL}
            alt={product.title}
            className="card-product-img"
          />
          <div className="img-shimmer" />
          <div className="card-badge-trending">
            <FaFire size={9} />
            Trending
          </div>
        </div>

        <Card.Body className="card-body-luxury d-flex flex-column">
          <p className="card-category-label">
            <FaShoppingBag size={10} />
            Premium Product
          </p>

          <h5 className="card-product-title">{product.title}</h5>

          <div className="price-row">
            <span className="card-product-price">₹{product.price}</span>
            <span className="in-stock-badge">In Stock</span>
          </div>

          <Button
            className="btn-view-details mt-auto"
            onClick={() => navigate(`/product/${product._id}`)}
          >
            <FaEye size={13} />
            View Details
          </Button>
        </Card.Body>
      </Card>
    </>
  );
}

export default ProductCard;
