import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import API from "../Services/api.js";

import { Badge, Col, Container, Image, Row, Spinner, Button } from "react-bootstrap";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

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

  if (!product) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <Container className="mt-5">
      <Row>
        <Col md={6}>
          <Image className="border rounded-4 img-fluid" src={product.imageURL} alt={product.title} rounded />
        </Col>

        <Col md={6}>
          <Badge className="mb-3" bg="dark">
            {product.category}
          </Badge>

          <h2>{product.title}</h2>

          <h3 className="my-3">₹{product.price}</h3>

          <p>{product.description}</p>

          <p>
            <strong>Stock: </strong>
            {product.stock}
          </p>

          <Button variant="dark" size="lg">
            Add To Cart
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductDetails;
