import React from "react";
import { Card, Button, Container } from "react-bootstrap";

import { Navigate, useNavigate } from "react-router-dom";

const ProductCard = () => {
  return (
    <Container>
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
};

export default ProductCard;
