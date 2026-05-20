import React from "react";

import { Card, Button, Container } from "react-bootstrap";

import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const navigate = useNavigate();

  return (
    <Container className="mt-5">
      <Card className="h-100 shadow-sm">
        <Card.Img
          variant="top"
          src={product.imageURL}
          height="250"
          style={{ objectFit: "cover" }}
        />

        <Card.Body className="d-flex flex-column">
          <Card.Title>{product.title}</Card.Title>
          <Card.Text>₹ {product.price}</Card.Text>
          <Button
            variant="dark"
            className="mt-auto"
            onClick={() => navigate(`/product/${product._id}`)}
          >
            View Details
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default ProductCard;
